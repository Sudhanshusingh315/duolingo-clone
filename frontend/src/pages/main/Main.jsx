import React, { useContext, useEffect, useState } from "react";
import fire from "../../assets/duolingofire.svg";
import heart from "../../assets/red-heart.svg";
import ReactCountryFlag from "react-country-flag";
import "./styles.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { SideBarContext } from "../../context/sideBarContext";
import house from "../../assets/house.svg";
import leaderBoard from "../../assets/leaderBoard.png";
import store from "../../assets/store.svg";
import treasure from "../../assets/treasure.svg";
import profile from "../../assets/profile.png";

export default function Main() {
    const navigate = useNavigate();
    const { selectedLang } = useContext(SideBarContext);
    const { heart: heartValue } = useContext(SideBarContext);
    const handleNavigation = () => {
        navigate("/lesson/lang-course");
    };
    return (
        <div className="main-container">
            {/* header */}
            <div className="main-container-sidebar">
                <div
                    className="test-lang cursor-pointer"
                    onClick={handleNavigation}
                >
                    <ReactCountryFlag
                        className="emojiFlag "
                        style={{
                            fontSize: "2em",
                        }}
                        countryCode={selectedLang || "IN"}
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
                    <span className="text-rose-600 font-bold">
                        {heartValue}
                    </span>
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
            <div className="footer-section">
                <Link to={"/lesson/practice-hub"}>
                    <img src={house} alt="" />
                </Link>
                <div>
                    <img src={leaderBoard} alt="" />
                </div>
                <div>
                    <img src={store} alt="" />
                </div>
                <div>
                    <img src={treasure} alt="" />
                </div>
                <div>
                    <img src={profile} alt="" />
                </div>
            </div>
        </div>
    );
}
