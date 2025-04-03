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
import { QuizDataContextProvider } from "./context/quizDataContext";
import { LessonContextProvider } from "./context/lessonContext";
import Auth from "./pages/auth/Auth";
import MarketingPage from "./pages/makerting/MarketingPage";
import TestComponents from "./components/testComponents";
import LanguageList from "./components/LanguageList";
import { SideBarDataContextProvider } from "./context/sideBarContext";
import PracticeHub from "./pages/main/PracticeHub";
import LeaderBoard from "./pages/main/LeaderBoard";
import ShopSection from "./pages/main/Shop";
import { OrderContextProvider } from "./context/orderContext";

function App() {
    return (
        // todo: make some of these routes protected
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MarketingPage />} />
                <Route
                    path="/admin"
                    element={
                        <QuizDataContextProvider>
                            <Admin />
                        </QuizDataContextProvider>
                    }
                >
                    <Route path="test" element={<Language />} />
                    <Route path="courses" element={<CourseSection />} />
                    <Route path="chapters" element={<ChapterSection />} />
                    <Route path="quiz" element={<QuizSection />} />
                </Route>
                <Route
                    path="/lesson"
                    element={
                        <SideBarDataContextProvider>
                            <Main />
                        </SideBarDataContextProvider>
                    }
                >
                    <Route
                        path="course-component"
                        element={<TestComponents />}
                    />
                    <Route path="lang-course" element={<LanguageList />} />
                    <Route path="practice-hub" element={<PracticeHub />} />
                    <Route path="leader-board" element={<LeaderBoard />} />
                    <Route path="shop" element={<ShopSection />} />
                </Route>
                <Route
                    path="/lessonQuiz/:lessonId"
                    element={
                        <SideBarDataContextProvider>
                            <LessonContextProvider>
                                <Lesson />
                            </LessonContextProvider>
                        </SideBarDataContextProvider>
                    }
                />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
