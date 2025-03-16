import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./create-post.module.css";
import PropTypes from "prop-types";

export default function CreatePost({ postToEdit }) {
  const [post, setPost] = useState(
    postToEdit ? postToEdit : { published: false }
  );
  const [errMsg, setErrMsg] = useState();
  const navigate = useNavigate();

  function formUpdate(e) {
    e.preventDefault();

    const newPost = {
      ...post,
      title: document.querySelector("#title").value,
      text: document.querySelector("#text").value,
    };

    if (errMsg !== null) {
      setErrMsg(null);
    }

    setPost(newPost);
  }

  function checkUpdate() {
    const newPost = {
      ...post,
      published: !post.published,
    };
    setPost(newPost);
  }

  async function formSubmit(e) {
    e.preventDefault();

    try {
      const json = await fetch("http://localhost:3000/posts", {
        method: postToEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
        body: JSON.stringify(post),
      });

      const res = await json.json();

      if (Array.isArray(res)) {
        setErrMsg(res[0]);
      } else {
        navigate(`/${res.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function errStyling(message, field) {
    if (message && message.path === field) {
      return style.errInput;
    }
  }

  return (
    <main>
      <div className={style.postHolder}>
        <div className={style.formHolder}>
          <form onSubmit={formSubmit}>
            <div className={style.divForm}>
              <label htmlFor="title">Post title</label>
              <input
                onChange={formUpdate}
                type="text"
                id="title"
                name="title"
                value={post.title}
                className={style.formInput + " " + errStyling(errMsg, "title")}
              />
            </div>
            <div className={style.divForm}>
              <label htmlFor="text">Post text</label>
              <textarea
                onChange={formUpdate}
                name="text"
                id="text"
                value={post.text}
                className={
                  style.postTextarea + " " + errStyling(errMsg, "text")
                }
              ></textarea>
            </div>
            <div className={style.checkboxDiv}>
              <input
                onChange={checkUpdate}
                type="checkbox"
                name="published"
                id="published"
                checked={post.published}
              />
              <label htmlFor="published">Publish</label>
            </div>
            <div className={style.buttonHolder}>
              <button type="submit" className={style.confirm}>
                Submit
              </button>
              <button
                onClick={() => {
                  if (postToEdit) {
                    navigate(`/${post.id}`);
                  } else {
                    navigate("/");
                  }
                }}
                className={style.cancel}
              >
                Cancel
              </button>
            </div>
            {errMsg && <p className={style.errText}>{errMsg.msg}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}

CreatePost.propTypes = {
  postToEdit: PropTypes.object,
};
