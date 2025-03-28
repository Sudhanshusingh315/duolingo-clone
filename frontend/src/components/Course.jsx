import LessonButton from "./LessonButton";
export default function Course({
    languageId,
    name,
    description,
    difficultyLevel,
    chapters,
}) {
    // gonna get the title here
    // gonna get the chapters here so render those from here.

    return (
        <div>
            <div className="flex items-center">
                <p className="flex-1 horizontal-border "></p>
                <p className="text-xl font-semibold text-gray-400 mx-4">
                    {name}
                </p>
                <p className="flex-1 horizontal-border "></p>
            </div>

            {/* chapter buttons */}
            <div className="flex flex-col items-center py-4">
                {chapters?.map((lessonId, index) => {
                    return (
                        <LessonButton
                            lessonId={lessonId}
                            key={index}
                            index={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}
