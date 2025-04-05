import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { constantsConfig, lessonType } from "../../constants";
import DragDropSortGame from "../../components/Quizes/DragAndDrop";
import MatchGrid from "../../components/Quizes/MatchGrid";
import MemoryMatch from "../../components/Quizes/MemoryMatch";
import { ObjectiveType } from "../../components/Quizes/ObjectiveType";
import { LessonContext } from "../../context/lessonContext";
import { Check, Plus } from "lucide-react";
import LessonReviewModal from "../../components/Modals/LessonReviewModal";
import { SideBarContext } from "../../context/sideBarContext";
const componentMap = {
    [lessonType.MATCH]: MatchGrid,
    [lessonType.MEMORYGAME]: MemoryMatch,
    [lessonType.DRAGANDDROP]: DragDropSortGame,
    [lessonType.OBJECTIVE]: ObjectiveType,
};

// todo: make a 404 page this app and duolingo as well

export default function Lesson() {
    const {
        quizzes,
        setQuizzes,
        currentIndex,
        setCurrentIndex,
        userAnswer,
        setUserAnswer,
        handleCheckAnswer,
        isCorrectAnswer,
        setIsCorrectAnswer,
        moveToNext,
        setMoveToNext,
        setUserAnswerMatch,
        setUserAnswerMemoryMatch,
        setUserAnswerDragAndDrop,
    } = useContext(LessonContext);
    let { lessonId } = useParams();
    const answerProgressRef = useRef(0);
    const [showLessonReviewModal, setShowLessonReviewModal] = useState(false);
    let navigate = useNavigate();
    const { setLessonDoingRn } = useContext(SideBarContext);
    setLessonDoingRn(lessonId);
    // state determining the answers;
    answerProgressRef.current = (currentIndex / quizzes?.length) * 100;

    useEffect(() => {
        (async () => {
            const { data } = await axios({
                url: `${constantsConfig.BASE_URL}/api/chapter/get-chapter/${lessonId}`,
            });
            const { data: newData } = data;
            const { quiz } = newData[0];
            console.log("all of the lessons", newData);
            setQuizzes((prev) => {
                return [...quiz];
            });
        })();
    }, []);

    const handleNext = () => {
        // if the quiz has been over then make the model and show
        // the progress and, move the user to the next

        // modal or next page?   hmmm
        if (currentIndex === quizzes?.length - 1) {
            setShowLessonReviewModal(true);
            return;
        }
        setCurrentIndex((prev) => prev + 1);
        setMoveToNext(false);
        setIsCorrectAnswer(null);
    };

    const cancleQuiz = () => {
        // reset all the state and move back;
        setUserAnswer(null);
        setUserAnswerMatch(null);
        setUserAnswerMatch(null);
        setUserAnswerDragAndDrop(null);
        navigate(-1);
    };

    const currentQuiz = quizzes && quizzes[currentIndex];
    const QuizComponent = componentMap[currentQuiz?.quizType];
    return (
        <>
            <div className="w-full min-h-screen flex flex-col justify-evenly items-center bg-emerald-950">
                <div className="w-[80%] max-w-[900] mx-auto flex items-center">
                    <Plus
                        className="rotate-45 rounded-full p-1 hover:bg-green-300/80 "
                        color="white"
                        size={30}
                        onClick={cancleQuiz}
                    />
                    <div className="bg-green-400/20 rounded-full h-4 w-full ">
                        <div
                            className="bg-green-500 rounded-full h-full transition-all 500ms ease-out"
                            style={{
                                width: `${answerProgressRef.current}%`,
                            }}
                        ></div>
                    </div>
                </div>
                <div>
                    {QuizComponent && <QuizComponent data={currentQuiz} />}
                </div>
                <div
                    className={`flex flex-col justify-center items-center w-full text-white fixed bottom-0 bg-emerald-900 py-6 px-4`}
                >
                    <div className="flex justify-between w-full">
                        {isCorrectAnswer !== null && (
                            <div className="flex min-w-fit gap-2">
                                <div
                                    className={`flex-1 rounded-full aspect-square ${
                                        isCorrectAnswer
                                            ? "bg-green-950"
                                            : "bg-red-200"
                                    } flex justify-center items-center`}
                                >
                                    <Check
                                        size={30}
                                        strokeWidth={6}
                                        color={
                                            isCorrectAnswer
                                                ? "lightgreen"
                                                : "red"
                                        }
                                    />
                                </div>
                                <div className=" flex-1 font-bold text-lg justify-items-center content-center ">
                                    {isCorrectAnswer
                                        ? "Correct answer"
                                        : "Wrong answer "}
                                </div>
                            </div>
                        )}
                        <button
                            className="button ml-auto"
                            variant={
                                isCorrectAnswer === null
                                    ? "secondary"
                                    : isCorrectAnswer
                                    ? "secondary-outline"
                                    : "danger-outline"
                            }
                            onClick={() => {
                                moveToNext ? handleNext() : handleCheckAnswer();
                            }}
                        >
                            {moveToNext ? "Next" : "Continue"}
                        </button>
                    </div>
                </div>
            </div>
            {/* finish lesson modal */}
            <LessonReviewModal
                show={showLessonReviewModal}
                setShow={setShowLessonReviewModal}
            />
        </>
    );
}
