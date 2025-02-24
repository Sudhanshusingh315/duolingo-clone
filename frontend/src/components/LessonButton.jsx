import { Link } from "react-router";

export default function LessonButton({ lessonId, index }) {
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
        <Link
            to={`/lessonQuiz/${lessonId}`}
            key={index}
            className="mt-4 w-20 aspect-square rounded-full bg-green-400 relative border-b-6 border-b-green-600 cursor-pointer active:bg-green-500 active:border-b-0"
            style={{
                right: `${leftPosition}px`,
            }}
        ></Link>
    );
}
