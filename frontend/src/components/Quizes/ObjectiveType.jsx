import { useState } from "react";

export const ObjectiveType = ({
    data,
    setSelectedAnswerData,
    setSelectedObjectiveOptions,
    selectedObjectiveOption,
    value,
    setValue,
    updatetest,
}) => {
    const [test, setTest] = useState();
    const { question, options, quizType, id } = data;
    const handleSelect = (data) => {
        setTest(data?.index);
        setSelectedAnswerData((prev) => data);
        setSelectedObjectiveOptions(data?.index);
    };
    console.log("calling from child", selectedObjectiveOption);
    return (
        <div>
            <h2 className="text-2xl mb-6 text-center text-white">{question}</h2>
            <div className="grid gap-2 ">
                {options?.map(({ text, isCorrect }, index) => {
                    return (
                        <button
                            key={index}
                            className="button"
                            variant={
                                selectedObjectiveOption === index
                                    ? "primary-outline"
                                    : "primary"
                            }
                            onClick={() => {
                                const info = {
                                    quizId: id,
                                    quizType,
                                    selectedOption: options[index],
                                    index,
                                };
                                handleSelect(info);
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
