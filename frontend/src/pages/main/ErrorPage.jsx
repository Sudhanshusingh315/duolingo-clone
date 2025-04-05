import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function () {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate("/lesson/lang-course");
    };
    return (
        <div className="errorPage">
            <h1>404</h1>
            <p>reached</p>
            <button
                onClick={handleNavigation}
                className="button"
                variant="danger"
            >
                Go home !
            </button>
        </div>
    );
}
