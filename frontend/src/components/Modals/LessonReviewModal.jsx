import { useContext } from "react";
import "./styles.css";
import { SideBarContext } from "../../context/sideBarContext";
import { useNavigate } from "react-router-dom";
export default function LessonReviewModal({ show, setShow }) {
    const { handleNextQuiz, selectedLang } = useContext(SideBarContext);
    const navigate = useNavigate();
    const next = async () => {
        await handleNextQuiz();
        navigate(`/lesson/course-component?languageCode=${selectedLang}`);
    };

    return (
        show && (
            <div className="dialog">
                <div className="dialog-content shadow-xl">
                    <div className="grid gap-3">
                        <p className="text-5xl">🥳</p>
                        <h2 className="text-xl font-semibold">Great Job!</h2>
                        <h3 className="text-lg">
                            You've completed the lesson.
                        </h3>
                    </div>
                    {/* lesson stats */}
                    <div className="lesson-stats">
                        <div className="stat-box">
                            {/* total xp*/}
                            TOTAL XP
                            <div className="sub-stat-box">
                                <p>⚡</p>
                                <p>30</p>
                            </div>
                        </div>

                        <div className="stat-box" type="heart">
                            {/* total xp*/}
                            TOTAL XP
                            <div className="sub-stat-box" type="heart">
                                <p>❤️</p>
                                <p>3</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 flex justify-center items-center gap-2">
                        <button
                            className="button text-sm"
                            variant="primary-outline"
                        >
                            Play again
                        </button>
                        <button
                            variant="secondary-outline"
                            className="button text-sm"
                            onClick={next}
                        >
                            Next Quiz
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
