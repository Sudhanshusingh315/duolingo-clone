import { useContext, useEffect, useRef, useState } from "react";
import "./styles.css";
import { LessonContext } from "../../context/lessonContext";

export default function DragDropSortGame({ data }) {
    const { userAnswerDragAndDrop, setUserAnswerDragAndDrop } =
        useContext(LessonContext);
    const [dragWords, setDragWords] = useState(null);
    const dragItem = useRef(null);
    console.log("this is user drop answerl", userAnswerDragAndDrop);
    useEffect(() => {
        // clear all the previous states;
        // todo: test with these removed, i don't think we need this, since it's changing the state and now updating it
        if (dragItem) dragItem.current = null;
        if (dragWords) setDragWords(null);
        if (userAnswerDragAndDrop) setUserAnswerDragAndDrop(null);

        const { categories } = data;
        setUserAnswerDragAndDrop(() => {
            const result = data?.categories.reduce((acc, curr) => {
                if (!acc[curr]) {
                    acc[curr] = [];
                }
                return acc;
            }, {});
            return result;
        });
        setDragWords(data?.words);
    }, [data]);

    const handleDragStart = (e, element) => {
        const { target } = e;
        target.classList.add("test");
        dragItem.current = element;
    };
    const handleDragEnd = (e) => {
        const { target } = e;
        target.classList.remove("test");
    };
    const handleDragCapture = (e, captureContainer) => {
        console.log("capture", captureContainer);
        const draggingItem = dragItem.current;

        // to remove the item from the parent
        setDragWords((prev) => {
            return prev.filter((item) => item?.text != draggingItem.text);
        });
        // to add to the dropped element
        setUserAnswerDragAndDrop((prev) => {
            return {
                ...prev,
                [captureContainer]: [...prev[captureContainer], draggingItem],
            };
        });
    };

    return (
        <div className="max-w-[600px]">
            <div className="my-4 text-center text-xl font-semibold text-white">
                Go ahead put 'em where they belong
            </div>
            <div className="flex gap-2 w-full flex-wrap">
                {dragWords?.map((element, index) => {
                    return (
                        <p
                            draggable
                            className="w-20 cursor-move aspect-video flex justify-center items-center bg-green-500 rounded-lg text-white"
                            onDragStart={(e) => {
                                handleDragStart(e, element);
                            }}
                            onDragEnd={handleDragEnd}
                        >
                            {element?.text}
                        </p>
                    );
                })}
            </div>
            <div className="flex gap-2 mt-8 justify-evenly items-center ">
                {userAnswerDragAndDrop &&
                    Object?.keys(userAnswerDragAndDrop)?.map(
                        (element, index) => {
                            return (
                                <p
                                    key={index}
                                    onDrop={(e) => {
                                        handleDragCapture(e, element);
                                    }}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                    }}
                                    className="w-40 aspect-square bg-emerald-500 text-white rounded-md"
                                >
                                    <div className="grid gap-2">
                                        <p className="text-center font-bold p-1 text-emerald-950">
                                            {element}
                                        </p>
                                        {userAnswerDragAndDrop[element]?.map(
                                            (meow, index) => {
                                                return (
                                                    <div className="p-2 ">
                                                        {meow?.text}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </p>
                            );
                        }
                    )}
            </div>
        </div>
    );
}
