export const constantsConfig = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
};

export const GuestUserCredentials = {
    userEmail: import.meta.env.VITE_USEREMAIL,
    userPassword: import.meta.env.VITE_USERPASSWORD,
};

export const lessonType = {
    OBJECTIVE: "objective",
    MEMORYGAME: "memoryGame",
    MATCH: "match",
    DRAGANDDROP: "dragAndDrop",
    AUDIOANDTYPE: "audioAndType",
};

export const countries = [
    { name: "United States", code: "US" },
    { name: "Canada", code: "CA" },
    { name: "United Kingdom", code: "GB" },
    { name: "Australia", code: "AU" },
    { name: "India", code: "IN" },
    { name: "Germany", code: "DE" },
    { name: "France", code: "FR" },
    { name: "Japan", code: "JP" },
    { name: "China", code: "CN" },
    { name: "Brazil", code: "BR" },
];
