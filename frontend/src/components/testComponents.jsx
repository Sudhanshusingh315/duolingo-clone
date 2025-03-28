import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseByLang } from "../features/course/courseMaterial";
import Course from "./Course";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { constantsConfig } from "../constants";

export default function TestComponents() {
    const dispatch = useDispatch();
    const { courses } = useSelector((state) => state.course);
    const [languageId, setLanguageId] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const languageCode = searchParams?.get("languageCode");

    useEffect(() => {
        if (!languageCode) return;
        (async () => {
            console.log("woking");
            const {
                data: { data },
            } = await axios({
                url: `${constantsConfig.BASE_URL}/api/language//get-language/${languageCode}`,
            });
            const { id } = data;
            setLanguageId(id);
        })();
    }, [languageCode]);

    useEffect(() => {
        // todo: FIX THIS BEFORE GOING TO THE QUIZ STAGE
        // todo: make the language section as soon as possible so that you can then add the real id here
        if (!languageId) return;
        dispatch(fetchCourseByLang(languageId));
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
