import ReactCountryFlag from "react-country-flag";
import { constantsConfig, countries } from "../constants";
import "./styles.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function LanguageList() {
    const [myLange, setMyLang] = useState();
    const { accessToken, userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    console.log("my languages", myLange);
    useEffect(() => {
        (async () => {
            const {
                data: { data },
            } = await axios({
                url: `${constantsConfig.BASE_URL}/api/auth/user/opted-languages`,
                method: "post",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const { language } = data[0];
            console.log("language", language);
            setMyLang(language);
        })();
    }, []);

    const handleAddLanguage = async (code) => {
        console.log(userInfo);
        const {
            data: { data },
        } = await axios({
            url: `${constantsConfig.BASE_URL}/api/language/user/add-language/${userInfo?.id}`,
            method: "post",
            data: {
                languageCode: code,
            },
        });
        navigate(`/lesson/course-component?languageCode=${code}`);
    };

    return (
        <div className="language-container">
            <h1 className="language-container-title">
                Language Courses for English Speakers
            </h1>
            <div className="language-box-container">
                {countries?.map(({ name, code }, index) => {
                    return (
                        <div key={index} className="language-box-outter">
                            {myLange?.includes(code) && (
                                <p className="selected">SELECTED</p>
                            )}
                            <div
                                className="language-box"
                                onClick={() => {
                                    handleAddLanguage(code);
                                }}
                            >
                                <ReactCountryFlag
                                    countryCode={code}
                                    className="emoji-box"
                                    style={{
                                        fontSize: "5em",
                                    }}
                                />
                                <p className="language-name">{name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
