import "./styles.css";
import { Link } from "react-router-dom";
export default function PlayAgainModal({
    completedLessonId,
    openPopUp,
    setOpenPopUp,
}) {
    const handleNavigationToLesson = () => {};

    const handleBack = () => {
        setOpenPopUp(false);
    };

    return (
        openPopUp && (
            <div className="playagain-parent">
                <div className="playagain">
                    <p>you are going for a completed lesson</p>
                    <div>
                        <button className="button" variant="secondary">
                            <Link to={`/lessonQuiz/${completedLessonId}`}>
                                Play level
                            </Link>
                        </button>
                        <button
                            className="button"
                            variant="primary"
                            onClick={handleBack}
                        >
                            Go back
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
