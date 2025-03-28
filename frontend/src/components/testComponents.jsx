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
    const [languageId, setLanguageId] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const languageCode = searchParams?.get("languageCode");
    console.log("languageCode", languageCode);
    useEffect(() => {
        if (!languageCode) return;
        (async () => {
            console.log("woking");
            try {
                const {
                    data: { data },
                } = await axios({
                    url: `${constantsConfig.BASE_URL}/api/language//get-language/${languageCode}`,
                });
                console.log("data", data);
                const { id } = data[0];
                console.log("langId", id);
                setLanguageId(id);
            } catch (err) {
                console.log("error ", err);
            }
        })();
    }, [languageCode]);

    useEffect(() => {
        // todo: FIX THIS BEFORE GOING TO THE QUIZ STAGE
        // todo: make the language section as soon as possible so that you can then add the real id here
        if (!languageId) return;
        console.log("making the api all");
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
