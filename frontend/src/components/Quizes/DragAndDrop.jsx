import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const words = [
    { text: "Apple", category: "Fruits" },
    { text: "Carrot", category: "Vegetables" },
    { text: "Banana", category: "Fruits" },
    { text: "Potato", category: "Vegetables" },
    { text: "Dog", category: "Animals" },
    { text: "Cat", category: "Animals" },
];

const categories = ["Fruits", "Vegetables", "Animals"];

const DraggableWord = ({ word }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "WORD",
        item: word,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`p-2 m-1 bg-green-400 text-white rounded cursor-pointer transition-opacity ${
                isDragging ? "opacity-10" : "opacity-100"
            }`}
        >
            {word.text}
        </div>
    );
};

const DropBucket = ({ category, onDrop, words }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "WORD",
        drop: (item) => onDrop(item, category),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`p-4 border-2 rounded w-1/3 min-h-[100px] transition-colors ${
                isOver ? "bg-green-400" : "bg-gray-100"
            }`}
        >
            <h2 className="text-lg font-bold mb-2">{category}</h2>
            {words.map((word, index) => (
                <div key={index} className="p-2 m-1 bg-gray-300 rounded">
                    {word.text}
                </div>
            ))}
        </div>
    );
};

const DragDropSortGame = ({ data }) => {
    const [buckets, setBuckets] = useState(
        data?.categories?.reduce((acc, cur) => {
            if (!acc[cur]) {
                acc[cur] = [];
            }
            return acc;
        }, {})
    );
    const [testWords, setTestWords] = useState(data?.words);
    const [testCategory, setTestCategory] = useState(data?.categories);
    const handleDrop = (word, category) => {
        setBuckets((prev) => {
            const updated = { ...prev };
            updated[category] = [...updated[category], word];
            return updated;
        });
        setTestWords((prev) => {
            return prev.filter((element, index) => {
                return element?.text !== word?.text;
            });
        });
    };
    const checkWin = () => {
        return testWords.every((word) =>
            buckets[word.category].some((w) => w.text === word.text)
        );
    };
    console.log("buckets", buckets);
    console.log("words", testWords);
    console.log("category", testCategory);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-5 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4">Sort the Words</h1>
                <div className="flex gap-4 mb-4">
                    {testWords.map((word, index) => (
                        <DraggableWord key={index} word={word} />
                    ))}
                </div>
                <div className="flex justify-center gap-4 w-full ">
                    {testCategory.map((category, index) => (
                        <DropBucket
                            key={index}
                            category={category}
                            onDrop={handleDrop}
                            words={buckets[category]}
                        />
                    ))}
                </div>
                <button
                    onClick={() => alert(checkWin() ? "You Win!" : "You Lose!")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Check Result
                </button>
            </div>
        </DndProvider>
    );
};

export default DragDropSortGame;
