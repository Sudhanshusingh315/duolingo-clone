import { useState } from "react";
import "./styles.css";
import { HeartPulse } from "lucide-react";
export default function ShopSection() {
    const stroke = [10, 8, 10];
    const [index, setIndex] = useState(0);

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
                    <button>5x</button>
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
                    <button>50x</button>
                </div>
            </div>
        </>
    );
}
