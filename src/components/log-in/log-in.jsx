import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LogIn () {

    const navigate = useNavigate()
    const [user, setUser] = useState({})

    function formUpdate(e) {
        
        e.preventDefault()

        const newUser = {
            ...user,
            password: document.querySelector("#password").value,
            username: document.querySelector("#username").value
        }
        setUser(newUser)

    }

    async function formSubmit(e) {
        e.preventDefault()
        try {
            const json = await fetch('http://localhost:3000/users/login', { 
                method: 'POST', 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            })
            const res = await json.json()

            if (typeof res === "string") {
                console.log(res)
                alert("Something is wrong with the data, check console")
            } else {
                localStorage.setItem("token", JSON.stringify(res.token))
                navigate("/")
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="username">Username</label>
            <input onChange={formUpdate} type="text" name="username" id="username" value={user.username}/>
            <label htmlFor="password">Password</label>
            <input onChange={formUpdate} type="password" id="password" name="password" value={user.password}/>
            <button type="submit">Submit</button>
        </form>
    )
}