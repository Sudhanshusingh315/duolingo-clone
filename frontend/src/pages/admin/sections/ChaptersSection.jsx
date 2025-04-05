import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Card,
    CardContent,
    Autocomplete,
} from "@mui/material";
import axios from "axios";
import { constantsConfig } from "../../../constants";
import "./styles.css";
const ChapterSection = () => {
    // State for form fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [availableCourses, setAvailableCourses] = useState([]);
    const [course, setCourse] = useState("");
    useEffect(() => {
        (async () => {
            const {
                data: { data },
            } = await axios({
                url: `${constantsConfig.BASE_URL}/api/chapter/get-chapters`,
            });

            setAvailableCourses(data);
        })();
    });

    const handleChange = (e, value) => {
        setCourse(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            title,
            description,
            courseId: course?.courseId,
        };
        // Add your form submission logic here (e.g., API call)
        await axios({
            url: `${constantsConfig.BASE_URL}/api/chapter/add-chapter`,
            method: "post",
            data,
        });

        // reset the states
        setTitle("");
        setDescription("");
        setCourse("");
    };

    return (
        <div className="px-4 mt-8 isolate">
            <div className="card mx-auto ">
                <CardContent>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold", marginBottom: "20px" }}
                    >
                        Create a Chapter
                    </Typography>
                    <Autocomplete
                        options={availableCourses}
                        getOptionLabel={(option) => option?.title || ""}
                        style={{
                            marginBottom: "15px",
                        }}
                        renderInput={(params) => {
                            return <TextField {...params} label="Course" />;
                        }}
                        value={course}
                        onChange={handleChange}
                    />

                    <form>
                        <Box sx={{ marginBottom: "15px" }}>
                            <TextField
                                label="Chapter Title"
                                variant="outlined"
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{ marginBottom: "10px" }}
                                required
                            />
                        </Box>

                        <Box sx={{ marginBottom: "15px" }}>
                            <TextField
                                label="Chapter Descripiton"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                sx={{ marginBottom: "10px" }}
                                required
                            />
                        </Box>

                        <button
                            variant="secondary"
                            className="button"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit Quiz
                        </button>
                    </form>
                </CardContent>
            </div>
        </div>
    );
};

export default ChapterSection;
