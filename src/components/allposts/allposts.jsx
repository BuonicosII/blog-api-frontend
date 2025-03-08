import { Link, useLoaderData } from "react-router-dom";
import style from "./allpost.module.css";

export default function AllPosts() {
  const posts = useLoaderData()[1];

  return (
    <main>
      <div className={style.feed}>
        {posts.map((post) => {
          if (post.published) {
            return (
              <div key={post.id}>
                <p>{post.user.username}</p>
                <Link to={"/" + post.id}>
                  <p>{post.title}</p>
                </Link>
                {post.text.length > 50
                  ? post.text.slice(0, 50) + "..."
                  : post.text}
              </div>
            );
          }
        })}
      </div>
    </main>
  );
}
