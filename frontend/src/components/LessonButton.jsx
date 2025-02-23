export default function LessonButton({index}) {
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

    return (
        <p
            key={index}
            className="mt-4 w-20 aspect-square rounded-full bg-green-400 relative border-b-6 border-b-green-600 hover:bg-green-600 active:bg-green-500 active:border-b-0"
            style={{
                right: `${leftPosition}px`,
            }}
        ></p>
    );
}
