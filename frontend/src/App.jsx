import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Lesson from "./pages/main/Lesson";
import { ObjectiveType } from "./components/Quizes/ObjectiveType";
import MemoryMatch from "./components/Quizes/MemoryMatch";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={} /> */}
                <Route path="/lesson" element={<Main />} />

                <Route path="/lessonQuiz/:lessonId" element={<Lesson />} />

                {/* todo later render these through only multistepper from */}
                <Route path="/objective" element={<ObjectiveType />} />
                <Route path="/memory" element={<MemoryMatch />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
