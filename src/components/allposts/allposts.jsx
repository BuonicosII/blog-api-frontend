import { Link, useLoaderData } from "react-router-dom";
import style from "./allpost.module.css"

export default function AllPosts () {

    const posts = useLoaderData()[1]

    return (
        <div className={style.feed}>
            {posts.map(post => {
                if (post.published) {
                    return <div key={post._id}>
                        <Link to={"/"+ post._id}>
                            <p>{post.title}</p>
                        </Link>
                    </div>
                }
            })}
        </div>
    )
}