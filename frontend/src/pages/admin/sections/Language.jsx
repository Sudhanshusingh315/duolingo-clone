import { Autocomplete, selectClasses, TextField } from "@mui/material";
import { useState } from "react";
import { countries } from "../../../constants";

export default function Language() {
    // language array
    const [languageArray, setLanguageArray] = useState();
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleChange = (event, newValue) => {
        setSelectedCountry(newValue);
    };
    console.log("selected country", selectedCountry);
    return (
        <div className="p-4">
            <h1 className="text-2xl text-center mb-6">
                Select the language or add one
            </h1>
            <div className="flex flex-wrap">
                {/* languages map goes here */}
            </div>

            <h2 className="text-xl"> select languages from here</h2>
            <Autocomplete
                options={countries}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            label="Movie"
                            sx={{
                                "& label": { color: "white" },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": { borderColor: "white" },
                                    "&:hover fieldset": {
                                        borderColor: "white",
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "white",
                                    },
                                },
                                input: { color: "white" },
                            }}
                        />
                    );
                }}
                value={selectedCountry}
                onChange={handleChange}
            />
        </div>
    );
}
