import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Lesson from "./pages/main/Lesson";
import { ObjectiveType } from "./components/Quizes/ObjectiveType";
import DragDropSortGame from "./components/Quizes/DragAndDrop";
import Admin from "./pages/admin/Admin";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={} /> */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/lesson" element={<Main />} />

                <Route path="/lessonQuiz/:lessonId" element={<Lesson />} />

                {/* todo later render these through only multistepper from */}
                <Route path="/objective" element={<ObjectiveType />} />
                <Route path="/drag" element={<DragDropSortGame />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
