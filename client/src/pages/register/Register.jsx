import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useNavigate();
    //With useNavigate we can redirect user to previous page or any other page

    const handleClick = async (e) => {
        e.preventDefault();
        if (passwordAgain.current.value !== password.current.value) {
            password.current.setCostumValidity("Passwords don't match!");
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post(`${process.env.REACT_APP_BASE_URL}auth/register`, user);
                history("/login");
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Socialis</h3>
                    <span className="loginDesc">
                        Find a new friend or partner on Socialis.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input
                            placeholder="Username"
                            className="loginInput"
                            required
                            ref={username}
                        />
                        <input
                            placeholder="Email"
                            type="email"
                            className="loginInput"
                            required
                            ref={email}
                            minLength="6"
                        />
                        <input
                            placeholder="Password"
                            type="password"
                            className="loginInput"
                            required
                            ref={password}
                        />
                        <input
                            placeholder="Password Again"
                            type="password"
                            className="loginInput"
                            required
                            ref={passwordAgain}
                        />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <span className="orText">or</span>
                        <Link to="/login" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button className="loginRegisterButton">
                                Log into Account
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
