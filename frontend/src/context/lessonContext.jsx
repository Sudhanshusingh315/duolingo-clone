import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { constantsConfig, lessonType } from "../constants";

export const LessonContext = createContext(null);

export const LessonContextProvider = ({ children }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    // objective
    const [userAnswer, setUserAnswer] = useState(null);
    // match
    const [userAnswerMatch, setUserAnswerMatch] = useState(false);
    // memory match
    const [userAnswerMemoryMatch, setUserAnswerMemoryMatch] = useState(null);

    // drag and drop
    const [userAnswerDragAndDrop, setUserAnswerDragAndDrop] = useState(null);

    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
    const [moveToNext, setMoveToNext] = useState(false);

    const handleCheckAnswer = () => {
        // this holds the data from the current quiz
        const currentQuiz = quizzes[currentIndex];
        const { quizType } = currentQuiz;

        switch (quizType) {
            case lessonType.OBJECTIVE:
                console.log(currentQuiz);
                const { options } = currentQuiz;
                const matchedItem = options?.find(
                    (item) => item?.text === userAnswer?.text
                );
                if (matchedItem?.isCorrect) {
                    console.log("correct answer");
                    setIsCorrectAnswer(true);
                } else {
                    console.log("wrong answer");
                    setIsCorrectAnswer(false);
                }
                // will check for answers like this
                break;
            case lessonType.DRAGANDDROP:
                // will check for answers like this
                break;
            case lessonType.MATCH:
                // will check for answers like this
                if (!userAnswerMatch) {
                    setIsCorrectAnswer(false);
                }
                break;
            case lessonType.MEMORYGAME:
                // will check for answers like this
                if (!userAnswerMemoryMatch) {
                    setIsCorrectAnswer(false);
                }
                break;
            default:
                console.log("Type not found");
                break;
        }
        setMoveToNext(true);
        setUserAnswer(null);
    };
    console.log("userAnswerMatch", userAnswerMatch);
    return (
        <LessonContext.Provider
            value={{
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
                userAnswerMemoryMatch,
                setUserAnswerMemoryMatch,
                setUserAnswerDragAndDrop,
                userAnswerDragAndDrop,
            }}
        >
            {children}
        </LessonContext.Provider>
    );
};
