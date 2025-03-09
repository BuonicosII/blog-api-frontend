import { Link, useLoaderData } from "react-router-dom";
import style from "./allpost.module.css";
import { decode } from "html-entities";

export default function AllPosts() {
  const posts = useLoaderData()[1];

  return (
    <main>
      <div className={style.feed}>
        {posts.map((post, index) => {
          if (post.published) {
            return (
              <>
                {index !== 0 && <div className={style.hrlike}></div>}
                <Link to={"/" + post.id} key={post.id}>
                  <div className={style.post}>
                    <p>{post.user.username}</p>
                    <p className={style.postTitle}>{post.title}</p>
                    {post.text.length > 100
                      ? decode(post.text).slice(0, 100) + "..."
                      : decode(post.text)}
                  </div>
                </Link>
              </>
            );
          }
        })}
      </div>
    </main>
  );
}
