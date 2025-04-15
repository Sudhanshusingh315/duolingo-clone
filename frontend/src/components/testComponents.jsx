import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseByLang } from "../features/course/courseMaterial";
import Course from "./Course";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { constantsConfig } from "../constants";
import { SideBarContext } from "../context/sideBarContext";
import WarningModal from "../components/Modals/WarningModalForNoCourse";
import duoload from "../assets/duoload.gif";
import { toast } from "react-toastify";
import { Heater, Popsicle } from "lucide-react";

export default function TestComponents() {
    const dispatch = useDispatch();
    const {
        setUserProgression,
        heart,
        setHeart,
        setUserCourses,
        setSelectedLangCode,
    } = useContext(SideBarContext);
    const { courses } = useSelector((state) => state.course);
    const { accessToken } = useSelector((state) => state.auth);
    const [languageId, setLanguageId] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const languageCode = searchParams?.get("languageCode");
    const [openWarning, setOpenWarning] = useState(false);
    courses && setUserCourses(courses);
    useEffect(() => {
        if (!courses?.length) {
            setOpenWarning(true);
            return;
        } else {
            setOpenWarning(false);
            return;
        }
    }, [courses]);
    useEffect(() => {
        if (!languageCode) return;
        (async () => {
            try {
                const {
                    data: { data },
                } = await axios({
                    url: `${constantsConfig.BASE_URL}/api/language/get-language/${languageCode}`,
                });

                const { id } = data[0];

                setLanguageId(id);
                setSelectedLangCode(id);
            } catch (err) {
                console.log("error ", err);
            }
        })();
    }, [languageCode]);

    useEffect(() => {
        if (!languageId) return;

        // gets the course from the language
        dispatch(fetchCourseByLang(languageId));
        try {
            (async () => {
                const {
                    data: { data },
                } = await axios({
                    url: `${constantsConfig.BASE_URL}/api/auth/user/progression/${languageId}`,
                    method: "get",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const { heart } = data[0];
                setHeart(heart);
                setUserProgression(data[0]);
            })();
        } catch (err) {
            const { response } = err;
            if (response?.data?.message === "invalid token") {
                toast.error("invalide token", { position: "top-right" });
            } else {
                toast.error(response?.data?.message, { position: "top-right" });
            }
        }
    }, [languageId]);
    return (
        <>
            <div>
                {!courses?.length ? (
                    <div className="course-loader">
                        <img src={duoload} />
                        {/* <WarningModal openWarning={openWarning} /> */}
                    </div>
                ) : (
                    <div>
                        {courses?.map(
                            (
                                {
                                    languageId,
                                    name,
                                    description,
                                    difficultyLevel,
                                    chapters,
                                },
                                index
                            ) => {
                                return (
                                    <React.Fragment key={index}>
                                        <Course
                                            languageId={languageId}
                                            name={name}
                                            description={description}
                                            difficultyLevel={difficultyLevel}
                                            chapters={chapters}
                                            setOpenWarning={setOpenWarning}
                                        />
                                    </React.Fragment>
                                );
                            }
                        )}
                    </div>
                )}
                <WarningModal
                    openWarning={openWarning}
                    setOpenWarning={setOpenWarning}
                />
            </div>
        </>
    );
}
