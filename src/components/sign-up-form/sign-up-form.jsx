import { useState } from "react"
import { useNavigate } from "react-router-dom"
import style from "./sign-up.module.css"

export default function SignUp () {

    const navigate = useNavigate()
    const [user, setUser] = useState({})

    function formUpdate(e) {
        
        e.preventDefault()

        const newUser = {
            ...user,
            firstName: document.querySelector("#firstName").value, 
            lastName: document.querySelector("#lastName").value,
            email: document.querySelector("#email").value,
            password: document.querySelector("#password").value,
            passwordConfirm: document.querySelector("#passwordConfirm").value,
            username: document.querySelector("#username").value
        }
        setUser(newUser)

    }

    async function formSubmit(e) {
        e.preventDefault()
        try {
            const json = await fetch('http://localhost:3000/users/sign-up', { 
                method: 'POST', 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user)
            })

            const res = await json.json()

            if (Array.isArray(res)) {
                console.log(res)
                alert("Something is wrong with the data, check console")
            } else {
                navigate("/log-in")
            }
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className={style.formHolder}>
            <form onSubmit={formSubmit}>
                <div className={style.divForm}>
                    <label htmlFor="firstName">First Name</label>
                    <input onChange={formUpdate} type="text" id="firstName" name="firstName" value={user.firstName}/>
                </div>
                <div className={style.divForm}>
                    <label htmlFor="lastName">Last Name</label>
                    <input onChange={formUpdate} type="text" id="lastName" name="lastName" value={user.lastName}/>
                </div>
                <div className={style.divForm}>
                    <label htmlFor="email">E-mail</label>
                    <input onChange={formUpdate} type="email" id="email" name="email" value={user.email}/>
                </div>
                <div className={style.divForm}>
                    <label htmlFor="password">Password</label>
                    <input onChange={formUpdate} type="password" id="password" name="password" value={user.password}/>
                </div>
                <div className={style.divForm}>
                    <label htmlFor="passwordConfirm">Confirm password</label>
                    <input onChange={formUpdate} type="password" name="passwordConfirm" id="passwordConfirm" value={user.passwordConfirm}/>
                </div>
                <div className={style.divForm}>
                    <label htmlFor="username">Username</label>
                    <input onChange={formUpdate} type="text" name="username" id="username" value={user.username}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}