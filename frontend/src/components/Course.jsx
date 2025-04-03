import { useContext, useState } from "react";
import LessonButton from "./LessonButton";
import { SideBarContext } from "../context/sideBarContext";
import { useNavigate } from "react-router";
import PlayAgainModal from "../modals/playAgainModal";
export default function Course({ name, chapters }) {
    // gonna get the title here
    // gonna get the chapters here so render those from here.
    const { userProgression } = useContext(SideBarContext);
    const [completedLessonId, setCompletedLessonId] = useState(null);

    const [openPopUp, setOpenPopUp] = useState(false);
    console.log("userProgression ", userProgression);
    const navigation = useNavigate();
    const handleNavigation = (lessonId) => {
        if (userProgression?.completedChaters?.includes(lessonId)) {
            setOpenPopUp(true);
            setCompletedLessonId(lessonId);
            return;
        }
        navigation(`/lessonQuiz/${lessonId}`);
    };
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
                            active={
                                userProgression?.completedChaters?.includes(
                                    lessonId
                                ) ||
                                userProgression?.currentChapter === lessonId
                                    ? "active"
                                    : "inactive"
                            }
                            isCurrentChapter={
                                lessonId === userProgression?.currentChapter
                            }
                            completedChaters={userProgression?.completedChaters}
                            handleNavigation={handleNavigation}
                        />
                    );
                })}
            </div>

            <PlayAgainModal
                completedLessonId={completedLessonId}
                openPopUp={openPopUp}
                setOpenPopUp={setOpenPopUp}
            />
        </div>
    );
}
