import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./log-in.module.css";

export default function LogIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [errMsg, setErrMsg] = useState();

  function formUpdate(e) {
    e.preventDefault();

    const newUser = {
      ...user,
      password: document.querySelector("#password").value,
      username: document.querySelector("#username").value,
    };

    if (errMsg !== null) {
      setErrMsg(null);
    }

    setUser(newUser);
  }

  async function formSubmit(e) {
    e.preventDefault();
    try {
      const json = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const res = await json.json();

      if (typeof res === "string") {
        setErrMsg(res);
      } else {
        localStorage.setItem("token", JSON.stringify(res.token));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  function errStyling(message, field) {
    if (message === "Incorrect username" && field === "username") {
      return style.errInput;
    } else if (message === "Incorrect password" && field === "password") {
      return style.errInput;
    } else if (
      message === "Missing credentials" &&
      document.querySelector(`#${field}`).value.length === 0
    ) {
      return style.errInput;
    }
  }

  return (
    <main>
      <div className={style.postFeed}>
        <div className={style.formHolder}>
          <form onSubmit={formSubmit}>
            <div className={style.divForm}>
              <label htmlFor="username">Username</label>
              <input
                onChange={formUpdate}
                type="text"
                name="username"
                id="username"
                value={user.username}
                className={
                  style.formInput + " " + errStyling(errMsg, "username")
                }
              />
            </div>
            <div className={style.divForm}>
              <label htmlFor="password">Password</label>
              <input
                onChange={formUpdate}
                type="password"
                id="password"
                name="password"
                value={user.password}
                className={
                  style.formInput + " " + errStyling(errMsg, "password")
                }
              />
            </div>
            <button type="submit" className={style.confirm}>
              Submit
            </button>
            {errMsg && <p className={style.errText}>{errMsg}</p>}
          </form>
        </div>
      </div>
    </main>
  );
}
