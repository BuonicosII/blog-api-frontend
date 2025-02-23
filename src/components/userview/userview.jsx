import { Link, useLoaderData } from "react-router-dom";
import style from "./userview.module.css";
import { useState } from "react";
import DeletePostForm from "../delete-post/delete-post";
import DeleteCommentForm from "../delete-comment/deleteComment";

export default function UserView() {
  const userPosts = useLoaderData()[1];
  const userComments = useLoaderData()[2];
  const [postToDelete, setPostToDelete] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);

  return (
    <div className={style.columnHolder}>
      <div className={style.column}>
        <h2>Your posts</h2>
        {userPosts.map((post) => {
          let title = post.title;

          if (title.length > 15) {
            title = title.slice(0, 15) + "...";
          }

          return (
            <div key={post.id} className={style.editDiv}>
              <Link to={"/" + post.id}>
                <span className={style.editMain}>{title}</span>
              </Link>
              <span>
                <i>{post.published ? "(Public)" : "(Draft)"}</i>
              </span>
              <Link to={"/" + post.id + "?edit=true"}>
                <span>Edit</span>
              </Link>
              <Link
                onClick={() => {
                  setPostToDelete(post.id);
                }}
              >
                <span>Delete</span>
              </Link>
            </div>
          );
        })}
      </div>
      <div className={style.column}>
        <h2>Your comments</h2>
        {userComments.map((comment) => {
          let text = comment.text;

          if (text.length > 15) {
            text = text.slice(0, 15) + "...";
          }

          return (
            <div key={comment.id} className={style.editDiv}>
              <span className={style.editMain}>{text}</span>
              <Link to={"/" + comment.post.id + `?edit_comment=${comment.id}`}>
                <span>Edit</span>
              </Link>
              <Link
                onClick={() => {
                  setCommentToDelete(comment.id);
                }}
              >
                <span>Delete</span>
              </Link>
            </div>
          );
        })}
      </div>
      {postToDelete !== null && (
        <div className={style.deletePopupHolder}>
          <DeletePostForm state={postToDelete} updateState={setPostToDelete} />
        </div>
      )}
      {commentToDelete !== null && (
        <div className={style.deletePopupHolder}>
          <DeleteCommentForm
            state={commentToDelete}
            updateState={setCommentToDelete}
          />
        </div>
      )}
    </div>
  );
}
