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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Quiz Title:", title);
        console.log("Quiz Description:", description);
        // Add your form submission logic here (e.g., API call)
    };

    return (
        <div className="px-4">
            <Card
                sx={{
                    maxWidth: 500,
                    margin: "20px auto",
                    padding: "20px",
                    backgroundColor: "#f4f4f4",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: "bold", marginBottom: "20px" }}
                    >
                        Create a Quiz
                    </Typography>
                    <Autocomplete
                        options={availableCourses}
                        getOptionLabel={(option) => option?.title || ""}
                        renderInput={(params) => {
                            return <TextField {...params} label="Courses" />;
                        }}
                        value={course}
                        // onChange={handleChange}
                    />

                    <form onSubmit={handleSubmit}>
                        <Box sx={{ marginBottom: "15px" }}>
                            <TextField
                                label="Quiz Title"
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
                                label="Quiz Description"
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

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ marginTop: "15px" }}
                        >
                            Submit Quiz
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChapterSection;
