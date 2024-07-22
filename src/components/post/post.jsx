import { useLoaderData } from "react-router-dom"
import style from "./post.module.css"

export default function Post () {

    const post = useLoaderData()[1][0]
    const comments = useLoaderData()[1][1]
    const user = useLoaderData()[0]

    if (user) {
        return (
            <div className={style.postFeed}>
                <div>
                    <h1>{post.title}</h1>
                    <p>posted on {post.timeStamp} by {post.user.username}</p>
                    <p>{post.text}</p>
                </div>
                <form action="">
                    <p><b>Here goes a form to add comment</b></p>
                </form>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>On {comment.timeStamp} {comment.user.username} wrote</p>
                            <p>{comment.text}</p>
                        </div>
                    )
                })}
            </div>
        )
    } else {
        return (
            <div className={style.postFeed}>
                <div>
                    <h1>{post.title}</h1>
                    <p>posted on {post.timeStamp} by {post.user.username}</p>
                    <p>{post.text}</p>
                </div>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>On {comment.timeStamp} {comment.user.username} wrote</p>
                            <p>{comment.text}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}