import axios from "axios";
import { constantsConfig } from "../../constants";
export const getCourses = async (langId) => {
    try {
        const result = await axios({
            method: "get",
            url: `${constantsConfig.BASE_URL}/api/courses/get-course/${langId}`,
        });
        console.log("result", result);
        return result;
    } catch (err) {
        console.log(err);
    }
};
