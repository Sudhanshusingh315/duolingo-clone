import { useEffect, useState } from "react";
import "./styles.css";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { constantsConfig } from "../../../constants";
import ReactCountryFlag from "react-country-flag";
export default function QuizSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentComponent, setCurrentComponent] = useState([
        <Test1 />,
        <Test2 />,
        <Test3 />,
        <Test4 />,
    ]);
    const steps = [];
    for (let i = 0; i < 4; i++) {
        steps.push(
            <div
                onClick={() => setCurrentIndex(i)}
                key={i}
                className="bg-red-400 w-10 aspect-square rounded-full flex justify-center items-center"
            >
                {i + 1}
            </div>
        );
    }
    const handleNext = () => {
        if (currentIndex >= steps?.length - 1) return;
        setCurrentIndex((prev) => prev + 1);
    };
    const handlePrev = () => {
        if (currentIndex === 0) return;
        setCurrentIndex((prev) => prev - 1);
    };
    console.log("currentIndex", currentIndex);
    console.log("steps", steps);
    return (
        <div className="w-[90%] bg-white min-h-80 mx-auto py-4 flex flex-col gap-1">
            {/* this will be the actual stepper component */}
            <div className="relative border w-[80%] mx-auto isolate h-full">
                <div className="flex justify-between items-center mx-auto border ">
                    {steps?.map((element, index) => {
                        return element;
                    })}
                    {/* top progress bar */}
                    {/* four setps  */}
                </div>
                <div className="progress-bar"></div>
            </div>
            <div className="border max-w-[95%] mx-auto mt-2 flex-1">
                {/* place where component will render */}
                {currentComponent[currentIndex]}
            </div>{" "}
            <div className="flex gap-1">
                <button
                    className="text-black button"
                    variant="primary"
                    onClick={handlePrev}
                >
                    Back
                </button>
                <button
                    className="text-black button"
                    variant="primary"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

const Test1 = () => {
    const [availableLanguages, setAvailableLanguages] = useState([]);
    const [language, setLanguage] = useState("");
    useEffect(() => {
        (async () => {
            const {
                data: { data },
            } = await axios({
                url: `${constantsConfig.BASE_URL}/api/language/languages`,
            });
            setAvailableLanguages(data);
            console.log("data", data);
        })();
    }, []);
    const handleChange = (e, value) => {
        console.log("value", value);
        setLanguage(value);
    };
    return (
        <div className="font-bold text-yellow-700">
            <div className="mb-4 text-2xl">
                Select the Language you from below
            </div>
            <Autocomplete
                options={availableLanguages}
                getOptionLabel={(option) => option?.name || ""}
                renderInput={(params) => {
                    return <TextField {...params} label="Languages" />;
                }}
                value={language}
                onChange={handleChange}
            />
            {language && (
                <p className="justify-self-center">
                    <ReactCountryFlag
                        className="emojiFlag "
                        style={{
                            fontSize: "6em",
                        }}
                        countryCode={language?.code}
                    />
                </p>
            )}
        </div>
    );
};

const Test2 = () => {
    return <div className="font-bold text-yellow-700 ">Component 2</div>;
};
const Test3 = () => {
    return <div className="font-bold text-yellow-700 ">Component 3</div>;
};
const Test4 = () => {
    return <div className="font-bold text-yellow-700 ">Component 4</div>;
};
const test5 = () => {
    return <div className="font-bold text-yellow-700 ">Component 5</div>;
};
