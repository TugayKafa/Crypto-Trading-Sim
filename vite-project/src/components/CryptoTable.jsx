import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container } from 'react-bootstrap';

const CryptoTable = ({ username }) => {
    const [cryptos, setCryptos] = useState([]);

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
                    symbol,
                    price: parseFloat(info.c[0]).toFixed(2)
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

    const handleBuy = (symbol) => {
        alert(`Buying ${symbol} for user ${username}`);
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
                            <td>${crypto.price}</td>
                            <td><Button variant="btn btn-success" onClick={() => handleBuy(crypto.symbol)}>Buy</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default CryptoTable;
