import "./styles.css";
import { Heart } from "lucide-react";
import duojumping from "../../assets/duojumping.webp";
export default function PaymentModal({
    payment,
    hearts,
    setShowPayment,
    setSearchParams,
}) {
    return (
        payment &&
        hearts && (
            <div className="payment-parent">
                <div className="payment-modal">
                    <h1>We just got paid</h1>
                    <p className="sub-title">means you get hearts</p>
                    <p className="sub-text">
                        you now have{" "}
                        <span className="flex font-bold text-5xl mx-auto  justify-center items-center">
                            <Heart strokeWidth={3} size={50} />
                            {hearts}
                        </span>{" "}
                        to practice
                    </p>

                    <img
                        className=" w-60 mx-auto aspect-square object-cover"
                        src={duojumping}
                        alt=""
                    />
                    <button
                        className="button"
                        variant="secondary"
                        onClick={() => {
                            setShowPayment(false);
                            setSearchParams({});
                        }}
                    >
                        Go back
                    </button>
                </div>
            </div>
        )
    );
}
