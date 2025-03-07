import { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Box, Autocomplete } from "@mui/material";
import { constantsConfig } from "../../../constants";
import axios from "axios";

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

    const [form, setForm] = useState({
        language: "",
        name: "",
        description: "",
        difficultyLevel: "",
        chapters: [""],
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleChapterChange = (index, value) => {
        const newChapters = [...form.chapters];
        newChapters[index] = value;
        setForm({ ...form, chapters: newChapters });
    };

    const addChapter = () => {
        if (form?.chapters?.length >= 8) {
            setSubmitCourse(true);
            return;
        }
        setForm({ ...form, chapters: [...form.chapters, ""] });
    };

    const handleSubmitCourse = () => {
        // make the api call for the course
    };

    // todo: make the simmer for this too
    return (
        availableLanguages && (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: 300,
                }}
            >
                <Autocomplete
                    options={availableLanguages}
                    getOptionLabel={(option) => option?.name || ""}
                    renderInput={(params) => {
                        return <TextField {...params} label="Counteris" />;
                    }}
                    value={selectedCountry}
                    onChange={handleChange}
                />
                <TextField
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    label="Description"
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
                >
                    <MenuItem value="Easy">Easy</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Hard">Hard</MenuItem>
                </TextField>
                {form.chapters.map((chapter, index) => (
                    <TextField
                        key={index}
                        label={`Chapter ${index + 1}`}
                        value={chapter}
                        onChange={(e) =>
                            handleChapterChange(index, e.target.value)
                        }
                        fullWidth
                    />
                ))}
                <Button
                    variant="contained"
                    onClick={submitCourse ? handleSubmitCourse : addChapter}
                >
                    {submitCourse ? "Add Course" : "Add Chapter"}
                </Button>
            </Box>
        )
    );
}
