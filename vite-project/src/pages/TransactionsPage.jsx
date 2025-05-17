import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TransactionsPage.css';

function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const accountId = localStorage.getItem('accountId');
    if (!accountId) return;
    
    axios.get(`http://localhost:8080/transactions/${accountId}`)
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch transactions:', error);
      });
  }, []);

  return (
    <div className="transactions-page">
      <h2>Your transactions</h2>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Price per Unit</th>
            <th>Type</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.transactionId}>
              <td>{tx.transactionId}</td>
              <td>{tx.cryptoSymbol}</td>
              <td>{tx.amount}</td>
              <td>${tx.pricePerUnit.toFixed(2)}</td>
              <td>{tx.transactionType}</td>
              <td>{new Date(tx.createdAt).toLocaleString()}</td>
              <td>${(tx.amount*tx.pricePerUnit).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsPage;
