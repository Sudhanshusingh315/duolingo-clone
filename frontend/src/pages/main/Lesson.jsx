import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { constantsConfig, lessonType } from "../../constants";
import useMultiStep from "../../../hooks/useMultiStep";
import { ObjectiveType } from "../../components/Quizes/ObjectiveType";
import MatchGrid from "../../components/Quizes/MatchGrid";
import MemoryMatch from "../../components/Quizes/MemoryMatch";
import DragDropSortGame from "../../components/Quizes/DragAndDrop";
export default function Lesson() {
    let { lessonId } = useParams();
    const [quizData, setQuizData] = useState([]);
    const [quizDataForStepForm, setQuizDataForStepForm] = useState([]);
    const { step, steps, next } = useMultiStep(quizDataForStepForm);

    // state determining the answers;
    const [selectedObjectiveOption, setSelectedObjectiveOptions] = useState();
    const [selectedAnswerData, setSelectedAnswerData] = useState();
    const [answer, setAnswer] = useState(null);
    const [nextQuestion, setnextQuestion] = useState(false);
    const [value, setValue] = useState("hey");
    useEffect(() => {
        (async () => {
            const { data } = await axios({
                url: `${constantsConfig.BASE_URL}/api/chapter/get-chapter/${lessonId}`,
            });
            const { data: newData } = data;
            const { quiz } = newData[0];
            setQuizData((prev) => {
                return [...quiz];
            });
        })();
        // make the api call with the lesson Id, get the Quizes with useSelector
        // and start the quiz, with useMultiStep custom hook
    }, []);
    // useEffect(() => {
    //     console.log("code won't run for updatetest");
    //     if (!quizData.length) {
    //         return;
    //     }
    //     quizData?.map((data) => {
    //         switch (data?.quizType) {
    //             case lessonType.OBJECTIVE:
    //                 setQuizDataForStepForm((prev) => {
    //                     return [
    //                         ...prev,
    //                         <ObjectiveType
    //                             setSelectedAnswerData={setSelectedAnswerData}
    //                             selectedObjectiveOption={
    //                                 selectedObjectiveOption
    //                             }
    //                             setSelectedObjectiveOptions={
    //                                 setSelectedObjectiveOptions
    //                             }
    //                             data={data}
    //                             key={data?.id}
    //                             value={value}
    //                             setValue={setValue}
    //                             updatetest={updatetest}
    //                         />,
    //                     ];
    //                 });
    //                 break;
    //             case lessonType.MATCH:
    //                 setQuizDataForStepForm((prev) => {
    //                     return [...prev, <MatchGrid data={data} />];
    //                 });
    //                 break;
    //             default:
    //                 break;
    //         }
    //     });
    //     return;
    // }, [quizData]);
    useEffect(() => {
        if (!quizData.length) {
            return;
        }
        setQuizDataForStepForm(
            quizData.map((data) => {
                switch (data?.quizType) {
                    case lessonType.OBJECTIVE:
                        return (
                            <ObjectiveType
                                setSelectedAnswerData={setSelectedAnswerData}
                                selectedObjectiveOption={
                                    selectedObjectiveOption
                                }
                                setSelectedObjectiveOptions={
                                    setSelectedObjectiveOptions
                                }
                                data={data}
                                key={data.id}
                                value={value}
                                setValue={setValue}
                                updatetest={updatetest}
                            />
                        );
                    case lessonType.MATCH:
                        return <MatchGrid data={data} key={data.id} />;

                    case lessonType.MEMORYGAME:
                        return <MemoryMatch data={data} />;
                    case lessonType.DRAGANDDROP:
                        return <DragDropSortGame data={data} />;
                    default:
                        return null;
                }
            })
        );
    }, [quizData, selectedObjectiveOption, value]);
    console.log("quiz data",quizData);
    const checkForRightAnswer = () => {
        if (!selectedAnswerData) return;
        const { quizType, quizId, selectedOption, index } = selectedAnswerData;
        switch (quizType) {
            case lessonType.OBJECTIVE:
                const quizThatBelongsToId = quizData?.filter(({ id }) => {
                    return id === quizId;
                });
                if (quizThatBelongsToId[0].options[index].isCorrect) {
                    setAnswer(true);
                } else {
                    setAnswer(false);
                }
                break;

            default:
                break;
        }
        setnextQuestion(true);
    };
    const moveToNextQuestion = () => {
        next();

        // resetting the state for next Question
        setnextQuestion(false);
        setSelectedAnswerData({});
        setSelectedObjectiveOptions(null);
        setAnswer(null);
    };
    const updatetest = (value) => {
        setValue((prev) => {
            return value;
        });
        // setSelectedObjectiveOptions(value);
    };

    console.log("selected general option", selectedObjectiveOption);
    console.log("value", value);
    /*
        this page will render out all the 
        1) Quiz app normal DUH!!!
        2) Match the grid 
        3) Fill in the blank 
    */

    return (
        <div className="border w-full min-h-screen flex justify-center items-center bg-emerald-950">
            {step}
            <div
                className={`flex flex-col justify-center items-center w-full text-white fixed bottom-0 bg-emerald-900 py-6 px-4`}
            >
                <p>Excellent (make this pretty hehe)</p>
                <button
                    className="button w-full"
                    variant={
                        answer === null
                            ? "secondary-outline"
                            : answer
                            ? "secondary"
                            : "danger"
                    }
                    onClick={
                        nextQuestion ? moveToNextQuestion : checkForRightAnswer
                    }
                >
                    {nextQuestion ? "next" : "continue"}
                </button>
            </div>
        </div>
    );
}
