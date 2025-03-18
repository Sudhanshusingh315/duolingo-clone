import React, { useContext, useEffect, useState } from "react";
import { LessonContext } from "../../context/lessonContext";

export default function MatchGrid({ data }) {
    const { setUserAnswerMatch } = useContext(LessonContext);
    const { statement, columns } = data;
    const [matchColumns, setMatchColumns] = useState(columns);
    const [selectedPair, setSelectePair] = useState({});
    const [rightGrid, setRightGrid] = useState(
        columns?.map(({ text }, _) => text)
    );
    const [leftGrid, setLeftGrid] = useState(
        columns?.map(({ match }, _) => match)
    );
    const [wrongAnswer, setWrongAnswer] = useState(null);

    console.log("select pair", selectedPair);
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

    useEffect(() => {
        let timer;
        if (selectedPair?.text && selectedPair?.match) {
            setTimeout(() => {
                checkMatch();
            }, 200);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [selectedPair]);

    useEffect(() => {
        if (!rightGrid?.length && !leftGrid?.length) {
            setUserAnswerMatch(true);
        }
    }, [rightGrid?.length, leftGrid?.length]);

    const checkMatch = () => {
        if (!selectedPair?.text && !selectedPair?.match) return;

        let matchedItemIndex;

        matchColumns?.map((element, index) => {
            const { text, match } = element;
            console.log("meow match", element);
            console.log("selected pair", selectedPair);
            if (selectedPair?.text === text && selectedPair?.match === match) {
                console.log("found the match at index", index);
                matchedItemIndex = index;
                setSelectePair({});
                setRightGrid((prev) =>
                    prev.filter((_, index) => index !== matchedItemIndex)
                );
                setLeftGrid((prev) =>
                    prev.filter((_, index) => index !== matchedItemIndex)
                );
            } else {
                setSelectePair({});
                setWrongAnswer(true);
            }
        });

        console.log("matchedItemIndex", matchedItemIndex);
        setMatchColumns((prev) => {
            return prev?.filter((_, index) => matchedItemIndex != index);
        });
    };

    console.log(selectedPair);
    return (
        <div className="grid">
            <h2 className="text-center font-semibold text-white text-xl">
                {statement}
            </h2>
            {rightGrid?.length && leftGrid?.length ? (
                <div className="w-80 min-h-72 flex text items-stretch gap-2">
                    {/* right */}
                    <div className="flex-1 grid justify-center items-start gap-2 place-content-center">
                        {rightGrid?.map((element, index) => {
                            return (
                                <button
                                    variant={
                                        selectedPair?.text === element
                                            ? "secondary-outline"
                                            : "secondary"
                                    }
                                    key={index}
                                    className={
                                        "button flex items-center justify-center"
                                    }
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
                    <div className="flex-1 grid justify-center gap-2 items-start place-content-center">
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
            ) : (
                <div>game over hehe</div>
            )}
        </div>
    );
}
