import "./admin.css";
import { Route, Routes, Link, BrowserRouter, Outlet } from "react-router-dom";
import Test from "./Test";
export default function Admin() {
    return (
        <div className="grid">
            <div className="sidebar">
                <Link to="/admin/test">Language</Link>
                <Link to="/admin/courses">Courses</Link>
                <Link to="/admin/chapters">Chapters</Link>
                <Link to="/admin/quiz">Quizes</Link>
            </div>
            <div className="main-content bg-emerald-950 text-white">
                <Outlet />
            </div>
        </div>
    );
}
