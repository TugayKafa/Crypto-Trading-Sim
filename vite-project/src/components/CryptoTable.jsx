import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';

const CryptoTable = ({ username }) => {
    const [cryptos, setCryptos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [balance, setBalance] = useState(parseFloat(localStorage.getItem('balance')) || 0);
    const [cryptoAmount, setCryptoAmount] = useState(0);
    const [usdAmount, setUsdAmount] = useState(0.01);
    const accountId = localStorage.getItem('accountId');

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get('https://api.kraken.com/0/public/Ticker', {
                    params: {
                        pair: 'BTCUSD,ETHUSD,ADAUSD,XRPUSD,DOTUSD,LTCUSD,SOLUSD,DOGEUSD,BNBUSD,AVAXUSD,MATICUSD,UNIUSD,LINKUSD,ATOMUSD,TRXUSD,XLMUSD,ETCUSD,ICPUSD,FILUSD,NEARUSD'
                    }
                });
                const data = response.data.result;
                const formattedData = Object.entries(data).map(([symbol, info]) => ({
                    symbol: symbol.replace('USD', ''),
                    price: parseFloat(info.c[0])
                 }));
                setCryptos(formattedData);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };

        fetchCryptos();
        const interval = setInterval(fetchCryptos, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleBuyClick = (crypto) => {
        setSelectedCrypto(crypto);
        setUsdAmount(0.01);
        setCryptoAmount(0.01 / crypto.price);
        setShowModal(true);
    };

    const handleAmountChange = (e) => {
        let newUsdAmount = parseFloat(e.target.value);
        if (newUsdAmount > balance) {
            newUsdAmount = balance;
        }
        setUsdAmount(newUsdAmount);
        setCryptoAmount(newUsdAmount / selectedCrypto.price);
    };

    const handleUsdInputChange = (e) => {
        let newUsdAmount = parseFloat(e.target.value) || 0.01;
        if (newUsdAmount > balance) {
            newUsdAmount = balance;
        }
        setUsdAmount(newUsdAmount);
        setCryptoAmount(newUsdAmount / selectedCrypto.price);
    };

    const handleBuyConfirm = async () => {
        try {
            await axios.post('http://localhost:8080/transactions', {
                accountId: parseInt(accountId),
                cryptoSymbol: selectedCrypto.symbol,
                amount: cryptoAmount,
                pricePerUnit: selectedCrypto.price,
                transactionType: "BUY"
            });

            // Update balance in local storage
            const newBalance = balance - usdAmount;
            setBalance(newBalance);
            localStorage.setItem('balance', newBalance);

            // Close modal
            setShowModal(false);
        } catch (error) {
            console.error("Error executing transaction:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h3>Your Top 20 Cryptocurrencies</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Price (USD)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {cryptos.map((crypto, index) => (
                        <tr key={index}>
                            <td>{crypto.symbol}</td>
                            <td>${crypto.price.toFixed(2)}</td>
                            <td>
                                <Button variant="success" onClick={() => handleBuyClick(crypto)}>
                                    Buy
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {selectedCrypto && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Buy {selectedCrypto.symbol}</Modal.Title>
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
                                    ≈ {cryptoAmount.toFixed(8)} {selectedCrypto.symbol}
                                </Form.Text>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={handleBuyConfirm}>
                            Buy
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Container>
    );
};

export default CryptoTable;
