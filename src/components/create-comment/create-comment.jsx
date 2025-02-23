import { useNavigate } from "react-router-dom";
import style from "./create-comment.module.css";
import { useState } from "react";
import PropTypes from "prop-types";

export default function CommentForm({ postid, commentToEdit }) {
  const navigate = useNavigate();
  const [comment, setComment] = useState(
    commentToEdit ? commentToEdit : { postid: postid }
  );

  function formUpdate(e) {
    e.preventDefault();

    const newComment = {
      ...comment,
      text: commentToEdit
        ? document.querySelector("#commentedit").value
        : document.querySelector("#comment").value,
    };
    setComment(newComment);
  }

  async function formSubmit(e) {
    e.preventDefault();
    try {
      const json = await fetch("http://localhost:3000/comments", {
        method: commentToEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(comment),
      });

      const res = await json.json();

      if (Array.isArray(res)) {
        console.log(res);
        alert("Something is wrong with the data, check console");
      } else {
        setComment({ postid: postid, text: "" });
        navigate(`/${postid}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (commentToEdit) {
    return (
      <form onSubmit={formSubmit} className={style.comment}>
        <div className={style.divForm}>
          <label htmlFor="commentedit">Your Comment</label>
          <textarea
            onChange={formUpdate}
            name="commentedit"
            id="commentedit"
            value={comment.text}
          />
          <input type="hidden" name="postid" id="postid" value={comment.post} />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  } else {
    return (
      <form onSubmit={formSubmit} className={style.comment}>
        <div className={style.divForm}>
          <label htmlFor="comment">Your Comment</label>
          <textarea
            onChange={formUpdate}
            name="comment"
            id="comment"
            value={comment.text}
          />
          <input type="hidden" name="postid" id="postid" value={comment.post} />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

CommentForm.propTypes = {
  postid: PropTypes.string,
  commentToEdit: PropTypes.object,
};
