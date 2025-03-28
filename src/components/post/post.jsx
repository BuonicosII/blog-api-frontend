import { Link, useLoaderData, useSearchParams } from "react-router-dom";
import style from "./post.module.css";
import { format } from "date-fns";
import { useState } from "react";
import CreatePost from "../create-post/create-post";
import CommentForm from "../create-comment/create-comment";
import DeletePostForm from "../delete-post/delete-post";
import DeleteCommentForm from "../delete-comment/deleteComment";
import { decode } from "html-entities";

export default function Post() {
  const post = useLoaderData()[1][0];
  const comments = useLoaderData()[1][1];
  const user = useLoaderData()[0];
  const [postToDelete, setPostToDelete] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [searchParams] = useSearchParams();

  const editMode = searchParams.get("edit") === "true";
  const editComment = comments.some(
    (comment) => comment.id === searchParams.get("edit_comment")
  );

  if (!post.published && !editMode) {
    //post is a draft
    return (
      <main>
        <div className={style.postFeed}>
          <div className={style.postHolder}>
            <h1 className={style.postTitle}>{decode(post.title)}</h1>
            <p className={style.serviceText}>Draft</p>
            <p>{decode(post.text)}</p>
            <div className={style.editLinks}>
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
          </div>
          {postToDelete !== null && (
            <div className={style.deletePopupHolder}>
              <DeletePostForm
                state={postToDelete}
                updateState={setPostToDelete}
              />
            </div>
          )}
        </div>
      </main>
    );
  } else if (user && user.id === post.user.id && user.author && editMode) {
    //post is in edit mode
    post.title = decode(post.title);
    post.text = decode(post.text);
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
      <main>
        <div className={style.postFeed}>
          <div className={style.postHolder}>
            <h1 className={style.postTitle}>{decode(post.title)}</h1>
            <p className={style.serviceText}>
              posted on {format(post.timeStamp, "MMMM do")} by{" "}
              {post.user.username}
            </p>
            <p>{decode(post.text)}</p>
            {user.id === post.user.id && user.author && (
              <div className={style.editLinks}>
                <Link to={"/" + post.id + "?edit=true"}>
                  <span>Edit</span>
                </Link>
                <Link
                  onClick={() => {
                    setCommentToDelete(null);
                    setPostToDelete(post.id);
                  }}
                >
                  <span>Delete</span>
                </Link>
              </div>
            )}
            {/* <CommentForm postid={post.id} /> */}
            {comments.map((comment) => {
              if (comment.id === searchParams.get("edit_comment")) {
                // return the form for the comment being edited

                comment.text = decode(comment.text);

                return (
                  <>
                    <CommentForm
                      key={comment.id}
                      postid={post.id}
                      commentToEdit={comment}
                    />
                  </>
                );
              }

              return (
                <div key={comment.id} className={style.comment}>
                  <p className={style.serviceText}>
                    On {format(comment.timeStamp, "MMMM do")}{" "}
                    {comment.user.username} wrote
                  </p>
                  {user.id === comment.user.id && (
                    <div className={style.editLinks}>
                      <Link
                        to={
                          "/" + comment.post.id + `?edit_comment=${comment.id}`
                        }
                      >
                        <span>Edit</span>
                      </Link>
                      <Link
                        onClick={() => {
                          setPostToDelete(null);
                          setCommentToDelete(comment.id);
                        }}
                      >
                        <span>Delete</span>
                      </Link>
                    </div>
                  )}
                  <p>{decode(comment.text)}</p>
                </div>
              );
            })}
          </div>
          {postToDelete !== null && (
            <div className={style.deletePopupHolder}>
              <DeletePostForm
                state={postToDelete}
                updateState={setPostToDelete}
              />
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
      </main>
    );
  } else if (user) {
    //post is published, standard view for logged user
    //if the user is the post author, edit button will show up
    //if the user is a comment author, edit button will show up
    return (
      <main>
        <div className={style.postFeed}>
          <div className={style.postHolder}>
            <h1 className={style.postTitle}>{decode(post.title)}</h1>
            <p className={style.serviceText}>
              posted on {format(post.timeStamp, "MMMM do")} by{" "}
              {post.user.username}
            </p>
            <p>{decode(post.text)}</p>
            {user.id === post.user.id && user.author && (
              <div className={style.editLinks}>
                <Link to={"/" + post.id + "?edit=true"}>
                  <span>Edit</span>
                </Link>
                <Link
                  onClick={() => {
                    setCommentToDelete(null);
                    setPostToDelete(post.id);
                  }}
                >
                  <span>Delete</span>
                </Link>
              </div>
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
                    <div className={style.editLinks}>
                      <Link
                        to={
                          "/" + comment.post.id + `?edit_comment=${comment.id}`
                        }
                      >
                        <span>Edit</span>
                      </Link>
                      <Link
                        onClick={() => {
                          setPostToDelete(null);
                          setCommentToDelete(comment.id);
                        }}
                      >
                        <span>Delete</span>
                      </Link>
                    </div>
                  )}
                  <p>{decode(comment.text)}</p>
                </div>
              );
            })}
          </div>
          {postToDelete !== null && (
            <div className={style.deletePopupHolder}>
              <DeletePostForm
                state={postToDelete}
                updateState={setPostToDelete}
              />
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
      </main>
    );
  } else {
    //post is published but no user is logged
    return (
      <main>
        <div className={style.postFeed}>
          <div className={style.postHolder}>
            <h1 className={style.postTitle}>{decode(post.title)}</h1>
            <p className={style.serviceText}>
              posted on {format(post.timeStamp, "MMMM do")} by{" "}
              {post.user.username}
            </p>
            <p>{decode(post.text)}</p>
            {comments.map((comment) => {
              return (
                <div key={comment.id} className={style.comment}>
                  <p className={style.serviceText}>
                    On {format(comment.timeStamp, "MMMM do")}{" "}
                    {comment.user.username} wrote
                  </p>
                  <p>{decode(comment.text)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
  }
}
