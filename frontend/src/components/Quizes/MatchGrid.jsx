import React, { useState } from "react";

const wordPairs = [
    { text: "Hello", match: "Hola" },
    { text: "Goodbye", match: "Adiós" },
    { text: "Thank you", match: "Gracias" },
    { text: "Please", match: "Por favor" },
];

export default function MatchGrid() {
    const [selectedPair, setSelectePair] = useState({});
    const [rightGrid, setRightGrid] = useState(
        wordPairs?.map(({ text }, _) => text)
    );
    const [leftGrid, setLeftGrid] = useState(
        wordPairs?.map(({ match }, _) => match)
    );

    const handleSelect = (data) => {
        setSelectePair((prev) => {
            if (!prev.text || !prev.match) {
                return {
                    ...prev,
                    ...data,
                };
            } else {
                console.log("won't change the state");
                return prev;
            }
        });
    };

    console.log(selectedPair);
    return (
        <>
            <h2>Hello</h2>
            <div className="border w-80 min-h-72 flex text items-stretch gap-2">
                {/* right */}
                <div className="flex-1 grid justify-center gap-2">
                    {rightGrid?.map((element, index) => {
                        return (
                            <button
                                variant={
                                    selectedPair?.text === element
                                        ? "secondary-outline"
                                        : "secondary"
                                }
                                key={index}
                                className="button flex items-center justify-center"
                                onClick={(e) => {
                                    const data = { text: element };
                                    handleSelect(data);
                                }}
                                style={{
                                    cursor: `${
                                        selectedPair?.text &&
                                        selectedPair?.match &&
                                        selectedPair?.text !== element
                                            ? "not-allowed"
                                            : "pointer"
                                    }`,
                                }}
                            >
                                {element}
                            </button>
                        );
                    })}
                </div>

                {/*  */}
                <div className="flex-1 grid justify-center gap-2">
                    {leftGrid?.map((element, index) => {
                        return (
                            <button
                                key={index}
                                variant={
                                    selectedPair?.match === element
                                        ? "secondary-outline"
                                        : "secondary"
                                }
                                className="button flex items-center justify-center"
                                onClick={(e) => {
                                    const data = { match: element };
                                    handleSelect(data);
                                }}
                                style={{
                                    cursor: `${
                                        selectedPair?.match &&
                                        selectedPair?.text &&
                                        selectedPair?.match !== element
                                            ? "not-allowed"
                                            : "pointer"
                                    }`,
                                }}
                            >
                                {element}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
