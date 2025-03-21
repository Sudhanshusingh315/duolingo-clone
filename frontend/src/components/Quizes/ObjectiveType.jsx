import { useContext, useState } from "react";
import { LessonContext } from "../../context/lessonContext";

export const ObjectiveType = ({ data }) => {
    const { userAnswer, setUserAnswer } = useContext(LessonContext);
    const [isSelectedOption, setIsSelectedOption] = useState(null);
    console.log("data objective", data);
    const { question, options, quizType, id } = data;
    return (
        <div className="min-w-48">
            <h2 className="text-2xl mb-6 text-center  text-white">
                {question}
            </h2>
            <div className="grid gap-2">
                {options?.map(({ text, isCorrect }, index) => {
                    return (
                        <button
                            key={index}
                            className="button"
                            variant={`${
                                userAnswer?.text === text
                                    ? "primary-outline"
                                    : "primary"
                            }`}
                            onClick={() => {
                                setUserAnswer({ text, isCorrect });
                            }}
                        >
                            {text}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
