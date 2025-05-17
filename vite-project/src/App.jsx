import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import TransactionsPage from './pages/TransactionsPage';
import NotFoundPage from './pages/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(null);

  return (
    <Router>
      <NavigationBar username={username} balance={balance} />
      <Routes>
        <Route path="/" element={<LoginPage setUsername={setUsername} setBalance={setBalance} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/:username" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
