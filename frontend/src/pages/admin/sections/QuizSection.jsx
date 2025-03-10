import { useEffect, useState } from "react";
import "./styles.css";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { constantsConfig, lessonType } from "../../../constants";
import ReactCountryFlag from "react-country-flag";
export default function QuizSection() {
    const [test, setTest] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentComponent, setCurrentComponent] = useState([
        <Test1 test={test} setTest={setTest} />,
        <Test2 test={test} setTest={setTest} />,
        <Test3 test={test} setTest={setTest} />,
        <Test4 test={test} setTest={setTest} />,
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
    console.log("test data", test);
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

const Test1 = ({ test, setTest }) => {
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
        setTest((prev) => {
            return { ...prev, language: value };
        });
    };
    return (
        <div className="font-bold text-yellow-700">
            <h1 className="mb-4 text-2xl">Select the Language from below</h1>
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

const Test2 = ({ setTest }) => {
    const [selectChapter, setSelectChaper] = useState();
    const [chapter, setChapter] = useState();
    useEffect(() => {
        (async () => {
            const {
                data: { data },
            } = await axios({
                url: `${constantsConfig.BASE_URL}/api/chapter/get-chapters`,
            });
            setSelectChaper(data);
        })();
    }, []);
    console.log("all the chaptes", selectChapter);
    const handleChange = (e, value) => {
        setTest((prev) => {
            return { ...prev, chapter: value };
        });
    };
    return (
        <div className="font-bold text-yellow-700 ">
            {/* add the languages course */}
            <h1 className="mb-4 text-2xl">Select the Chapter from below</h1>
            <Autocomplete
                options={selectChapter}
                getOptionLabel={(option) => {
                    return option?.title || "";
                }}
                renderInput={(params) => {
                    return <TextField {...params} label="Chapter" />;
                }}
                value={chapter}
                onChange={handleChange}
            />
        </div>
    );
};
const Test3 = ({ setTest }) => {
    const lessonTypeValue = Object.keys(lessonType);
    const [value, setValue] = useState();
    const handleChange = (e, value) => {
        setTest((prev) => {
            return { ...prev, lessonType: value };
        });
    };
    return (
        <div className="font-bold text-yellow-700 ">
            <h1 className="mb-4 text-2xl">Select the Chapter from below</h1>
            <Autocomplete
                options={lessonTypeValue}
                getOptionLabel={(option) => {
                    return option;
                }}
                renderInput={(params) => {
                    return <TextField {...params} label="Quiz type" />;
                }}
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};
const Test4 = ({ test, setTest }) => {
    const { lessonType } = test;
    return <div className="font-bold text-yellow-700 ">
        
    </div>;
};
