import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={} /> */}
                <Route path="/lesson" element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
