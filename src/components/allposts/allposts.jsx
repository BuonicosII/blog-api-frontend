import { Link, useLoaderData } from "react-router-dom";

export default function AllPosts () {

    const posts = useLoaderData()[1]

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