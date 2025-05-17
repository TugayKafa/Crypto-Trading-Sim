import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BalanceDisplay.css";

const BalanceDisplay = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await axios.get(`http://localhost:8080/accounts/user/${userId}`);
          setBalance(response.data.balance);
        }
      } catch (error) {
        console.error("Failed to fetch account balance:", error);
      }
    };

    fetchAccountData();
  }, []);

  return (
    <div className="balance-display">
      Balance: ${balance.toFixed(2)}
    </div>
  );
};

export default BalanceDisplay;
