import "./styles.css";
export default function PracticeHub() {
    return (
        <div className="practice-hub">
            <div className="practice-hub-title">Today's Review</div>
            <div className="practice-hub-pefect">
                <div className="practice-hub-section">
                    <img
                        src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg"
                        alt="super"
                    />
                    <h2>Perfect Pronunciation</h2>
                    <div>
                        Finish this session to build confidence with speaking!
                    </div>
                </div>
                <div className="test-side">
                    <img
                        className="lady"
                        src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/87fabec06acc53cc0ba4efd5b1720751.svg"
                        alt=""
                    />
                </div>
            </div>
            <h2 className="conversation">Conversaion</h2>

            {/* super-speak conversation board */}

            <div className="super-speak">
                <div className="super-speak-contect">
                    <div className="speak-container">
                        <p>Speak</p>
                        <img
                            src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg"
                            alt=""
                        />
                    </div>
                    <p>Improve your speaking with these phrases</p>
                </div>
                <div className="mic-container">
                    <img
                        src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/3e81c469cbffa24102aa839524868adf.svg"
                        alt=""
                    />
                </div>
            </div>

            <div className="super-speak">
                <div className="super-speak-contect">
                    <div className="speak-container">
                        <p>Listen</p>
                        <img
                            src="https://d35aaqx5ub95lt.cloudfront.net/images/super/2e50c3e8358914df5285dc8cf45d0b4c.svg"
                            alt=""
                        />
                    </div>
                    <p>
                        Boost your listening skills with an audio-only session
                    </p>
                </div>
                <div className="mic-container">
                    <img
                        src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/2ebe830fd55a7f2754d371bcd79faf32.svg"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
}
