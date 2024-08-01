import { Link, useLoaderData } from "react-router-dom";
import style from './userview.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types'

function DeletePostForm ({ state, updateState}) {

    const [password, setPassword] = useState()
    const navigate = useNavigate()

    async function deletePost (e) {
        e.preventDefault()

        try { 
            const json = await fetch(`http://localhost:3000/posts/${state}`, { 
                method: 'DELETE', 
                headers: {"Content-Type": "application/json", "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`},
                body: JSON.stringify({password: password, _id: state})
            })

            const res = await json.json()


            if (Array.isArray(res)) {
                console.log(res)
                alert("Something is wrong with the data, check console")
            } else {
                updateState(null)
                navigate(`/user/${res._id}`)
            }

        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <form onSubmit={deletePost}>
            <p>Are you sure you want to delete this post and all the related comments?</p>
            <p>Enter your password to confirm</p>
            <label htmlFor="password">Password</label>
            <input onChange={() => {setPassword(document.getElementById("password").value)}}type="password" id="password" name="password" value={password}/>
            <input type="hidden" value={state}/>
            <button type="submit">Confirm</button>
            <button onClick={() => { updateState(null)} }>Cancel</button>
        </form>
    )


}

export default function UserView () {
    const userPosts = useLoaderData()[1]
    const userComments = useLoaderData()[2]
    const [postToDelete, setPostToDelete] = useState(null)

    return (
        <div className={style.columnHolder}>
            <div className={style.column}>
                <h2>Your posts</h2>
                {userPosts.map( post => {

                    let title = post.title

                    if (title.length > 15) {
                        title = title.slice(0, 15) + "..."
                    }

                    return (
                        <div key={post._id} className={style.editDiv}>
                            <Link to={"/" + post._id}><span className={style.editMain}>{title}</span></Link>
                            <span><i>{post.published ? "(Public)" : "(Draft)"}</i></span>
                            <Link to={"/" + post._id + "?edit=true"}><span>Edit</span></Link>
                            <Link onClick={() => {setPostToDelete(post._id)}}><span>Delete</span></Link>
                        </div>

                    )
                })}
            </div>
            <div className={style.column}>
                <h2>Your comments</h2>
                {userComments.map( comment => {

                        let text = comment.text

                        if (text.length > 15) {
                            text = text.slice(0, 15) + "..."
                        }

                    return (
                        <div key={comment._id} className={style.editDiv}>
                            <span className={style.editMain}>{text}</span>
                            <Link><span>Edit</span></Link>
                            <Link><span>Delete</span></Link>
                        </div>

                    )
                })}
            </div>
            {postToDelete !== null && <div className={style.deletePopupHolder}>
                < DeletePostForm state={postToDelete} updateState={setPostToDelete} />
            </div>}    
        </div>

    )
}

DeletePostForm.propTypes = {
    state: PropTypes.string,
    updateState: PropTypes.func
}