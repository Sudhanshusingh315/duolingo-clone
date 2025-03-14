import { Autocomplete, selectClasses, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { constantsConfig, countries } from "../../../constants";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useLocation } from 'react-router'
export default function Language() {
    // language array
    const [languageArray, setLanguageArray] = useState();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const languageOptions = countries?.filter((element, index) => {
        if (!languageArray?.find((item) => item?.code === element?.code)) {
            return element;
        }
    });
    let location = useLocation();

    console.log("location",location);
    console.log("languae Options", languageOptions);
    const handleChange = (event, newValue) => {
        setSelectedCountry(newValue);
    };

    useEffect(() => {
        (async () => {
            const {
                data: { data },
            } = await axios({
                url: `${constantsConfig.BASE_URL}/api/language/languages`,
            });
            setLanguageArray(data);
        })();
    }, []);

    const handleAddLanguage = async () => {
        // make the api call
        if (selectedCountry) {
            const {
                data: { data },
            } = await axios({
                url: `${constantsConfig.BASE_URL}/api/language/add-language`,
                method: "post",
                data: {
                    name: selectedCountry.name,
                    code: selectedCountry.code,
                },
            });
            setSelectedCountry(null);
            setLanguageArray((prev) => {
                return [...prev, data];
            });

        }
    };
    console.log("selected country", selectedCountry);
    console.log("language", languageArray);
    return (
        <div className="p-4">
            <h1 className="text-2xl text-center mb-6">
                Select the language or add one
            </h1>
            <div className="flex flex-wrap justify-start gap-2">
                {/* languages map goes here */}
                {languageArray?.map(({ code }) => {
                    return (
                        <ReactCountryFlag
                            countryCode={code}
                            style={{
                                fontSize: "5rem",
                            }}
                        />
                    );
                })}
            </div>

            <h2 className="text-xl mb-2">
                {" "}
                select languages from here and add
            </h2>
            <Autocomplete
                options={languageOptions}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            label="Languages"
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
            <button
                onClick={handleAddLanguage}
                className="button my-2"
                variant="secondary-outline"
            >
                add
            </button>
        </div>
    );
}
