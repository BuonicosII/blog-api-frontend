import { Link } from "react-router-dom";

export default function Header () {
    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/sign-up">Sign Up</Link>
                <Link to="/">Log in</Link>
            </nav>
        </header>
    )
}