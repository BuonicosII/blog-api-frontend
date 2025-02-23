import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import style from "./post.module.css";
import { format } from "date-fns";
import CreatePost from "../create-post/create-post";
import CommentForm from "../create-comment/create-comment";

export default function Post() {
  const post = useLoaderData()[1][0];
  const comments = useLoaderData()[1][1];
  const user = useLoaderData()[0];
  const [searchParams] = useSearchParams();

  const editMode = searchParams.get("edit") === "true";
  const editComment = comments.some(
    (comment) => comment.id === searchParams.get("edit_comment")
  );

  if (!post.published && !editMode) {
    //post is a draft
    return (
      <div className={style.postFeed}>
        <div className={style.postHolder}>
          <h1>{post.title}</h1>
          <p className={style.serviceText}>Draft</p>
          <p>{post.text}</p>
          <Link to={"/" + post.id + "?edit=true"}>
            <span>Edit</span>
          </Link>
        </div>
      </div>
    );
  } else if (user && user.id === post.user.id && user.author && editMode) {
    //post is in edit mode
    return <CreatePost postToEdit={post} />;
  } else if (
    user &&
    editComment &&
    user.id ===
      comments.find(
        (comment) => comment.id === searchParams.get("edit_comment")
      ).user.id
  ) {
    // post is published a post comment is in edit mode
    //if the user is the post author, edit button will show up
    //if the user is a comment author, edit button will show up
    return (
      <div className={style.postFeed}>
        <div className={style.postHolder}>
          <h1>{post.title}</h1>
          <p className={style.serviceText}>
            posted on {format(post.timeStamp, "MMMM do")} by{" "}
            {post.user.username}
          </p>
          <p>{post.text}</p>
          {user.id === post.user.id && user.author && (
            <Link to={"/" + post.id + "?edit=true"}>
              <span>Edit</span>
            </Link>
          )}
          <CommentForm postid={post.id} />
          {comments.map((comment) => {
            if (comment.id === searchParams.get("edit_comment")) {
              // return the form for the comment being edited
              return (
                <CommentForm
                  key={comment.id}
                  postid={post.id}
                  commentToEdit={comment}
                />
              );
            }

            return (
              <div key={comment.id} className={style.comment}>
                <p className={style.serviceText}>
                  On {format(comment.timeStamp, "MMMM do")}{" "}
                  {comment.user.username} wrote
                </p>
                {user.id === comment.user.id && (
                  <Link
                    to={"/" + comment.post.id + `?edit_comment=${comment.id}`}
                  >
                    <span>Edit</span>
                  </Link>
                )}
                <p>{comment.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (user) {
    //post is published, standard view for logged user
    //if the user is the post author, edit button will show up
    //if the user is a comment author, edit button will show up
    return (
      <div className={style.postFeed}>
        <div className={style.postHolder}>
          <h1>{post.title}</h1>
          <p className={style.serviceText}>
            posted on {format(post.timeStamp, "MMMM do")} by{" "}
            {post.user.username}
          </p>
          <p>{post.text}</p>
          {user.id === post.user.id && user.author && (
            <Link to={"/" + post.id + "?edit=true"}>
              <span>Edit</span>
            </Link>
          )}
          <CommentForm postid={post.id} />
          {comments.map((comment) => {
            return (
              <div key={comment.id} className={style.comment}>
                <p className={style.serviceText}>
                  On {format(comment.timeStamp, "MMMM do")}{" "}
                  {comment.user.username} wrote
                </p>
                {user.id === comment.user.id && (
                  <Link
                    to={"/" + comment.post.id + `?edit_comment=${comment.id}`}
                  >
                    <span>Edit</span>
                  </Link>
                )}
                <p>{comment.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    //post is published but no user is logged
    return (
      <div className={style.postFeed}>
        <div className={style.postHolder}>
          <h1>{post.title}</h1>
          <p className={style.serviceText}>
            posted on {format(post.timeStamp, "MMMM do")} by{" "}
            {post.user.username}
          </p>
          <p>{post.text}</p>
          {comments.map((comment) => {
            return (
              <div key={comment.id} className={style.comment}>
                <p className={style.serviceText}>
                  On {format(comment.timeStamp, "MMMM do")}{" "}
                  {comment.user.username} wrote
                </p>
                <p>{comment.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
