import React, { useState } from "react";
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
} from "@mui/material";

function DragAndDropTypeQuesiton() {
    const [buckets, setBuckets] = useState([]); // List of buckets
    const [bucketName, setBucketName] = useState(""); // New bucket input
    const [selectedBucket, setSelectedBucket] = useState(""); // Selected bucket for adding items
    const [items, setItems] = useState({}); // Stores items per bucket
    const [newItem, setNewItem] = useState(""); // New item input

    // Add new bucket
    const addBucket = () => {
        if (bucketName.trim() && !buckets.includes(bucketName)) {
            setBuckets([...buckets, bucketName]);
            setItems({ ...items, [bucketName]: [] }); // Initialize bucket
            setBucketName("");
        }
    };

    // Add new item to selected bucket
    const addItem = () => {
        if (selectedBucket && newItem.trim()) {
            setItems({
                ...items,
                [selectedBucket]: [...items[selectedBucket], newItem],
            });
            setNewItem(""); // Clear input after adding
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
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
                    <Button variant="contained" onClick={addBucket} fullWidth>
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
