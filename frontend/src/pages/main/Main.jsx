import fire from "../../assets/duolingofire.svg";
import heart from "../../assets/red-heart.svg";
import ReactCountryFlag from "react-country-flag";
export default function Main() {
    return (
        <div className="flex flex-col border min-h-screen bg-teal-950 px-4 py-2">
            {/* header */}
            <div className="flex justify-between items-center py-4 ">
                <ReactCountryFlag
                    className="emojiFlag"
                    style={{
                        fontSize: "2em",
                    }}
                    countryCode="US"
                />
                {/* todo: hover effects */}
                <div className="inline-flex justify-center items-center text-xl gap-2">
                    <img src={fire} alt="" />
                    <span className="text-amber-600 font-bold">1</span>
                </div>
                <div className="inline-flex justify-center items-center text-xl gap-2 hover">
                    <img src={heart} alt="" />
                    <span className="text-rose-600 font-bold">5</span>
                </div>
            </div>

                {/* current header */}
                {/* todo: current header try another way */}
                {/* <div className="fixed top-20 w-[320px] h-20 bg-amber-100 ">

                </div> */}

            {/* main content of the lessons */}
            <div className="flex-auto">
                {/* heading */}

                <div className="flex items-center ">
                    <p className="flex-1 horizontal-border "></p>
                    <p className="font-semibold text-gray-400">Lesson one: 1</p>
                    <p className="flex-1 horizontal-border "></p>
                </div>

                {/* lessons */}
                




            </div>
            {/* footer that would become a side bar on the bigger screens */}
            <div>main section</div>
        </div>
    );
}
