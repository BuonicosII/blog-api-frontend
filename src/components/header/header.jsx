import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import style from "./header.module.css";
import useMediaQuery from "../../UseMediaQuery";

export default function Header() {
  const user = useLoaderData()[0];
  const [menuOpen, setMenuOpen] = useState(false);
  const maxWidMobile = useMediaQuery("(max-width: 800px)");

  if (maxWidMobile) {
    return (
      <header>
        <nav>
          <span className={style.home}>
            <Link
              onClick={() => {
                setMenuOpen(false);
              }}
              to="/"
            >
              B-Log
            </Link>
          </span>
          <span
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fffefe"
                  d="M7.05 7.05a1 1 0 0 1 1.414 0L12 10.586l3.536-3.536a1 1 0 1 1 1.414 1.414L13.414 12l3.536 3.536a1 1 0 1 1-1.414 1.414L12 13.414L8.464 16.95a1 1 0 1 1-1.414-1.414L10.586 12L7.05 8.464a1 1 0 0 1 0-1.414"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fffefe"
                  d="M4 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m0 6a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1m1 5a1 1 0 1 0 0 2h14a1 1 0 1 0 0-2z"
                />
              </svg>
            )}
          </span>
        </nav>
        <div className={menuOpen ? style.dropDownOpen : style.dropDownClosed}>
          {user ? (
            <>
              {user.author && (
                <Link
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                  to="/new-post"
                >
                  <div className={style.menuDiv}>New Post</div>
                </Link>
              )}
              <Link
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
                to={"/user/" + user.id}
              >
                <div className={style.menuDiv}>{user.username}</div>
              </Link>
              <Link
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  localStorage.removeItem("token");
                }}
              >
                <div className={style.menuDiv}>Log out</div>
              </Link>
            </>
          ) : (
            <>
              <Link
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
                to="/sign-up"
              >
                <div className={style.menuDiv}>Sign Up</div>
              </Link>
              <Link
                onClick={() => {
                  setMenuOpen(!menuOpen);
                }}
                to="/log-in"
              >
                <div className={style.menuDiv}>Log In</div>
              </Link>
            </>
          )}
        </div>
      </header>
    );
  } else {
    if (menuOpen) setMenuOpen(false);
    return (
      <header>
        <nav>
          <span className={style.home}>
            <Link to="/">B-Log</Link>
          </span>
          {user ? (
            <>
              {user.author && (
                <Link to="/new-post">
                  <button className={style.newpost}>New Post</button>
                </Link>
              )}
              <Link to={"/user/" + user.id}>{user.username}</Link>
              <Link
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                <button className={style.logout}>Log out</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-up">
                <button className={style.login}>Sign Up</button>
              </Link>
              <Link to="/log-in">
                <button className={style.login}>Log in</button>
              </Link>
            </>
          )}
        </nav>
      </header>
    );
  }
}
