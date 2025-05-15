package com.cryptolegend.client;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import org.springframework.stereotype.Component;

import java.net.URI;

@Component
public class KrakenWebSocketClient extends WebSocketClient {

    public KrakenWebSocketClient() throws Exception {
        super(new URI("wss://ws.kraken.com"));
        connect();
    }

    @Override
    public void onOpen(ServerHandshake serverHandshake) {
        System.out.println("Connected to Kraken WebSocket API");

        // Примерен абонамент за тикери
        String message = """
                {
                    "event": "subscribe",
                    "pair": ["BTC/USD", "ETH/USD", "ADA/USD"],
                    "subscription": {
                        "name": "ticker"
                    }
                }
                """;

        send(message);
    }

    @Override
    public void onMessage(String message) {
        System.out.println("Received message: " + message);
    }

    @Override
    public void onClose(int code, String reason, boolean remote) {
        System.out.println("Connection closed: " + reason);

    }

    @Override
    public void onError(Exception exception) {
        System.err.println("WebSocket error: " + exception.getMessage());
    }
}
