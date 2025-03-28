import React, { useEffect, useState } from "react";
import fire from "../../assets/duolingofire.svg";
import heart from "../../assets/red-heart.svg";
import ReactCountryFlag from "react-country-flag";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseByLang } from "../../features/course/courseMaterial";
import "./styles.css";
import { Outlet } from "react-router-dom";
export default function Main() {
    const { courses } = useSelector((state) => state.course);
    const dispatch = useDispatch();

    useEffect(() => {
        // todo: FIX THIS BEFORE GOING TO THE QUIZ STAGE
        // todo: make the language section as soon as possible so that you can then add the real id here
        dispatch(fetchCourseByLang("67b9953e651af2dbf46cdab9"));
    }, []);
    return (
        <div className="main-container">
            {/* header */}
            <div className="main-container-sidebar">
                <div className="test-lang ">
                    <ReactCountryFlag
                        className="emojiFlag "
                        style={{
                            fontSize: "2em",
                        }}
                        countryCode="IN"
                    />
                    <p className="hidden">Language</p>
                </div>
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
            <div className="flex-auto main-container-middle">
                {/* heading */}
                <Outlet />
                {/* <TestComponents /> */}
            </div>
            {/* footer that would become a side bar on the bigger screens */}
            <div>Footer section</div>
        </div>
    );
}
