package com.example.Shop_App_Backend;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

/*
@ServerEndpoint("/websocket")
public class MyWebSocketEndpoint {

    @OnOpen
    public void onOpen(Session session) {
        System.out.println("WebSocket connection opened");
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("Received message: " + message);

        // Echo the message back to the client
        try {
            session.getBasicRemote().sendText("Echo: " + message);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @OnClose
    public void onClose(Session session) {
        System.out.println("WebSocket connection closed");
    }
}


 */