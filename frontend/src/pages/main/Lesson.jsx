import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { constantsConfig } from "../../constants";

export default function Lesson() {
    let { lessonId } = useParams();
    console.log("lessonId", lessonId);
    useEffect(() => {
        (async () => {
            const { data } = await axios({
                url: `${constantsConfig.BASE_URL}/api/chapter/get-chapter/${lessonId}`,
            });
            console.log("data", data);
        })();
        // make the api call with the lesson Id, get the Quizes with useSelector
        // and start the quiz, with useMultiStep custom hook
    }, []);
    /*
        this page will render out all the 
        1) Quiz app normal DUH!!!
        2) Match the grid 
        3) Fill in the blank 
    */

    return <div></div>;
}
