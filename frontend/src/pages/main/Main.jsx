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
        <div className="flex flex-col border min-h-screen bg-teal-950 px-4 py-2 ">
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
            <div className="border flex-auto">
                {/* heading */}

                {/* <div className="flex items-center ">
                    <p className="flex-1 horizontal-border "></p>
                    <p className="font-semibold text-gray-400">Lesson one: 1</p>
                    <p className="flex-1 horizontal-border "></p>
                </div> */}
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
                {/* lessons */}

                {/* <div className="border flex flex-col items-center">
                    {testArray.map((_, index) => {
                        // always 8
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

                        const leftPosition = indentationLevel * 35;

                        return (
                            <p
                                key={index}
                                className="w-16 aspect-square rounded-full bg-green-500 relative border-b-4 border-b-green-700 hover:bg-green-600 active:bg-green-600 active:border-b-0"
                                style={{
                                    right: `${leftPosition}px`,
                                }}
                            ></p>
                        );
                    })}
                </div> */}
            </div>
            {/* footer that would become a side bar on the bigger screens */}
            <div>Footer section</div>
        </div>
    );
}
