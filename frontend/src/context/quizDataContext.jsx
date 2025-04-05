import { createContext, useState } from "react";

export const QuizDataContext = createContext(null);

export const QuizDataContextProvider = ({ children }) => {
    const [data, setData] = useState(0);
    console.log("data collectiong",data);
    return (
        <QuizDataContext.Provider value={{ data, setData }}>
            {children}
        </QuizDataContext.Provider>
    );
};
