import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom"
import style from "./post.module.css"
import { useState } from "react"
import PropTypes from 'prop-types'
import { format } from "date-fns"
import CreatePost from "../create-post/create-post"

function CommentForm ({ postid }) {
    const navigate = useNavigate()
    const [comment, setComment] = useState({ postid: postid })


    function formUpdate(e) {
        
        e.preventDefault()

        const newComment = {
            ...comment,
            text: document.querySelector("#comment").value
        }
        setComment(newComment)

    }

    async function formSubmit(e) {
        e.preventDefault()
        try {
            const json = await fetch('http://localhost:3000/comments', { 
                method: 'POST', 
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


export default function Post () {

    const post = useLoaderData()[1][0]
    const comments = useLoaderData()[1][1]
    const user = useLoaderData()[0]
    const [searchParams] = useSearchParams()

    const editMode = searchParams.get('edit') === "true"

    if (user && user._id === post.user._id && user.author && editMode) {
        return <CreatePost postToEdit={post}/>
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
    postid: PropTypes.string
}