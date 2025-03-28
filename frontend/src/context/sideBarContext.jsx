import { createContext, useState } from "react";

export const SideBarContext = createContext(null);

export const SideBarDataContextProvider = ({ children }) => {
    const [selectedLang, setSelectedLang] = useState("");
    console.log("selected langu", selectedLang);

    return (
        <SideBarContext.Provider value={{ selectedLang, setSelectedLang }}>
            {children}
        </SideBarContext.Provider>
    );
};
