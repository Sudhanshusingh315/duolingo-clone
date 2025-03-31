import "./styles.css";
export default function WarningModal({ show, setShow }) {
    return (
        show && (
            <div className="warning-modal-wrapping">
                <div className="warning-modal">
                    <img
                        src="https://d35aaqx5ub95lt.cloudfront.net/images/ed9f592a37a6ce248be0beec9c13a0e1.svg"
                        alt=""
                    />
                    <p>
                        A leaderboard is a great idea for future enhancements,
                        but for now, we're keeping our focus on core features.
                    </p>
                    <div className="flex justify-center items-center">
                        <button
                            className="button-back"
                            onClick={() => {
                                setShow(false);
                            }}
                        >
                            go back
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
