import React from 'react';
import { Card } from 'react-bootstrap';

function HoldingCard({ holding }) {
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title>{holding.cryptoSymbol}</Card.Title>
                <Card.Text>
                    <strong>Количество:</strong> {holding.amount.toFixed(8)}<br />
                    <strong>Средна цена:</strong> ${holding.averagePrice.toFixed(2)}<br />
                    <strong>Текуща стойност:</strong> ${(holding.amount * holding.averagePrice).toFixed(2)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default HoldingCard;
