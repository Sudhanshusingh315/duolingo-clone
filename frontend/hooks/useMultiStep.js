import { useState } from "react";

export default function useMultiSetp(steps) {
    console.log("steps are ", steps);
    const [currentIndex, setCurrentIndex] = useState(0);
    const next = () => {
        console.log("next clicked");
        setCurrentIndex((prev) => {
            if (prev >= steps.length - 1) return prev;
            return prev + 1;
        });
    };
    const back = () => {
        setCurrentIndex((prev) => {
            if (prev <= 0) return prev;
            return prev - 1;
        });
    };

    return {
        currentIndex,
        steps,
        step: steps[currentIndex],
        next,
        back,
    };
}
