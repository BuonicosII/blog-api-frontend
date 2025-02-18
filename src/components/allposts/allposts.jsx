import { Link, useLoaderData } from "react-router-dom";
import style from "./allpost.module.css";

export default function AllPosts() {
  const posts = useLoaderData()[1];

  return (
    <div className={style.feed}>
      {posts.map((post) => {
        if (post.published) {
          return (
            <div key={post.id}>
              <Link to={"/" + post.id}>
                <p>{post.title}</p>
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
}
