import { useContext } from "react";
import { BalanceContext } from "../context/BalanceContext";
import "../styles/BalanceDisplay.css";

function BalanceDisplay() {
    const { balance } = useContext(BalanceContext);

    return <div className="display">Balance: ${balance.toFixed(2)}</div>;
}

export default BalanceDisplay;
