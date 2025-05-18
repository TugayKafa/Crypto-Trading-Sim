import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import PortfolioPage from "./pages/PortfolioPage";
import CryptoTable from "./components/CryptoTable";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import { BalanceProvider } from "./context/BalanceContext";
import TransactionsPage from "./pages/TransactionsPage";

function App() {
    return (
        <BalanceProvider>
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/:username" element={<CryptoTable />} />
                    <Route path="/portfolio" element={<PortfolioPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </BalanceProvider>
    );
}

export default App;
