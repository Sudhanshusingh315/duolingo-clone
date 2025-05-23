import { Link } from "react-router";
import "./styles.css";
import { Star, LockKeyhole } from "lucide-react";
import { useState } from "react";
import PlayAgainModal from "../modals/playAgainModal";
export default function LessonButton({
    lessonId,
    index,
    active,
    isCurrentChapter,
    completedChaters,
    handleNavigation,
}) {
    const svgSize = 25;
    const cycleLenght = 8;
    const cycleIndex = index % cycleLenght;
    let indentationLevel;

    if (cycleIndex <= 2) {
        indentationLevel = cycleIndex;
    } else if (cycleIndex <= 4) {
        indentationLevel = 4 - cycleIndex;
    } else if (cycleIndex <= 6) {
        indentationLevel = 4 - cycleIndex;
    } else {
        indentationLevel = cycleIndex - 8;
    }

    const leftPosition = indentationLevel * 40;
    /*
        each button is lesson that contains multiple
        quizes

    */
    return (
        <>
            <div
                // to={active === "active" ? `/lessonQuiz/${lessonId}` : ``}
                onClick={() => {
                    handleNavigation(lessonId);
                }}
                key={index}
                className="lesson-button"
                data-active={active}
                style={{
                    right: `${leftPosition}px`,
                    pointerEvents: `${active === "active" ? "" : "none"}`,
                }}
                data-currentChapter={isCurrentChapter ? "start" : undefined}
            >
                <div className="meow">
                    {active === "active" ? (
                        <Star size={svgSize} />
                    ) : (
                        <LockKeyhole size={svgSize} />
                    )}
                </div>
            </div>
        </>
    );
}
