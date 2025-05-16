import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import HoldingCard from '../components/HoldingCard';

function PortfolioPage() {
    const [holdings, setHoldings] = useState([]);

    useEffect(() => {
        const fetchHoldings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/holdings');
                setHoldings(response.data);
            } catch (error) {
                console.error('Error fetching holdings:', error);
            }
        };
        fetchHoldings();
    }, []);

    return (
        <Container className="mt-4">
            <h2>Моето Портфолио</h2>
            <Row>
                {holdings.map((holding) => (
                    <Col key={holding.holdingId} md={4} className="mb-4">
                        <HoldingCard holding={holding} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PortfolioPage;
