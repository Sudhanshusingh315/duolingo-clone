import { useState } from "react";
import WarningModal from "../../modals/WarningModal";
import "./styles.css";
export default function LeaderBoard() {
    const [openWarning, setOpenWarning] = useState(false);
    return (
        <>
            <div className="leader-board-primary">
                <img src="https://d35aaqx5ub95lt.cloudfront.net/images/leagues/660a07cd535396f03982f24bd0c3844a.svg" />
                <p>Unlock LeaderBoard!</p>
                <p className="sub-text">
                    Complete 1 more lesson to start competing
                </p>
                <div className="flex justify-center items-center">
                    <button
                        className="button-leaderBoard"
                        onClick={() => {
                            setOpenWarning(true);
                        }}
                    >
                        START A LESSON
                    </button>
                </div>
            </div>
            <div className="mt-16">
                <img
                    src="https://blog.duolingo.com/content/images/2022/03/WHM-Characters--1-.png"
                    alt=""
                />
            </div>
            <WarningModal show={openWarning} setShow={setOpenWarning} />
        </>
    );
}
