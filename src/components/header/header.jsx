import { Link, useLoaderData } from "react-router-dom";
import style from './header.module.css'

export default function Header () {
    const user = useLoaderData()[0]
    
    if (!user) {
        return (
            <header>
                <nav>
                    <span className={style.home}><Link to="/">Home</Link></span>
                    <Link to="/sign-up">Sign Up</Link>
                    <Link to="/log-in">Log in</Link>
                </nav>
            </header>
        )
    } else {
        return (
            <header>
                <nav>
                    <span className={style.home}><Link to="/">Home</Link></span>
                    {user.author && <span><Link to="/new-post">New Post</Link></span>}
                    <span><Link to={"/user/"+ user._id}>{user.username}</Link></span>
                    <Link onClick={()=> {localStorage.removeItem("token")}}>Log out</Link>
                </nav>
            </header>
        )
    }

}