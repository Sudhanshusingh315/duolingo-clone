import { useNavigate, useSearchParams } from "react-router";
import dl from "../../assets/duolingo-auth.jpg";
import dl2 from "../../assets/duolingo-auth-2.jpg";
import "./styles.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin, userRegister } from "../../features/auth/auth";
import { toast } from "react-toastify";
import { GuestUserCredentials } from "../../constants";

export default function Auth() {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get("isLogin");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const guestLogin = () => {
        const data = {
            email: GuestUserCredentials.userEmail,
            password: GuestUserCredentials.userPassword,
        };

        dispatch(userLogin(data)).then((res) => {
            const { payload } = res;
            if (!payload) {
                toast.error("Login failed", { position: "top-right" });
            }
            if (payload?.accessToken) {
                navigate("/lesson/lang-course");
            }
        });
    };

    const handleAuth = async () => {
        if (isLogin) {
            // login api
            // redirect and to the lesson
            const data = {
                email,
                password,
            };
            dispatch(userLogin(data)).then((res) => {
                console.log("coming from dispatch auth", res);
                const { payload } = res;
                if (!payload) {
                    toast.error("Login failed", { position: "top-right" });
                }
                if (payload?.accessToken) {
                    navigate("/lesson/lang-course");
                }
            });
        } else {
            // register api
            // redirect and to the login screen and then login
            const data = {
                name,
                email,
                password,
            };
            dispatch(userRegister(data)).then((res) => {
                console.log("coming from dispatch auth", res);
                const { payload } = res;
                console.log("res from register", res);
                if (!res?.success) {
                    toast.error("Fill the required fields", {
                        position: "top-right",
                    });
                    return;
                }
                if (payload?.accessToken) {
                    navigate("/lesson/lang-course");
                }
            });
        }

        setEmail("");
        setName("");
        setPassword("");
    };

    return (
        <div className="h-screen flex justify-center items-center bg-slate-900/50">
            <div className="auth-box">
                <div className="left-side">
                    <picture>
                        <source srcSet={dl} media="(min-width:600px)" />
                        <img src={dl2} alt="duolingo auth screen" />
                    </picture>
                </div>
                {
                    <div className="right-side">
                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        )}
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />

                        <button
                            className="button"
                            variant="secondary"
                            onClick={handleAuth}
                        >
                            {isLogin ? "Login" : "Register"}
                        </button>
                        <button
                            className="button"
                            variant="primary"
                            onClick={guestLogin}
                        >
                            Guest Login
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}
