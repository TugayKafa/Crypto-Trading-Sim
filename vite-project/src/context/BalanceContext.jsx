import { createContext, useState, useEffect } from "react";

export const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
    const [balance, setBalance] = useState(() => {
        const savedBalance = localStorage.getItem("balance");
        return savedBalance ? parseFloat(savedBalance) : 0.0;
    });

    useEffect(() => {
        localStorage.setItem("balance", balance.toFixed(2));
    }, [balance]);

    return (
        <BalanceContext.Provider value={{ balance, setBalance }}>
            {children}
        </BalanceContext.Provider>
    );
};
