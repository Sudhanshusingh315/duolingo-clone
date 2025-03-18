import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { constantsConfig, lessonType } from "../../constants";
import DragDropSortGame from "../../components/Quizes/DragAndDrop";
import MatchGrid from "../../components/Quizes/MatchGrid";
import MemoryMatch from "../../components/Quizes/MemoryMatch";
import { ObjectiveType } from "../../components/Quizes/ObjectiveType";
import { LessonContext } from "../../context/lessonContext";

const componentMap = {
    [lessonType.MATCH]: MatchGrid,
    [lessonType.MEMORYGAME]: MemoryMatch,
    [lessonType.DRAGANDDROP]: DragDropSortGame,
    [lessonType.OBJECTIVE]: ObjectiveType,
};

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
    } = useContext(LessonContext);
    let { lessonId } = useParams();

    // state determining the answers;

    useEffect(() => {
        (async () => {
            const { data } = await axios({
                url: `${constantsConfig.BASE_URL}/api/chapter/get-chapter/${lessonId}`,
            });
            const { data: newData } = data;
            const { quiz } = newData[0];
            setQuizzes((prev) => {
                return [...quiz];
            });
        })();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prev) => prev + 1);
        setMoveToNext(false);
        setIsCorrectAnswer(null);
    };

    const currentQuiz = quizzes && quizzes[currentIndex];
    const QuizComponent = componentMap[currentQuiz?.quizType];
    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-emerald-950">
            <div>{QuizComponent && <QuizComponent data={currentQuiz} />}</div>
            <div
                className={`flex flex-col justify-center items-center w-full text-white fixed bottom-0 bg-emerald-900 py-6 px-4`}
            >
                {isCorrectAnswer !== null && (
                    <p>{isCorrectAnswer ? "Correct Answer" : "Wrong Answer"}</p>
                )}

                <button
                    className="button w-full"
                    variant="secondary"
                    onClick={() => {
                        moveToNext ? handleNext() : handleCheckAnswer();
                    }}
                >
                    {moveToNext ? "Next" : "Continue"}
                </button>
            </div>
        </div>
    );
}
