import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PortfolioPage.css';

function PortfolioPage() {
     const [holdings, setHoldings] = useState([]);
  const accountId = localStorage.getItem("accountId");

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
              const currentPrice = tickerResponse.data.result[pairKey].c[0];
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

    return (
        <div className="portfolio-container">
            <h2>My Portfolio</h2>
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
                            <td>${parseFloat(holding.averagePrice).toFixed(2)}</td>
                            <td>
                                {holding.currentPrice !== 'N/A' 
                                ? `$${parseFloat(holding.currentPrice).toFixed(2)}` 
                                : 'N/A'}
                            </td>
                            <td>
                                <button className="btn btn-success">Buy</button>
                                <button className="btn btn-danger">Sell</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PortfolioPage;