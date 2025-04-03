import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseByLang } from "../features/course/courseMaterial";
import Course from "./Course";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { constantsConfig } from "../constants";
import { SideBarContext } from "../context/sideBarContext";

export default function TestComponents() {
    const dispatch = useDispatch();
    const {
        setUserProgression,
        setHeart,
        setUserCourses,
        setSelectedLangCode,
    } = useContext(SideBarContext);
    const { courses } = useSelector((state) => state.course);
    const { accessToken } = useSelector((state) => state.auth);
    const [languageId, setLanguageId] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const languageCode = searchParams?.get("languageCode");

    courses && setUserCourses(courses);
    useEffect(() => {
        if (!languageCode) return;
        (async () => {
            console.log("woking");
            try {
                const {
                    data: { data },
                } = await axios({
                    url: `${constantsConfig.BASE_URL}/api/language/get-language/${languageCode}`,
                });
                console.log("data", data);
                const { id } = data[0];
                console.log("langId", id);

                setLanguageId(id);
                setSelectedLangCode(id);
            } catch (err) {
                console.log("error ", err);
            }
        })();
    }, [languageCode]);

    useEffect(() => {
        if (!languageId) return;
        console.log("making the api all");
        dispatch(fetchCourseByLang(languageId));

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
    }, [languageId]);

    return (
        <>
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
                            />
                        </React.Fragment>
                    );
                }
            )}
        </>
    );
}
