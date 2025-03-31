import { createContext, useContext, useState } from "react";
import { lessonType } from "../constants";
import { SideBarContext } from "./sideBarContext";

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

    // user Progression

    const { heart, setHeart } = useContext(SideBarContext);
    console.log("use context in lesson", useContext(SideBarContext));

    const checkHeartBeat = () => {
        if (heart === 0) {
            alert("make the modal and end the user");
        }
        setHeart((prev) => {
            if (prev < 0) return prev;
            return prev - 1;
        });
    };

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
                    checkHeartBeat();
                }
                // will check for answers like this
                break;
            case lessonType.DRAGANDDROP:
                console.log("usersAnswer", userAnswerDragAndDrop);
                let failedAlready = false;
                const isInvalidState = (userAnswerDragAndDrop) => {
                    return userAnswerDragAndDrop &&
                        Object.values(userAnswerDragAndDrop)?.every(
                            (arr) => arr.length === 0
                        )
                        ? false
                        : true;
                };

                if (!isInvalidState(userAnswerDragAndDrop)) {
                    setIsCorrectAnswer(false);
                    failedAlready = true;
                    checkHeartBeat();
                }
                const validateCategories = (userAnswerDragAndDrop) => {
                    for (const category in userAnswerDragAndDrop) {
                        for (const item of userAnswerDragAndDrop[category]) {
                            if (item.category !== category) {
                                setIsCorrectAnswer(false);
                                return;
                            }
                        }
                    }
                    !failedAlready && setIsCorrectAnswer(true);
                    return;
                };
                validateCategories();
                // will check for answers like this
                break;
            case lessonType.MATCH:
                // will check for answers like this
                if (!userAnswerMatch) {
                    console.log("inside the match case");
                    setIsCorrectAnswer(false);
                    checkHeartBeat();
                }
                break;
            case lessonType.MEMORYGAME:
                // will check for answers like this
                if (!userAnswerMemoryMatch) {
                    setIsCorrectAnswer(false);
                    checkHeartBeat();
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
