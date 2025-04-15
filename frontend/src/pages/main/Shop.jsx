import "./styles.css";
import { Currency, HeartPulse } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { constantsConfig } from "../../constants";
import { useContext } from "react";
import { SideBarContext } from "../../context/sideBarContext";
export default function ShopSection() {
    const { selectedLangCode } = useContext(SideBarContext);
    const { userInfo, accessToken } = useSelector((state) => state.auth);
    const checkOutHandler = async (amount) => {
        const data = {
            amount,
            userLangId: selectedLangCode,
        };
        const {
            data: { data: checkoutData, key },
        } = await axios({
            url: `${constantsConfig.BASE_URL}/api/payments/checkout`,
            method: "post",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            data,
        });
        const hearts = amount;
        console.log("key", key);
        console.log("checkout data", checkoutData);
        const { currency, id } = checkoutData;
        const options = {
            key,
            amount,
            currency,
            name: "Lingo",
            order_id: id, // This is the order_id created in the backend
            callback_url: `${constantsConfig.BASE_URL}/api/payments/success/${hearts}`, // Your success URL
            prefill: {
                name: userInfo.email,
                email: userInfo.email,
            },
        };
        const rzp = new Razorpay(options);
        rzp.open();
    };
    return (
        <>
            <div className="heart-section">
                <h2>Hearts</h2>
                <div className="heart-refil">
                    <HeartPulse
                        absoluteStrokeWidth={false}
                        size={80}
                        className="text-red-500 bg-pink-200 rounded-lg p-4"
                    />
                    <div>
                        <h3>Refill hearts</h3>
                        <p>
                            Get full hearts so you can worry less about making
                            mistakes in a lesson
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            checkOutHandler(50);
                        }}
                    >
                        5x
                    </button>
                </div>

                <div className="heart-refil">
                    <HeartPulse
                        absoluteStrokeWidth={false}
                        size={80}
                        className="testingggggg"
                    />
                    <div>
                        <h3>Refill hearts</h3>
                        <p>
                            Get full hearts so you can worry less about making
                            mistakes in a lesson
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            checkOutHandler(500);
                        }}
                    >
                        50x
                    </button>
                </div>
            </div>
        </>
    );
}
