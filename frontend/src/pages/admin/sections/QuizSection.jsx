import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { constantsConfig, lessonType } from "../../../constants";
import ReactCountryFlag from "react-country-flag";
import { QuizDataContext } from "../../../context/quizDataContext";
import ObjectiveTypeQuestion from "../questionTypes/ObjectiveTypeQuestionTemplae";
export default function QuizSection() {
    const [test, setTest] = useState({});
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

const Test1 = () => {
    const { data, setData } = useContext(QuizDataContext);
    const [availableLanguages, setAvailableLanguages] = useState([]);
    console.log("context data", data);
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
        setData((prev) => {
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

const Test2 = () => {
    const { data, setData } = useContext(QuizDataContext);
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
        setData((prev) => {
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
const Test3 = () => {
    const { data, setData } = useContext(QuizDataContext);
    const lessonTypeValue = Object.values(lessonType);
    const [value, setValue] = useState();
    const handleChange = (e, value) => {
        setData((prev) => {
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

const Test4 = () => {
    const { data, setData } = useContext(QuizDataContext);
    const { lessonType: quizType } = data;
    const questionToRender = (type) => {
        console.log("type is ", type);
        switch (type) {
            case lessonType.OBJECTIVE:
                return <ObjectiveTypeQuestion />;
                break;

            default:
                break;
        }
    };
    return (
        <div className="font-bold text-yellow-700 ">
            <div>something to show here</div>
            {questionToRender(quizType)}
        </div>
    );
};
