import React, { useContext } from "react";
import { BalanceContext } from "../context/BalanceContext";
import "./BalanceDisplay.css";

const BalanceDisplay = () => {
  const { balance } = useContext(BalanceContext);

  return (
    <div className="balance-display">
      Balance: ${balance.toFixed(2)}
    </div>
  );
};

export default BalanceDisplay;
