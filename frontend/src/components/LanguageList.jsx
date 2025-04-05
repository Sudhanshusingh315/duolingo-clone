import ReactCountryFlag from "react-country-flag";
import { constantsConfig, countries } from "../constants";
import "./styles.css";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SideBarContext } from "../context/sideBarContext";
import PaymentModal from "./Modals/PaymentModal";
import { toast } from "react-toastify";
import { destroyToken } from "../features/auth/auth";
export default function LanguageList() {
    const { setSelectedLang } = useContext(SideBarContext);
    const dispatch = useDispatch();
    console.log("use context", setSelectedLang);
    const [myLange, setMyLang] = useState();
    const { accessToken, userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const payment = searchParams?.get("payment");
    const hearts = searchParams?.get("hearts");
    const [showPayment, setShowPayment] = useState(payment);
    console.log("my languages", myLange);
    useEffect(() => {
        (async () => {
            try {
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
            } catch (err) {
                console.log("error", err);
                const { response } = err;

                toast.error(response?.data?.message, "top-right");
                dispatch(destroyToken());
            }
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
        setSelectedLang(code);
    };

    return (
        <>
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
            {/* payment */}
            <PaymentModal
                payment={showPayment}
                hearts={hearts}
                setShowPayment={setShowPayment}
                setSearchParams={setSearchParams}
            />
        </>
    );
}
