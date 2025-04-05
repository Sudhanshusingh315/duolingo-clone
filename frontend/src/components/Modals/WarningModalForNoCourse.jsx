import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
export default function WarningForNoCourse({ openWarning, setOpenWarning }) {
    const navigate = useNavigate();
    const handleChangeLanguage = () => {
        setOpenWarning(false);
        navigate("/lesson/lang-course");
    };
    return (
        openWarning && (
            <div className="warningCourse-modal-parent">
                <div className="warningCourse-modal">
                    <div className="warning-modal-header">
                        <img src="https://www.psychologs.com/wp-content/uploads/2024/12/how-duolingo-used-psychology-to-make-learning-addictive-1.jpg" />
                        <p>
                            Oh, didn&apos;t add a course? What a shocker!
                            I&apos;m sure the universe will survive without it.
                        </p>
                    </div>
                    <button
                        className="button-center"
                        onClick={handleChangeLanguage}
                    >
                        Select another course
                    </button>
                </div>
            </div>
        )
    );
}
