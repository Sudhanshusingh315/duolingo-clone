import MatchGrid from "./MatchGrid";

const testData = {
    question: "i was born in 1967 ? ",

    options: [
        {
            text: "for",
            isCorrect: false,
        },
        {
            text: "since",
            isCorrect: false,
        },
        {
            text: "ago",
            isCorrect: false,
        },
        {
            text: "in",
            isCorrect: true,
        },
    ],
};
export const ObjectiveType = () => {
    return (
        <div>
            <h2 className="text-2xl mb-6 text-center text-white">{testData?.question}</h2>
            <div className="grid gap-2 ">
                {testData?.options?.map(({ text, isCorrect }, index) => {
                    return (
                        <button
                            key={index}
                            className="button"
                            variant="primary-outline"
                        >
                            text
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
