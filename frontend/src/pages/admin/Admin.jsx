import "./admin.css";
import { Link, Outlet } from "react-router-dom";
import { Globe, LandPlot, Album, FileQuestion } from "lucide-react";
import hehe from "../../assets/test.png";
export default function Admin() {
    return (
        <div className="grid">
            <div className="sidebar">
                <Link
                    to="/admin/test"
                    className="inline-flex justify-evenly items-center gap-2"
                >
                    <Globe className="flex-1" />
                    <span className="icon-name">Language</span>
                </Link>
                <Link
                    to="/admin/courses"
                    className="flex justify-evenly items-center gap-2"
                >
                    <LandPlot className="flex-1" />
                    <span className="icon-name">Courses</span>
                </Link>
                <Link
                    to="/admin/chapters"
                    className="flex justify-evenly items-center"
                >
                    <Album className="flex-1" />
                    <span className="icon-name">Chapters</span>
                </Link>
                <Link
                    to="/admin/quiz"
                    className="flex justify-evenly items-center gap-2"
                >
                    <FileQuestion className="flex-1" />
                    <span className="icon-name">Quizes</span>
                </Link>
            </div>
            <div className="main-content text-white relative overflow-clip">
                <Outlet />
                <img src={hehe} alt="" className="test-img" />
            </div>
        </div>
    );
}
