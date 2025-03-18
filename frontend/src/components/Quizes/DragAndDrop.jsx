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
        <>
            <div>hehehe</div>
            <div>
                {dragCategoriesWords?.map((element, index) => {
                    return (
                        <p className="flex gap-2 w-20 aspect-square bg-amber-600 text-white">
                            {element}
                        </p>
                    );
                })}
            </div>
            <div>
                {dragWords?.map((element, index) => {
                    return (
                        <p className="w-20 aspect-square bg-amber-600 text-white">
                            {element?.text}
                        </p>
                    );
                })}
            </div>
        </>
    );
}
