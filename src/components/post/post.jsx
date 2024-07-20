import { useLoaderData } from "react-router-dom"


export default function Post () {

    const post = useLoaderData()[0]
    const comments = useLoaderData()[1]

    console.log(post, comments)

    return (
        <>
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
        </>
    )
}