import "./style.css";
import giphy from "../../assets/giphy.gif";
import { Link } from "react-router-dom";
export default function MarketingPage() {
    return (
        <div className="bg-white h-screen max-w-[1124px] mx-auto">
            {/* header */}
            <div className="header-section">
                <p>lingo</p>
            </div>
            {/* main page */}
            <div className="main-page">
                <img src={giphy} />
                <p>The free, fun, and effective way to learn a language!</p>
                <div className="lingo-action-button">
                    <Link to="/auth">
                        <button className="button" variant="secondary">
                            Get started
                        </button>
                    </Link>
                    <Link to="/auth?isLogin=true">
                        <button className="button" variant="primary">
                            I already have an account
                        </button>
                    </Link>
                </div>
            </div>

            {/* learning section */}
            <div></div>
        </div>
    );
}
