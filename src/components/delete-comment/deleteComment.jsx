import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./delete-comment.module.css";

export default function DeleteCommentForm({ state, updateState }) {
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function deleteComment(e) {
    e.preventDefault();

    try {
      const json = await fetch(`http://localhost:3000/comments/${state}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify({ password: password, id: state }),
      });

      const res = await json.json();

      if (Array.isArray(res)) {
        console.log(res);
        alert("Something is wrong with the data, check console");
      } else {
        updateState(null);
        navigate(`/user/${res.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={deleteComment} className={style.deleteForm}>
      <p>Are you sure you want to delete this comment?</p>
      <p>Enter your password to confirm</p>
      <div>
        <label htmlFor="password" className={style.label}>
          Password
        </label>
        <input
          onChange={() => {
            setPassword(document.getElementById("password").value);
          }}
          type="password"
          id="password"
          name="password"
          value={password}
          className={style.formInput}
        />
      </div>
      <input type="hidden" value={state} />
      <div className={style.buttonHolder}>
        <button type="submit" className={style.confirm}>
          Confirm
        </button>
        <button
          onClick={() => {
            updateState(null);
          }}
          className={style.cancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

DeleteCommentForm.propTypes = {
  state: PropTypes.string,
  updateState: PropTypes.func,
};
