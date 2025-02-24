const testData = {
    question: "i was born in 1967 ?",

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
    return <div>
        <h2>{testData?.question}</h2>
        
    </div>
};
