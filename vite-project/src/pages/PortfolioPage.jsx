import React, { useEffect,useContext, useState } from 'react';
import axios from 'axios';
import './PortfolioPage.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BalanceContext } from '../context/BalanceContext';

function PortfolioPage() {
    const [holdings, setHoldings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedHolding, setSelectedHolding] = useState(null);
    const [cryptoAmount, setCryptoAmount] = useState(0);
    const [usdAmount, setUsdAmount] = useState(0.01);
    const accountId = localStorage.getItem("accountId");
    const { balance, setBalance } = useContext(BalanceContext);

    useEffect(() => {
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

        fetchHoldings();
        const interval = setInterval(fetchHoldings, 3000);

        return () => clearInterval(interval);
    }, [accountId]);

    const handleBuyClick = (holding) => {
        setSelectedHolding(holding);
        setUsdAmount(0.01);
        setCryptoAmount(0.01 / holding.currentPrice);
        setShowModal(true);
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

                setShowModal(false);
                alert("Transaction is successful!");
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
                            <td>{holding.amount}</td>
                            <td>
                                {holding.averagePrice !== 'N/A' 
                                ? `$${holding.averagePrice.toFixed(2)}` 
                                : 'N/A'}
                            </td>
                            <td>
                                {holding.currentPrice !== 'N/A' 
                                ? `$${holding.currentPrice.toFixed(2)}` 
                                : 'N/A'}
                            </td>
                            <td>
                                <button className="btn btn-success" onClick={() => handleBuyClick(holding)}>Buy</button>
                                <button className="btn btn-danger">Sell</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedHolding && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Buy {selectedHolding.cryptoSymbol}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicRange">
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
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="btn btn-success" onClick={handleBuy}>
                            Buy
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default PortfolioPage;
