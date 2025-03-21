import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { constantsConfig, lessonType } from "../../constants";
import DragDropSortGame from "../../components/Quizes/DragAndDrop";
import MatchGrid from "../../components/Quizes/MatchGrid";
import MemoryMatch from "../../components/Quizes/MemoryMatch";
import { ObjectiveType } from "../../components/Quizes/ObjectiveType";
import { LessonContext } from "../../context/lessonContext";
import { Check } from "lucide-react";
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
        // if the quiz has been over then make the model and show
        // the progress and, move the user to the next

        // modal or next page?   hmmm

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
                                        isCorrectAnswer ? "lightgreen" : "red"
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
    );
}
