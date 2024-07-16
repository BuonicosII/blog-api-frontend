import { useState, useEffect } from "react";

export default function Home () {
    const [comments, setComments] = useState([])

    async function retrieveComments () {
        const commentsJson = await fetch('http://localhost:3000/posts');
        const retrievedComments = await commentsJson.json()
        setComments(retrievedComments)
    }

    useEffect( () => {
        retrieveComments()
    }, [])
    
    return (
        <div>
            {comments.map(comment => {
                return <div key={comment.id}>{comment.title}</div>
            })}
        </div>
    )
}