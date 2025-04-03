import { createContext, useState } from "react";

export const orderContext = createContext(null);

export const OrderContextProvider = ({ children }) => {
    const [orderDetails, setOrderDetails] = useState(null);
    return (
        <OrderContextProvider.Provider
            value={{ orderDetails, setOrderDetails }}
        >
            {children}
        </OrderContextProvider.Provider>
    );
};
