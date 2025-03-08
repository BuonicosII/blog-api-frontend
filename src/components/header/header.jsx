import { Link, useLoaderData } from "react-router-dom";
import style from "./header.module.css";

export default function Header() {
  const user = useLoaderData()[0];

  if (!user) {
    return (
      <header>
        <nav>
          <span className={style.home}>
            <Link to="/">B-Log</Link>
          </span>
          <Link to="/sign-up">
            <button className={style.login}>Sign Up</button>
          </Link>
          <Link to="/log-in">
            <button className={style.login}>Log in</button>
          </Link>
        </nav>
      </header>
    );
  } else {
    return (
      <header>
        <nav>
          <span className={style.home}>
            <Link to="/">B-Log</Link>
          </span>
          {user.author && (
            <span>
              <Link to="/new-post">
                <button className={style.newpost}>New Post</button>
              </Link>
            </span>
          )}
          <span>
            <Link to={"/user/" + user.id}>{user.username}</Link>
          </span>
          <Link
            onClick={() => {
              localStorage.removeItem("token");
            }}
          >
            <button className={style.logout}>Log out</button>
          </Link>
        </nav>
      </header>
    );
  }
}
