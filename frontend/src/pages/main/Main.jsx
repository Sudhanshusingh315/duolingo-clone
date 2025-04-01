import React, { useContext, useEffect, useState } from "react";
import fire from "../../assets/duolingofire.svg";
import heart from "../../assets/red-heart.svg";
import ReactCountryFlag from "react-country-flag";
import "./styles.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { SideBarContext } from "../../context/sideBarContext";
import house from "../../assets/house.svg";
import leaderBoard from "../../assets/leaderBoard.png";
import treasure from "../../assets/treasure.svg";
import profile from "../../assets/profile.png";
import grilPleading from "../../assets/grilPleading.png";

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
                <Link to={"/lesson/practice-hub"} className="practice-hub">
                    <img src={house} alt="" className="practice-hub-mobile" />
                    <div className="practice-hub-large">
                        <div className="large-super-section">
                            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg" />
                            <p className="large-super-section-title">
                                Try super{" "}
                            </p>
                            <p className="large-super-section-subheading">
                                No ads, personalized practice, and unlimited
                                Legendary!
                            </p>
                        </div>
                        <div className="large-birdy">
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/super/fb7130289a205fadd2e196b9cc866555.svg"
                                alt=""
                            />
                        </div>
                        <div className="buy-button">Get unlimited heart</div>
                    </div>
                </Link>
                <Link to={"/lesson/leader-board"}>
                    <img
                        src={leaderBoard}
                        alt=""
                        className="leader-board-mobile"
                    />
                    <div className="leader-borad-larg">
                        <h2 className="leader-board-title">
                            Unlock Leaderboards!
                        </h2>
                        <div className="leader-board-about">
                            <img
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/d4280fdf64d66de7390fe84802432a53.svg"
                                alt=""
                            />
                            <p>Complete 1 more lesson to start competing</p>
                        </div>
                    </div>
                </Link>
                <Link to={"/lesson/shop"}>
                    <img src={treasure} alt="" className="shop-mobile" />
                    <div className="shop-large">
                        <h2>Shop</h2>
                        <div className="shop-section">
                            {/* girl with pleading eyes */}
                            <img
                                src={grilPleading}
                                alt=""
                                className="shop-section-girl"
                            />
                            <p>lingo shop</p>
                            {/* super */}
                            <img
                                className="shop-section-bird"
                                src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg"
                                alt=""
                            />
                        </div>
                    </div>
                </Link>
                <div>
                    <img src={profile} alt="" />
                </div>
            </div>
        </div>
    );
}
