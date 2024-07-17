import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AllPosts () {
    const [posts, setPosts] = useState([])

    async function retrievePosts () {
        const postsJson = await fetch('http://localhost:3000/posts');
        const retrievedPosts = await postsJson.json()
        setPosts(retrievedPosts)
    }

    useEffect( () => {
        retrievePosts()
    }, [])
    
    return (
        <div>
            {posts.map(post => {
                return <div key={post._id}>
                    <Link to={"/"+ post._id}>
                    <p>{post.title}</p>
                    </Link>
                    </div>
            })}
        </div>
    )
}