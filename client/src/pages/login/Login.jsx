import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
    const email = useRef();
    const password = useRef();

    const { isFetching, error, dispatch } = useContext(AuthContext);

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
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
                    <form className="loginBox" onSubmit={handleClick}>
                        <input
                            type="email"
                            placeholder="Email"
                            className="loginInput"
                            required
                            minLength="6"
                            ref={email}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="loginInput"
                            required
                            ref={password}
                        />
                        {error && (
                            <span className="errorMessage">Wrong Username or Password!</span>
                        )}
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? "loading" : "Log In"}
                        </button>
                        <span className="orText">or</span>
                        <Link to="/register" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button className="loginRegisterButton">
                                {isFetching ? "loading" : "Create a New Account"}
                            </button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
