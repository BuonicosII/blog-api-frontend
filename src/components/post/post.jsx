import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom"
import style from "./post.module.css"
import { useState } from "react"
import PropTypes from 'prop-types'
import { format } from "date-fns"
import CreatePost from "../create-post/create-post"

function CommentForm ({ postid, commentToEdit }) {
    const navigate = useNavigate()
    const [comment, setComment] = useState( commentToEdit ? commentToEdit : { postid: postid })



    function formUpdate(e) {
        
        e.preventDefault()

        const newComment = {
            ...comment,
            text: commentToEdit ? document.querySelector("#commentedit").value : document.querySelector("#comment").value
        }
        setComment(newComment)

    }

    async function formSubmit(e) {
        e.preventDefault()
        try {
            const json = await fetch('http://localhost:3000/comments', { 
                method: commentToEdit ? 'PUT' : 'POST', 
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`},
                body: JSON.stringify(comment)
            })

            const res = await json.json()


            if (Array.isArray(res)) {
                console.log(res)
                alert("Something is wrong with the data, check console")
            } else {
                setComment({ postid: postid, text: ""})
                navigate(`/${postid}`)
            }
        } catch (err) {
            console.log(err)
        }

    }

    if (commentToEdit) {
        return (
            <form onSubmit={formSubmit} className={style.comment}>
                <div className={style.divForm}>
                    <label htmlFor="commentedit">Your Comment</label>
                    <textarea onChange={formUpdate} name="commentedit" id="commentedit" value={comment.text} />
                    <input type="hidden" name="postid" id="postid" value={comment.post}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    } else {
        return (
            <form onSubmit={formSubmit} className={style.comment}>
                <div className={style.divForm}>
                    <label htmlFor="comment">Your Comment</label>
                    <textarea onChange={formUpdate} name="comment" id="comment" value={comment.text} />
                    <input type="hidden" name="postid" id="postid" value={comment.post}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        )
    }


}


export default function Post () {

    const post = useLoaderData()[1][0]
    const comments = useLoaderData()[1][1]
    const user = useLoaderData()[0]
    const [searchParams] = useSearchParams()

    const editMode = searchParams.get('edit') === "true"
    const editComment = comments.some( comment => comment._id === searchParams.get('edit_comment'))

    if (user && user._id === post.user._id && user.author && editMode) {
        return <CreatePost postToEdit={post}/>
    } else if (user && editComment && user._id === comments.find( comment => comment._id === searchParams.get('edit_comment') ).user._id) {
        return (
            <div className={style.postFeed}>
                <div className={style.postHolder}>
                    <h1>{post.title}</h1>
                    <p className={style.serviceText}>posted on {format(post.timeStamp, 'MMMM do')} by {post.user.username}</p>
                    <p>{post.text}</p>
                    <CommentForm postid={post._id} />
                    {comments.map(comment => {

                        if (comment._id === searchParams.get('edit_comment')) {
                            return < CommentForm key={comment._id} postid={post._id} commentToEdit={comment}/>
                        }


                        return (
                            <div key={comment._id} className={style.comment}>
                                <p className={style.serviceText}>On {format(comment.timeStamp, 'MMMM do')} {comment.user.username} wrote</p>
                                <p>{comment.text}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else if (user) {
        return (
            <div className={style.postFeed}>
                <div className={style.postHolder}>
                    <h1>{post.title}</h1>
                    <p className={style.serviceText}>posted on {format(post.timeStamp, 'MMMM do')} by {post.user.username}</p>
                    <p>{post.text}</p>
                    <CommentForm postid={post._id} />
                    {comments.map(comment => {
                        return (
                            <div key={comment.id} className={style.comment}>
                                <p className={style.serviceText}>On {format(comment.timeStamp, 'MMMM do')} {comment.user.username} wrote</p>
                                <p>{comment.text}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div className={style.postFeed}>
                <div className={style.postHolder}>
                    <h1>{post.title}</h1>
                    <p className={style.serviceText}>posted on {format(post.timeStamp, 'MMMM do')} by {post.user.username}</p>
                    <p>{post.text}</p>
                    {comments.map(comment => {
                        return (
                            <div key={comment.id} className={style.comment}>
                                <p className={style.serviceText}>On {format(comment.timeStamp, 'MMMM do')} {comment.user.username} wrote</p>
                                <p>{comment.text}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

CommentForm.propTypes = {
    postid: PropTypes.string,
    commentToEdit: PropTypes.object
}