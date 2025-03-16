import React, { useContext, useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Card,
    CardContent,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    sliderClasses,
} from "@mui/material";
import { QuizDataContext } from "../../../context/quizDataContext";

function DragAndDropTypeQuesiton() {
    const { data, setData } = useContext(QuizDataContext);
    const [buckets, setBuckets] = useState([]);
    const [bucketName, setBucketName] = useState("");
    const [selectedBucket, setSelectedBucket] = useState("");
    const [items, setItems] = useState({});
    const [newItem, setNewItem] = useState("");

    // Add new bucket
    const addBucket = () => {
        if (buckets?.length === 4) return;
        if (bucketName.trim() && !buckets.includes(bucketName)) {
            setData((prev) => {
                return {
                    ...prev,
                    categories: [...buckets, bucketName],
                    words: [{ ...items, [bucketName]: [] }],
                };
            });
            setBuckets([...buckets, bucketName]);
            setItems({ ...items, [bucketName]: [] }); // Initialize bucket
            setBucketName("");
        }
    };
    console.log("buckets", buckets);
    console.log("items", items);
    console.log("data ", data);
    // Add new item to selected bucket
    const addItem = () => {
        if (selectedBucket && newItem.trim()) {
            setData((prev) => {
                return {
                    ...prev,
                    items: [
                        {
                            ...items,
                            [selectedBucket]: [
                                ...items[selectedBucket],
                                newItem,
                            ],
                        },
                    ],
                };
            });
            setItems({
                ...items,
                [selectedBucket]: [...items[selectedBucket], newItem],
            });
            setNewItem(""); // Clear input after adding
        }
    };

    return (
        <div
            style={{
                padding: "20px",
                maxWidth: "600px",
                margin: "auto",
                maxHeight: "500px",
                marginBottom: "2rem",
                overflowY: "scroll",
            }}
        >
            <Typography variant="h5">Create Buckets & Add Items</Typography>

            {/* Add Bucket */}
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
                <Grid item xs={8}>
                    <TextField
                        label="New Bucket Name"
                        fullWidth
                        value={bucketName}
                        onChange={(e) => setBucketName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        onClick={addBucket}
                        fullWidth
                        sx={{
                            backgroundColor: `${
                                buckets?.length === 4 ? "gray" : "green"
                            }`,
                            color: "white",
                        }}
                    >
                        Add Bucket
                    </Button>
                </Grid>
            </Grid>

            {/* Select Bucket */}
            {buckets.length > 0 && (
                <FormControl fullWidth style={{ marginTop: "20px" }}>
                    <InputLabel>Select Bucket</InputLabel>
                    <Select
                        value={selectedBucket}
                        onChange={(e) => setSelectedBucket(e.target.value)}
                    >
                        {buckets.map((bucket, index) => (
                            <MenuItem key={index} value={bucket}>
                                {bucket}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {/* Add Item to Selected Bucket */}
            {selectedBucket && (
                <Grid container spacing={2} style={{ marginTop: "10px" }}>
                    <Grid item xs={8}>
                        <TextField
                            label="New Item"
                            fullWidth
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" onClick={addItem} fullWidth>
                            Add Item
                        </Button>
                    </Grid>
                </Grid>
            )}

            {/* Display Buckets and Items */}
            {buckets.map((bucket, index) => (
                <Card key={index} style={{ marginTop: "20px" }}>
                    <CardContent>
                        <Typography variant="h6">{bucket}</Typography>
                        {items[bucket].length > 0 ? (
                            items[bucket].map((item, idx) => (
                                <Typography
                                    key={idx}
                                    style={{ marginLeft: "10px" }}
                                >
                                    - {item}
                                </Typography>
                            ))
                        ) : (
                            <Typography
                                style={{ fontStyle: "italic", color: "gray" }}
                            >
                                No items added yet
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default DragAndDropTypeQuesiton;

// DragAndDropTypeQuesiton
