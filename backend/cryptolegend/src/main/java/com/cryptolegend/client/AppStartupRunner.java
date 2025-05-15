package com.cryptolegend.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

//@Component
public class AppStartupRunner implements CommandLineRunner {

    @Autowired
    private KrakenWebSocketClient krakenWebSocketClient;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Starting Kraken WebSocket client...");
        krakenWebSocketClient.connect();
    }
}
