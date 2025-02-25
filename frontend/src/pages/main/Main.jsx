import React, { useEffect, useState } from "react";
import fire from "../../assets/duolingofire.svg";
import heart from "../../assets/red-heart.svg";
import ReactCountryFlag from "react-country-flag";
import Course from "../../components/Course";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseByLang } from "../../features/courseMaterial";

export default function Main() {
    const [testArray, newTestArray] = useState(Array(5).fill(""));
    const { courses } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    useEffect(() => {
        // todo: FIX THIS BEFORE GOING TO THE QUIZ STAGE
        // todo: make the language section as soon as possible so that you can then add the real id here
        dispatch(fetchCourseByLang("67b9953e651af2dbf46cdab9"));
    }, []);
    return (
        <div className="flex flex-col min-h-screen bg-teal-950 px-4 py-2 ">
            {/* header */}
            <div className="flex justify-between items-center py-4 ">
                <ReactCountryFlag
                    className="emojiFlag "
                    style={{
                        fontSize: "2em",
                    }}
                    countryCode="IN"
                />
                {/* todo: hover effects */}
                <div className="inline-flex justify-center items-center text-xl gap-2">
                    <img src={fire} alt="" />
                    <span className="text-amber-600 font-bold">1</span>
                </div>{" "}
                <div className="inline-flex justify-center items-center text-xl gap-2 hover">
                    <img src={heart} alt="" />
                    <span className="text-rose-600 font-bold">5</span>
                </div>
            </div>

            {/* current header */}
            {/* todo: current header try another way */}
            {/* unit banner */}
            {/* <div className="fixed top-20 w-[320px] h-20 bg-amber-100 ">

                </div> */}

            {/* main content of the lessons */}
            {/* todo: overflow scrollable div */}
            <div className="flex-auto">
                {/* heading */}

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
            </div>
            {/* footer that would become a side bar on the bigger screens */}
            <div>Footer section</div>
        </div>
    );
}
