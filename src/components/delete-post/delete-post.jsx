import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function DeletePostForm({ state, updateState }) {
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function deletePost(e) {
    e.preventDefault();

    try {
      const json = await fetch(`http://localhost:3000/posts/${state}`, {
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
    <form onSubmit={deletePost}>
      <p>
        Are you sure you want to delete this post and all the related comments?
      </p>
      <p>Enter your password to confirm</p>
      <label htmlFor="password">Password</label>
      <input
        onChange={() => {
          setPassword(document.getElementById("password").value);
        }}
        type="password"
        id="password"
        name="password"
        value={password}
      />
      <input type="hidden" value={state} />
      <button type="submit">Confirm</button>
      <button
        onClick={() => {
          updateState(null);
        }}
      >
        Cancel
      </button>
    </form>
  );
}

DeletePostForm.propTypes = {
  state: PropTypes.string,
  updateState: PropTypes.func,
};
