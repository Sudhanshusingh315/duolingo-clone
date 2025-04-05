import { useContext, useEffect, useRef, useState } from "react";
import MemoryCard from "./memoryCard";
import { LessonContext } from "../../context/lessonContext";
import successTwo from "../../assets/succsssTwo.gif";
export default function MemoryMatch({ data }) {
    const { userAnswerMemoryMatch, setUserAnswerMemoryMatch } =
        useContext(LessonContext);
    const [choiseOne, setChoiseOne] = useState(null);
    const [choiseTwo, setChoiseTwo] = useState(null);
    const [cards, setCards] = useState(null);
    const [won, setWon] = useState(0);
    const cardRef = useRef(null);
    useEffect(() => {
        // shuffle the cards
        shuffleCards();
    }, []);

    useEffect(() => {
        if (choiseOne && choiseTwo) {
            checkForAMatch();
        }
    }, [choiseOne, choiseTwo]);

    useEffect(() => {
        if (won === 0) return;
        if (won === cards?.length) {
            console.log("you have won the game");
            setUserAnswerMemoryMatch(true);
        }
    }, [won]);

    console.log(won);
    const shuffleCards = () => {
        setCards((prev) => {
            return data?.options?.sort(() => Math.round(Math.random()) - 0.5);
        });
    };

    const handleClick = (element) => {
        choiseOne ? setChoiseTwo(element) : setChoiseOne(element);
    };

    const checkForAMatch = () => {
        console.log("i will now check for the match");
        if (choiseOne?.meaning === choiseTwo?.meaning) {
            setCards((prev) => {
                return prev.map((element, index) => {
                    if (
                        element?.meaning === choiseOne?.meaning ||
                        element?.meaning === choiseTwo?.meaning
                    ) {
                        setWon((prev) => prev + 1);
                        return { ...element, matched: true };
                    } else {
                        return element;
                    }
                });
            });
        } else {
            console.log("didn't match");
        }
        setTimeout(() => {
            reset();
        }, 600);
    };

    const reset = () => {
        setChoiseOne(null);
        setChoiseTwo(null);
    };
    return (
        <>
            {won !== cards?.length ? (
                <div className="grid grid-cols-2 gap-2 w-50 md:grid-cols-4 md:w-[600px] md:px-10">
                    {cards?.map((element, index) => {
                        return (
                            <MemoryCard
                                key={index}
                                element={element}
                                ref={cardRef}
                                flipped={
                                    choiseOne?.text === element?.text ||
                                    choiseTwo?.text === element?.text ||
                                    element?.matched
                                }
                                handleClick={handleClick}
                            />
                        );
                    })}
                </div>
            ) : (
                // tdoo: animate this div IMPORTANT
                <div className="">
                    <p className="font-bold text-white text-2xl">
                        All answers were marked correct yay!!!
                    </p>
                    <img src={successTwo}  className="w-60 mx-auto"/>
                </div>
            )}
        </>
    );
}
