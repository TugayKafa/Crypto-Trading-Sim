import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';
import { BalanceContext } from '../context/BalanceContext';
import '../styles/CryptoTable.css';

const SYMBOL_MAP = {
    XXBTZUSD: "BTC",
    XETHZUSD: "ETH",
    ADAUSD: "ADA",
    XRPUSD: "XRP",
    DOTUSD: "DOT",
    XLTCZUSD: "LTC",
    SOLUSD: "SOL",
    DOGEUSD: "DOGE",
    BNBUSD: "BNB",
    AVAXUSD: "AVAX",
    MATICUSD: "MATIC",
    UNIUSD: "UNI",
    LINKUSD: "LINK",
    ATOMUSD: "ATOM",
    TRXUSD: "TRX",
    XXLMZUSD: "XLM",
    XETCZUSD: "ETC",
    ICPUSD: "ICP",
    FILUSD: "FIL",
    NEARUSD: "NEAR"
};

const CryptoTable = ({ username }) => {
    const [cryptos, setCryptos] = useState([]);
    const [priceChanges, setPriceChanges] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [cryptoAmount, setCryptoAmount] = useState(0);
    const [usdAmount, setUsdAmount] = useState(0.01);
    const accountId = localStorage.getItem('accountId');
    const { balance, setBalance } = useContext(BalanceContext);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get('https://api.kraken.com/0/public/Ticker', {
                    params: {
                        pair: Object.keys(SYMBOL_MAP).join(",")
                    }
                });
                const data = response.data.result;
                
                const updatedCryptos = Object.entries(data).map(([symbol, info]) => ({
                    symbol: SYMBOL_MAP[symbol] || symbol,
                    price: parseFloat(info.c[0]).toFixed(5)
                }));

                // Calculate price changes
                const newPriceChanges = {};
                updatedCryptos.forEach((crypto) => {
                    const previousPrice = cryptos.find(c => c.symbol === crypto.symbol)?.price || 0;
                    const currentPrice = parseFloat(crypto.price);
                    const prevPrice = parseFloat(previousPrice);
                    
                    if (currentPrice > prevPrice) {
                        newPriceChanges[crypto.symbol] = 'price-up';
                    } else if (currentPrice < prevPrice) {
                        newPriceChanges[crypto.symbol] = 'price-down';
                    }
                });

                setPriceChanges(newPriceChanges);
                setCryptos(updatedCryptos);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
            }
        };

        fetchCryptos();
        const interval = setInterval(fetchCryptos, 1600);
        return () => clearInterval(interval);
    }, [cryptos]);

    const handleBuyClick = (crypto) => {
        setSelectedCrypto(crypto);
        setUsdAmount(0.01);
        setCryptoAmount((0.01 / parseFloat(crypto.price)).toFixed(8));
        setShowModal(true);
    };

    const handleAmountChange = (e) => {
        let newUsdAmount = parseFloat(e.target.value);
        if (newUsdAmount > balance) {
            newUsdAmount = balance;
        }
        setUsdAmount(newUsdAmount);
        setCryptoAmount((newUsdAmount / parseFloat(selectedCrypto.price)).toFixed(8));
    };

    const handleUsdInputChange = (e) => {
        let newUsdAmount = parseFloat(e.target.value) || 0.01;
        if (newUsdAmount > balance) {
            newUsdAmount = balance;
        }
        setUsdAmount(newUsdAmount);
        setCryptoAmount((newUsdAmount / parseFloat(selectedCrypto.price)).toFixed(8));
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

            const newBalance = balance - usdAmount;
            setBalance(newBalance);

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
                            <td className={priceChanges[crypto.symbol] || ''}>${crypto.price}</td>
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
                                    ≈ {cryptoAmount} {selectedCrypto.symbol}
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
