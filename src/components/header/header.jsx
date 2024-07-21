import { Link, useLoaderData } from "react-router-dom";

export default function Header () {
    const user = useLoaderData()[0]
    
    if (!user) {
        return (
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/sign-up">Sign Up</Link>
                    <Link to="/log-in">Log in</Link>
                </nav>
            </header>
        )
    } else {
        return (
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    <p>{user.username}</p>
                    <Link onClick={()=> {localStorage.removeItem("token")}}>Log out</Link>
                </nav>
            </header>
        )
    }

}