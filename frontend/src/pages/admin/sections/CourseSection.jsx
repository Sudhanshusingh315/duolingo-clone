import { useEffect, useState } from "react";
import {
    TextField,
    Button,
    MenuItem,
    Box,
    Autocomplete,
    Typography,
} from "@mui/material";
import { constantsConfig } from "../../../constants";
import "./styles.css";
import axios from "axios";
const FORMINITIAL = {
    languageId: "",
    name: "",
    description: "",
    difficultyLevel: "",
    chapterId: "",
};
export default function CourseSection() {
    // todo: make the api protected
    const [availableLanguages, setAvailableLanguages] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [availableChapters, setAvailableChapters] = useState(null);
    const [availableCourse, setAvailableCourse] = useState(null);

    useEffect(() => {
        (async () => {
            // get the languages, and  store here.
            const {
                data: { data },
            } = await axios({
                url: `${constantsConfig.BASE_URL}/api/language/languages`,
                method: "get",
            });

            const response = await axios({
                url: `${constantsConfig.BASE_URL}/api/chapter/get-chapters`,
            });

            const responseAvailableCourse = await axios({
                url: `${constantsConfig.BASE_URL}/api/courses/get-courses`,
            });
            setAvailableCourse(responseAvailableCourse?.data?.data);
            setAvailableChapters(response?.data?.data);
            setAvailableLanguages(data);
        })();
    }, []);
    console.log("available course", availableCourse);
    const [form, setForm] = useState(FORMINITIAL);

    const handleChange = (e, value) => {
        if (value?.name) {
            const { id } = value;
            console.log("if function block");
            setForm({ ...form, languageId: id });
            setSelectedCountry(value);
            return;
        }

        setForm({ ...form, [e.target.name]: e.target.value });
    };
    console.log("form", form);
    const handleChapterChange = (index, value) => {
        const newChapters = [...form.chapters];
        newChapters[index] = value;
        setForm({ ...form, chapters: newChapters });
    };

    const handleChangeCourse = (e, value) => {
        console.log("selected chapter", value);
        setForm((prev) => {
            return { ...prev, chapterId: value?.courseId };
        });
    };

    const handleCourseChange = (e, value) => {
        console.log("value", value);
        setForm((prev) => {
            return { ...prev, courseId: value?._id };
        });
    };

    const handleSubmitCourse = async () => {
        // make the api call for the course
        const {
            data: { data },
        } = await axios({
            url: `${constantsConfig.BASE_URL}/api/courses/add-course`,
            method: "post",
            data: form,
        });

        setForm(FORMINITIAL);
    };

    // todo: make the simmer for this too
    return (
        availableLanguages && (
            <div className="px-4 mt-8 isolate">
                <div
                    className="card mx-auto p-4"
                    // sx={{
                    //     display: "flex",
                    //     flexDirection: "column",
                    //     gap: 2,
                    //     maxWidth: "70%",
                    //     marginInline: "auto",
                    //     padding: "1rem 3rem",
                    //     marginTop: "1rem",
                    // }}
                >
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold", marginBottom: "20px" }}
                    >
                        Create a Course
                    </Typography>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold", marginBottom: "20px" }}
                    >
                        Want to add a Chapter to a Course?
                    </Typography>
                    <Autocomplete
                        options={availableCourse}
                        getOptionLabel={(option) => option?.name || ""}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    label="Available Courses"
                                />
                            );
                        }}
                        // value={selectedCountry}
                        onChange={handleCourseChange}
                        sx={{
                            marginBottom: "15px",
                        }}
                    />
                    <hr className="my-4" />
                    <Autocomplete
                        options={availableLanguages}
                        getOptionLabel={(option) => option?.name || ""}
                        renderInput={(params) => {
                            return <TextField {...params} label="Counteris" />;
                        }}
                        // value={selectedCountry}
                        onChange={handleChange}
                        sx={{
                            marginBottom: "15px",
                        }}
                    />
                    <TextField
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        sx={{
                            marginBottom: "15px",
                        }}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        sx={{
                            marginBottom: "15px",
                        }}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        multiline
                        rows={3}
                        fullWidth
                    />
                    <Autocomplete
                        options={availableChapters}
                        getOptionLabel={(option) => option?.title || ""}
                        style={{
                            marginBottom: "15px",
                        }}
                        renderInput={(params) => {
                            return <TextField {...params} label="Course" />;
                        }}
                        // value={course}
                        onChange={handleChangeCourse}
                    />
                    <button
                        className="button"
                        variant="secondary"
                        onClick={handleSubmitCourse}
                    >
                        Add Course
                    </button>
                </div>
            </div>
        )
    );
}
