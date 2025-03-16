import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { constantsConfig, lessonType } from "../../../constants";
import ReactCountryFlag from "react-country-flag";
import { QuizDataContext } from "../../../context/quizDataContext";
import ObjectiveTypeQuestion from "../questionTypes/ObjectiveTypeQuestionTemplae";
import DragAndDropTypeQuesiton from "../questionTypes/DragAndDropTypeQuestionTemplate";
import MatchQuestion from "../questionTypes/MatchQuestionTemplate";
import MemoryMatchQuestion from "../questionTypes/MemoryMatchTypeQuestionTemplate";
export default function QuizSection() {
    const [test, setTest] = useState({});
    const { data, setData } = useContext(QuizDataContext);
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
                className={`${
                    currentIndex < i ? "bg-gray-500" : "bg-green-500"
                } w-10 aspect-square rounded-full flex justify-center items-center transition-all 300ms ease-in cursor-pointer`}
            >
                {i + 1}
            </div>
        );
    }
    const progressBarWidth =
        (100 / (currentComponent?.length - 1)) * currentIndex;
    const handleNext = () => {
        if (currentIndex >= steps?.length - 1) return;
        setCurrentIndex((prev) => prev + 1);
    };
    const handlePrev = () => {
        if (currentIndex === 0) return;
        setCurrentIndex((prev) => prev - 1);
    };

    const handleApiCall = async () => {
        console.log("calling th api");
        const { lessonType: type } = data;
        switch (type) {
            case lessonType.OBJECTIVE:
                console.log(
                    `type is ${type} and ${JSON.stringify(data, null, "\t")}`
                );
                await axios({
                    method: "post",
                    url: `${constantsConfig.BASE_URL}/api/quizzes/add-objectiveQuiz`,
                    data,
                });
                break;
            case lessonType.DRAGANDDROP:
                console.log(
                    `type is ${type} and ${JSON.stringify(data, null, "\t")}`
                );
                await axios({
                    url: `${constantsConfig.BASE_URL}/api/quizzes/add-dragAndDrop`,
                    data,
                });
                break;
            case lessonType.MATCH:
                console.log(
                    `type is ${type} and ${JSON.stringify(data, null, "\t")}`
                );
                // await axios({
                //     url: `${constantsConfig.BASE_URL}/api/quizzes/add-matchQuiz`,
                //     data,
                // });
                break;
            case lessonType.MEMORYGAME:
                break;
            default:
                break;
        }

        setData({});
    };

    console.log("currentIndex", currentIndex);
    console.log("steps", steps);
    return (
        <div className="isolate mt-8">
            <div
                // className="w-[90%] b min-h-80 mx-auto my-4 p-4 flex flex-col gap-1"
                className="card mx-auto p-4"
            >
                {/* this will be the actual stepper component */}
                <div className="relative w-[80%] mx-auto mb-4 isolate ">
                    <div className="flex justify-between items-center mx-auto text-black font-bold">
                        {steps?.map((element, index) => {
                            return element;
                        })}
                    </div>
                    <div
                        className={`progress-bar`}
                        style={{
                            width: `${progressBarWidth}%`,
                        }}
                    ></div>
                </div>
                <div className="max-w-[95%] mx-auto mt-2 flex-1">
                    {/* place where component will render */}
                    {currentComponent[currentIndex]}
                </div>{" "}
                <div className="flex gap-1">
                    {currentIndex >= 1 && (
                        <button
                            className="text-black button"
                            variant="primary"
                            onClick={handlePrev}
                        >
                            Back
                        </button>
                    )}
                    <button
                        className="text-black button"
                        variant="primary"
                        onClick={
                            currentIndex === currentComponent?.length - 1
                                ? handleApiCall
                                : handleNext
                        }
                    >
                        {currentIndex === currentComponent?.length - 1
                            ? "Submit the Quiz"
                            : "Next"}
                    </button>
                </div>
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
        <div className="font-bold text-green-700 text-center p-4">
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
        <div className="font-bold text-green-700 text-center p-4">
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
        <div className="font-bold  text-green-700 text-center p-4">
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
            case lessonType.DRAGANDDROP:
                return <DragAndDropTypeQuesiton />;
            case lessonType.MATCH:
                return <MatchQuestion />;
            case lessonType.MEMORYGAME:
                return <MemoryMatchQuestion />;
            default:
                return <h1>Please go back and select the options</h1>;
        }
    };
    return (
        <div className="font-bold text-green-700 text-center p-4">
            {questionToRender(quizType)}
        </div>
    );
};
