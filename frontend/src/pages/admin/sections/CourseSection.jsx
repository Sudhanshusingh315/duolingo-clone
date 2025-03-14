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
};
export default function CourseSection() {
    // todo: make the api protected
    const [availableLanguages, setAvailableLanguages] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [submitCourse, setSubmitCourse] = useState(false);
    useEffect(() => {
        (async () => {
            // get the languages, and make em store here.
            const {
                data: { data },
            } = await axios({
                url: `${constantsConfig.BASE_URL}/api/language/languages`,
                method: "get",
            });
            setAvailableLanguages(data);
        })();
    }, []);

    const [form, setForm] = useState(FORMINITIAL);

    const handleChange = (e, value) => {
        if (value?.name) {
            const { id } = value;
            setForm({ ...form, language: id });
            return;
        }

        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChapterChange = (index, value) => {
        const newChapters = [...form.chapters];
        newChapters[index] = value;
        setForm({ ...form, chapters: newChapters });
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
                    <Autocomplete
                        options={availableLanguages}
                        getOptionLabel={(option) => option?.name || ""}
                        renderInput={(params) => {
                            return <TextField {...params} label="Counteris" />;
                        }}
                        value={selectedCountry}
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
                    <TextField
                        select
                        label="Difficulty Level"
                        name="difficultyLevel"
                        value={form.difficultyLevel}
                        onChange={handleChange}
                        fullWidth
                        sx={{
                            marginBottom: "15px",
                        }}
                    >
                        <MenuItem value="Easy">Easy</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Hard">Hard</MenuItem>
                    </TextField>
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
