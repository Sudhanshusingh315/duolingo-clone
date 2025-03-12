import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Card,
    CardContent,
} from "@mui/material";

function MemoryMatchQuestion() {
    const [options, setOptions] = useState([
        { src: "", text: "", meaning: "" },
    ]);

    // Add a new option (image + text + meaning)
    const addOption = () => {
        setOptions([...options, { src: "", text: "", meaning: "" }]);
    };

    // Handle input change (text or meaning)
    const handleChange = (index, field, value) => {
        const updatedOptions = [...options];
        updatedOptions[index][field] = value;
        setOptions(updatedOptions);
    };

    // Handle image upload
    const handleImageUpload = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const updatedOptions = [...options];
            updatedOptions[index].src = imageUrl;
            setOptions(updatedOptions);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <Typography variant="h5">Match the Following</Typography>

            {/* List of Image-Text-Meaning Pairs */}
            {options.map((option, index) => (
                <Card key={index} style={{ marginTop: "20px" }}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            {/* Image Upload & Preview */}
                            <Grid item xs={4}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id={`upload-image-${index}`}
                                    onChange={(e) =>
                                        handleImageUpload(index, e)
                                    }
                                />
                                <label htmlFor={`upload-image-${index}`}>
                                    <Button
                                        variant="contained"
                                        component="span"
                                        fullWidth
                                    >
                                        Upload Image
                                    </Button>
                                </label>
                                {option.src && (
                                    <img
                                        src={option.src}
                                        alt="Uploaded"
                                        style={{
                                            width: "100%",
                                            marginTop: "10px",
                                            borderRadius: "5px",
                                        }}
                                    />
                                )}
                            </Grid>

                            {/* Text Input */}
                            <Grid item xs={4}>
                                <TextField
                                    label="Text"
                                    fullWidth
                                    value={option.text}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "text",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>

                            {/* Meaning Input */}
                            <Grid item xs={4}>
                                <TextField
                                    label="Meaning"
                                    fullWidth
                                    value={option.meaning}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "meaning",
                                            e.target.value
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}

            {/* Add Option Button */}
            <Button
                variant="contained"
                fullWidth
                style={{ marginTop: "20px" }}
                onClick={addOption}
            >
                Add Another Option
            </Button>
        </div>
    );
}

export default MemoryMatchQuestion;
