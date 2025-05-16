import React, { useEffect, useState } from 'react';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Замени URL с твоя бекенд API за транзакции
    fetch('http://localhost:8080/api/transactions/my')
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Грешка при зареждане:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container mt-4">Зареждане...</div>;
  }

  if (transactions.length === 0) {
    return <div className="container mt-4">Нямаш направени транзакции.</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Твоите транзакции</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Крипто</th>
            <th>Количество</th>
            <th>Цена за единица</th>
            <th>Общо</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.transactionId}>
              <td>{new Date(tx.date).toLocaleString()}</td>
              <td>{tx.cryptoSymbol}</td>
              <td>{tx.amount}</td>
              <td>{tx.pricePerUnit}</td>
              <td>{(tx.amount * tx.pricePerUnit).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
