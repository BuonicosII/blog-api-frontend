import { Link, useLoaderData } from "react-router-dom";
import style from './userview.module.css'

export default function UserView () {
    const userPosts = useLoaderData()[1]
    const userComments = useLoaderData()[2]

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
                            <span className={style.editMain}>{title}</span>
                            <span><i>{post.published ? "(Public)" : "(Draft)"}</i></span>
                            <Link to={"/" + post._id + "?edit=true"}><span>Edit</span></Link>
                            <Link><span>Delete</span></Link>

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
        </div>

    )
}