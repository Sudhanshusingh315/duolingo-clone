import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Lesson from "./pages/main/Lesson";
import Admin from "./pages/admin/Admin";
import Test from "./pages/admin/Test";
import Language from "./pages/admin/sections/Language";
import Course from "./components/Course";
import CourseSection from "./pages/admin/sections/CourseSection";
import ChapterSection from "./pages/admin/sections/ChaptersSection";
import QuizSection from "./pages/admin/sections/QuizSection";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={} /> */}
                <Route path="/admin" element={<Admin />}>
                    <Route path="test" element={<Language />} />
                    <Route path="courses" element={<CourseSection />} />
                    <Route path="chapters" element={<ChapterSection />} />
                    <Route path="quiz" element={<QuizSection />} />
                </Route>
                <Route path="/lesson" element={<Main />} />

                <Route path="/lessonQuiz/:lessonId" element={<Lesson />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
