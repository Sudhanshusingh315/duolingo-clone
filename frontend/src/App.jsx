import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Lesson from "./pages/main/Lesson";
import Admin from "./pages/admin/Admin";
import Test from "./pages/admin/Test";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={} /> */}
                <Route path="/admin" element={<Admin />}>
                    <Route path="test" element={<div>lang</div>} />
                    <Route path="courses" element={<div>courses</div>} />
                    <Route
                        path="/admin/chapters"
                        element={<div>chapters</div>}
                    />
                </Route>
                <Route path="/lesson" element={<Main />} />

                <Route path="/lessonQuiz/:lessonId" element={<Lesson />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
