import { useEffect, useRef, useState } from "react";
import MemoryCard from "./memoryCard";
// const data = [
//     // card 1-2
//     {
//         src: "https://plus.unsplash.com/premium_photo-1681154819686-43fcc4dc4df3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         text: "Bottle",
//         meaning: "Bottle",
//     },
//     {
//         src: "https://plus.unsplash.com/premium_photo-1681154819686-43fcc4dc4df3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         text: "botella",
//         meaning: "Bottle",
//     },

//     // card 3-4
//     {
//         src: "https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         text: "Chair",
//         meaning: "Chair",
//     },
//     {
//         src: "https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         text: "silla",
//         meaning: "Chair",
//     },

//     // card 5-6
//     {
//         src: "https://plus.unsplash.com/premium_photo-1668319914124-57301e0a1850?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         text: "Girl",
//         meaning: "Girl",
//     },
//     {
//         src: "https://plus.unsplash.com/premium_photo-1668319914124-57301e0a1850?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         text: "chica",
//         meaning: "Girl",
//     },

//     // card 7-8
//     {
//         src: "https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         text: "Cat",
//         meaning: "cat",
//     },
//     {
//         src: "https://images.unsplash.com/photo-1561948955-570b270e7c36?q=80&w=2101&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         text: "gata",
//         meaning: "cat",
//     },
// ];
export default function MemoryMatch({ data }) {
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
    );
}
