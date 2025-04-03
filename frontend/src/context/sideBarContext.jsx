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

    // userProgression related stuff
    const [userCourse, setUserCourses] = useState();

    const handleNextQuiz = async () => {
        // rest of the details
        // you can get from userProgression
        let { currentCourse } = userProgression;

        const data = {
            currentCourse,
            currentChater: userProgression?.currentChapter,
            userProgressionId: userProgression._id,
            heart,
        };

        const response = await axios({
            url: `${constantsConfig.BASE_URL}/api/auth/user/progression/endQuiz`,
            method: "patch",
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log("response", response);
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
            }}
        >
            {children}
        </SideBarContext.Provider>
    );
};
