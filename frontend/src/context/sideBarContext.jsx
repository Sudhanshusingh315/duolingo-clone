import { createContext, useState } from "react";
import axios from "axios";
import { constantsConfig } from "../constants";
import { useSelector } from "react-redux";
export const SideBarContext = createContext(null);

export const SideBarDataContextProvider = ({ children }) => {
    const [selectedLang, setSelectedLang] = useState("");
    const [selectedLangCode, setSelectedLangCode] = useState("");
    const [userProgression, setUserProgression] = useState(null);
    const { accessToken } = useSelector((state) => state.auth);
    const [heart, setHeart] = useState(0);
    const [lessonDoingRn, setLessonDoingRn] = useState(null);
    // userProgression related stuff
    const [userCourse, setUserCourses] = useState();

    const handleNextQuiz = async () => {
        // rest of the details
        // you can get from userProgression
        try {
            let { currentCourse } = userProgression;

            const data = {
                currentCourse,
                currentChater: lessonDoingRn,
                userProgressionId: userProgression._id,
                heart,
                completedChapter: userProgression?.completedChaters,
            };

            const response = await axios({
                url: `${constantsConfig.BASE_URL}/api/auth/user/progression/endQuiz`,
                method: "patch",
                data,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch (err) {
            console.log("error", err);
            const { response } = err;

            toast.error(response?.data?.message, "top-right");
            dispatch(destroyToken());
        }
    };

    return (
        <SideBarContext.Provider
            value={{
                selectedLang,
                setSelectedLang,
                userProgression,
                setUserProgression,
                heart,
                setHeart,
                userCourse,
                setUserCourses,
                handleNextQuiz,
                selectedLangCode,
                setSelectedLangCode,
                lessonDoingRn,
                setLessonDoingRn,
            }}
        >
            {children}
        </SideBarContext.Provider>
    );
};
