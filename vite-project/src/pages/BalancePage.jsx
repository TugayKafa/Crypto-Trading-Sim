import { useState, useContext } from "react";
import axios from "axios";
import { BalanceContext } from "../context/BalanceContext";
import "../styles/BalancePage.css";

function BalancePage() {
    const { balance, setBalance } = useContext(BalanceContext);
    const accountId = localStorage.getItem("accountId");
    const [amount, setAmount] = useState("");

    const updateBalance = async (newBalance) => {
        try {
            const response = await axios.put(`http://localhost:8080/accounts/${accountId}/balance`, null, {
                params: { newBalance },
            });
            if (response.status === 200) {
                setBalance(newBalance);
                alert("Account balance updated successfully.");
            }
        } catch (error) {
            console.error("Error updating balance:", error);
            alert(error.response.data || "Something went wrong. Please try again.");
        }
    };

    const handleAddFunds = () => {
        const amountToAdd = parseFloat(amount);
        if (amountToAdd > 0) {
            updateBalance(balance + amountToAdd);
            setAmount("");
        } else {
            alert("Amount must be greater than 0.");
        }
    };

    const handleWithdrawFunds = () => {
        const amountToWithdraw = parseFloat(amount);
        if (amountToWithdraw > 0 && amountToWithdraw <= balance) {
            updateBalance(balance - amountToWithdraw);
            setAmount("");
        } else {
            alert("Invalid amount. It must be positive and less than or equal to your current balance.");
        }
    };

    const handleResetBalance = () => {
        updateBalance(10000);
    };

    return (
        <div className="balance-page">
            <h2>Account Balance</h2>
            <div className="balance-display">${balance.toFixed(2)}</div>

            <div className="balance-controls">
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleAddFunds}>Add Funds</button>
                <button className="btn btn-warning" onClick={handleWithdrawFunds}>Withdraw Funds</button>
                <button className="btn btn-danger" onClick={handleResetBalance}>Reset Balance</button>
            </div>
        </div>
    );
}

export default BalancePage;
