import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import './PortfolioPage.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BalanceContext } from '../context/BalanceContext';

function PortfolioPage() {
    const [holdings, setHoldings] = useState([]);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    const [selectedHolding, setSelectedHolding] = useState(null);
    const [cryptoAmount, setCryptoAmount] = useState(0.01);
    const [usdAmount, setUsdAmount] = useState(0.01);
    const [sellAmount, setSellAmount] = useState(0.01);
    const accountId = localStorage.getItem("accountId");
    const { balance, setBalance } = useContext(BalanceContext);

    const fetchHoldings = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/holdings/account/${accountId}`);
            const holdingsData = response.data;
            const updatedHoldings = await Promise.all(
                holdingsData.map(async (holding) => {
                    try {
                        const tickerResponse = await axios.get(`https://api.kraken.com/0/public/Ticker?pair=${holding.cryptoSymbol}USD`);
                        const pairKey = Object.keys(tickerResponse.data.result)[0];
                        const currentPrice = parseFloat(tickerResponse.data.result[pairKey].c[0]);
                        return { ...holding, currentPrice };
                    } catch (error) {
                        console.error(`Error fetching price for ${holding.cryptoSymbol}:`, error);
                        return { ...holding, currentPrice: "N/A" };
                    }
                })
            );
            setHoldings(updatedHoldings);
        } catch (error) {
            console.error("Error fetching holdings:", error);
        }
    };

    useEffect(() => {
        fetchHoldings();
        const interval = setInterval(fetchHoldings, 1600);
        return () => clearInterval(interval);
    }, [accountId]);

    const handleBuyClick = (holding) => {
        setSelectedHolding(holding);
        setUsdAmount(0.01);
        setCryptoAmount(0.01 / holding.currentPrice);
        setShowBuyModal(true);
    };

    const handleSellClick = (holding) => {
        setSelectedHolding(holding);
        setSellAmount(0.01);
        setShowSellModal(true);
    };

    const handleAmountChange = (e) => {
        let newUsdAmount = parseFloat(e.target.value);
        if (newUsdAmount > balance) {
            newUsdAmount = balance;
        }
        setUsdAmount(newUsdAmount);
        setCryptoAmount(newUsdAmount / selectedHolding.currentPrice);
    };

    const handleUsdInputChange = (e) => {
        let newUsdAmount = parseFloat(e.target.value) || 0.01;
        if (newUsdAmount > balance) {
            newUsdAmount = balance;
        }
        setUsdAmount(newUsdAmount);
        setCryptoAmount(newUsdAmount / selectedHolding.currentPrice);
    };

    const handleSellAmountChange = (e) => {
        let newCryptoAmount = parseFloat(e.target.value) || 0.01;
        if (newCryptoAmount > selectedHolding.amount) {
            newCryptoAmount = selectedHolding.amount;
        }
        setSellAmount(newCryptoAmount);
    };

    const handleBuy = async () => {
        try {
            const transactionData = {
                accountId: parseInt(accountId),
                cryptoSymbol: selectedHolding.cryptoSymbol,
                amount: cryptoAmount,
                pricePerUnit: selectedHolding.currentPrice,
                transactionType: "BUY",
            };

            const response = await axios.post("http://localhost:8080/transactions", transactionData);
            
            if (response.status === 200 || response.status === 201) {
                const newBalance = balance - usdAmount;
                setBalance(newBalance);
                localStorage.setItem("balance", newBalance.toFixed(2));

                setShowBuyModal(false);
                fetchHoldings(); // Refresh holdings
                alert("Transaction successful!");
            }
        } catch (error) {
            console.error("Error creating transaction:", error);
            alert("Something went wrong! Please try again later!");
        }
    };

    const handleSell = async () => {
        try {
            const transactionData = {
                accountId: parseInt(accountId),
                cryptoSymbol: selectedHolding.cryptoSymbol,
                amount: sellAmount,
                pricePerUnit: selectedHolding.currentPrice,
                transactionType: "SELL",
            };

            const response = await axios.post("http://localhost:8080/transactions", transactionData);
            
            if (response.status === 200 || response.status === 201) {
                const newBalance = balance + (sellAmount * selectedHolding.currentPrice);
                setBalance(newBalance);
                localStorage.setItem("balance", newBalance.toFixed(2));

                setShowSellModal(false);
                fetchHoldings(); // Refresh holdings
                alert("Transaction successful!");
            }
        } catch (error) {
            console.error("Error creating transaction:", error);
            alert("Something went wrong! Please try again later!");
        }
    };

    return (
        <div className="portfolio-container">
            <h2>Your portfolio</h2>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Quantity</th>
                        <th>Average Price</th>
                        <th>Current Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {holdings.map((holding) => (
                        <tr key={holding.cryptoSymbol}>
                            <td>{holding.cryptoSymbol}</td>
                            <td>{holding.amount.toFixed(8)}</td>
                            <td>${holding.averagePrice.toFixed(2)}</td>
                            <td>${holding.currentPrice.toFixed(2)}</td>
                            <td>
                                <button className="btn btn-success mx-1" onClick={() => handleBuyClick(holding)}>Buy</button>
                                <button className="btn btn-danger mx-1" onClick={() => handleSellClick(holding)}>Sell</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
           {/* Buy Modal */}
            {selectedHolding && showBuyModal && (
         <Modal show={showBuyModal} onHide={() => setShowBuyModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Buy {selectedHolding.cryptoSymbol}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="buyFormRange">
                        <Form.Label>Amount in USD</Form.Label>
                        <Form.Range 
                            min={0.01} 
                            max={balance} 
                            step={0.01} 
                            value={usdAmount} 
                            onChange={handleAmountChange} 
                        />
                        <Form.Control 
                            type="number" 
                            value={usdAmount} 
                            onChange={handleUsdInputChange} 
                            min="0.01" 
                            max={balance} 
                            step="0.01" 
                            className="mt-2" 
                        />
                        <Form.Text>${usdAmount.toFixed(2)} USD</Form.Text>
                        <Form.Text className="d-block mt-2">
                            ≈ {cryptoAmount.toFixed(8)} {selectedHolding.cryptoSymbol}
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setShowBuyModal(false)}>
                    Cancel
                </Button>
                <Button variant="success" onClick={handleBuy}>
                    Buy
                </Button>
            </Modal.Footer>
        </Modal>
)}

{/* Sell Modal */}
{selectedHolding && showSellModal && (
    <Modal show={showSellModal} onHide={() => setShowSellModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Sell {selectedHolding.cryptoSymbol}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="sellFormRange">
                    <Form.Label>Amount to Sell</Form.Label>
                    <Form.Range 
                        min={0.01} 
                        max={selectedHolding.amount} 
                        step="0.00000001" 
                        value={sellAmount} 
                        onChange={handleSellAmountChange} 
                    />
                    <Form.Control 
                        type="number" 
                        value={sellAmount} 
                        onChange={handleSellAmountChange} 
                        min="0.01" 
                        max={selectedHolding.amount} 
                        step="0.00000001" 
                        className="mt-2" 
                    />
                    <Form.Text>
                        {sellAmount.toFixed(8)} {selectedHolding.cryptoSymbol} ≈ ${(sellAmount * selectedHolding.currentPrice).toFixed(2)} USD
                    </Form.Text>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSellModal(false)}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleSell}>
                Sell
            </Button>
        </Modal.Footer>
    </Modal>
)}
        </div>
    );
}

export default PortfolioPage;
