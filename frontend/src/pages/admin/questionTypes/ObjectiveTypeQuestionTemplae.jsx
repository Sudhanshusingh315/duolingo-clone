import React, { useContext, useState } from "react";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Box,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import { QuizDataContext } from "../../../context/quizDataContext";

export default function ObjectiveTypeQuestion() {
    const { data, setData } = useContext(QuizDataContext);
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
    ]);

    const handleAnswerChange = (index, field, value) => {
        const options = [...answers];

        options[index][field] = value;
        setAnswers(options);

        setData((prev) => {
            return {
                ...prev,
                options,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            question,
            answers,
        });
        // Add API call or other logic here
    };
    console.log("question data", data);
    return (
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
                    sx={{
                        fontWeight: "bold",
                        marginBottom: "20px",
                        color: "#0e4b50",
                    }}
                >
                    Create a Question
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Question"
                        variant="outlined"
                        fullWidth
                        value={question}
                        onChange={(e) => {
                            setQuestion(e.target.value);
                            setData((prev) => {
                                return {
                                    ...prev,
                                    question: e.target.value,
                                };
                            });
                        }}
                        sx={{ marginBottom: "20px" }}
                        required
                    />

                    {answers.map((answer, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "15px",
                            }}
                        >
                            <TextField
                                label={`Answer ${index + 1}`}
                                variant="outlined"
                                fullWidth
                                value={answer.text}
                                onChange={(e) =>
                                    handleAnswerChange(
                                        index,
                                        "text",
                                        e.target.value
                                    )
                                }
                                sx={{ marginRight: "10px" }}
                                required
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={answer.isCorrect}
                                        onChange={(e) =>
                                            handleAnswerChange(
                                                index,
                                                "isCorrect",
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                label="Correct"
                            />
                        </Box>
                    ))}
                </form>
            </CardContent>
        </Card>
    );
}
