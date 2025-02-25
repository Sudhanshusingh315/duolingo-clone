import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { constantsConfig, lessonType } from "../../constants";
import useMultiStep from "../../../hooks/useMultiStep";
import { ObjectiveType } from "../../components/Quizes/ObjectiveType";
import MatchGrid from "../../components/Quizes/MatchGrid";
export default function Lesson() {
    let { lessonId } = useParams();
    const [quizData, setQuizData] = useState([]);
    const [quizDataForStepForm, setQuizDataForStepForm] = useState([]);
    const { step, steps, next } = useMultiStep(quizDataForStepForm);
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
    console.log("quiz data for steo form", quizDataForStepForm);
    useEffect(() => {
        if (!quizData.length) {
            return;
        }
        quizData?.forEach((data) => {
            switch (data?.quizType) {
                case lessonType.OBJECTIVE:
                    setQuizDataForStepForm((prev) => {
                        return [...prev, <ObjectiveType data={data} />];
                    });
                    break;
                case lessonType.MATCH:
                    setQuizDataForStepForm((prev) => {
                        return [...prev, <MatchGrid data={data} />];
                    });
                    break;
                default:
                    break;
            }
        });
        return;
    }, [quizData]);

    console.log(quizData);
    /*
        this page will render out all the 
        1) Quiz app normal DUH!!!
        2) Match the grid 
        3) Fill in the blank 
    */

    return (
        <div className="border w-full min-h-screen flex justify-center items-center bg-emerald-950">
            <div className="border p-4 grid gap-2">{step}</div>
            <div className="flex flex-col justify-center items-center w-full text-white fixed bottom-0 bg-emerald-900 p-4">
                <p>Excellent (make this pretty hehe)</p>
                <button className="button w-full" variant="secondary" onClick={next}>
                    continue
                </button>
            </div>
        </div>
    );
}
