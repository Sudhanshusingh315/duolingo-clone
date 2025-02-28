import cover from "../../assets/cover.webp";
export default function MemoryCard({ element, ref, flipped, handleClick }) {
    return (
        <div
            ref={ref}
            className={`w-full aspect-square relative ${
                flipped ? "perspective-distant rotate-y-180" : ""
            } transition 300ms ease-in transform-3d rounded-2xl`}
        >
            <img
                className="w-full object-cover aspect-square absolute z-10 backface-hidden md:w-70"
                src={cover}
                onClick={() => {
                    handleClick(element);
                }}
            />

            <div className="grid absolute top-0 left-0 rotate-y-180">
                <img
                    className="max-w-full w-full aspect-square object-cover col-start-1 -col-end-1 row-start-1 row-end-2"
                    src={element?.src}
                />
                <p className="backdrop-blur-md p-2 text-center text-xl uppercase justify-self-center  self-center text-white font-extrabold col-start-1 -col-end-1 row-start-1 row-end-2">
                    {element?.text}
                </p>
            </div>
        </div>
    );
}
