import { useEffect, useState } from "react";

export default function DragDropSortGame({ data }) {
    const { categories, words } = data;

    const [dragCategoriesWords, setDragCategoriesWords] = useState(null);
    const [dragWords, setDragWords] = useState(null);
    useEffect(() => {
        setDragCategoriesWords(data?.categories);
        setDragWords(data?.words);
    }, [data]);
    return (
        <div className="max-w-[600px]">
            <div>Go ahead put 'em where they belong</div>
            <div className="border flex gap-2">
                {dragWords?.map((element, index) => {
                    return (
                        <p
                            draggable
                            className="w-20 aspect-video flex justify-center items-center bg-green-500 rounded-lg text-white"
                        >
                            {element?.text}
                        </p>
                    );
                })}
            </div>
            <div className="border flex gap-2 mt-4 justify-evenly items-center">
                {dragCategoriesWords?.map((element, index) => {
                    return (
                        <p className="flex gap-2 w-40 aspect-square bg-emerald-500 text-white">
                            {element}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}
