import React, { useContext, useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Card,
    CardContent,
} from "@mui/material";
import { QuizDataContext } from "../../../context/quizDataContext";

function MatchQuestion() {
    const { data, setData } = useContext(QuizDataContext);
    const [pairs, setPairs] = useState([{ text: "", match: "" }]);

    // Add a new pair of text & match
    const addPair = () => {
        console.log("hello");
        setPairs([...pairs, { text: "", match: "" }]);
        setData((prev) => {
            return {
                ...prev,
                columns: [...pairs],
            };
        });
    };
    console.log("data", data);
    // Handle input change
    const handleChange = (index, field, value) => {
        const updatedPairs = [...pairs];
        updatedPairs[index][field] = value;
        setPairs(updatedPairs);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <Typography variant="h5">Match the Following</Typography>
            {/* List of Text-Match Pairs */}
            {pairs.map((pair, index) => (
                <Card key={index} style={{ marginTop: "20px" }}>
                    <CardContent>
                        <TextField
                            label="Statement"
                            fullWidth
                            value={pair.text}
                            onChange={(e) =>
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        statement: e.target.value,
                                    };
                                })
                            }
                            sx={{
                                marginBottom: "1rem",
                            }}
                        />
                        <Grid container spacing={2}>
                            {/* Text Input */}
                            <Grid item xs={5}>
                                <TextField
                                    label="Text"
                                    fullWidth
                                    value={pair.text}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "text",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>

                            {/* Matched Text Input */}
                            <Grid item xs={5}>
                                <TextField
                                    label="Match"
                                    fullWidth
                                    value={pair.match}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "match",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}

            {/* Add Pair Button */}
            <button
                variant="secondary"
                className="button"
                fullWidth
                style={{ marginTop: "20px" }}
                onClick={addPair}
            >
                Add Another Pair
            </button>
        </div>
    );
}

export default MatchQuestion;
