package com.example.Shop_App_Backend;

import org.glassfish.tyrus.server.Server;
import javax.websocket.OnMessage;
import javax.websocket.Session;
import java.io.IOException;

/*
public class WebSocketServer {

    public static void main(String[] args) {
        Server server = new Server("localhost", 8025, "/websocket", null, MyWebSocketEndpoint.class);

        try {
            server.start();
            System.out.println("WebSocket server started...");
            Thread.sleep(Long.MAX_VALUE);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            server.stop();
        }
    }
}


 */