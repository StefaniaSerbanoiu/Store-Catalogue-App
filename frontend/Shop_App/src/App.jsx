import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Update from './Update';
import Read from './Read';
import Suggestions from './SuggestionEntity/Suggestions';
import 'bootstrap/dist/css/bootstrap.min.css';
import io from 'socket.io-client'; // Import socket.io-client library
import { Client } from "@stomp/stompjs";

import { useState } from 'react';
import UpdateSuggestion from './SuggestionEntity/UpdateSuggestion';
import CreateSuggestion from './SuggestionEntity/CreateSuggestion';

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState(null);

  const handleConnect = () => {
    if (!isConnected && !client) {
      const newClient = new Client({
        brokerURL: 'ws://localhost:8080/sdi-websocket',
      });

      newClient.onConnect = () => {
        console.log('Connected');
        setIsConnected(true);
      };

      newClient.onDisconnect = () => {
        console.log('Disconnected');
        setIsConnected(false);
      };

      newClient.onWebSocketError = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      newClient.onStompError = (frame) => {
        console.error('Stomp error:', frame.headers['message']);
        setIsConnected(false);
      };

      newClient.activate();
      setClient(newClient);
    } else {
      console.log('Already connected.');
    }
  };

  // Ensure the connection is established on component mount
  useEffect(() => {
    handleConnect();

    // Clean up STOMP connection on unmount
    return () => {
      if (client && client.connected) {
        client.deactivate();
        setIsConnected(false);
      }
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/update/:id' element={<Update />} />
        <Route path='/read/:id' element={<Read />} />
        <Route path='/suggestions/:id' element={<Suggestions />} />
        <Route path='/updateSuggestion/:id' element={<UpdateSuggestion />} />
        <Route path='/createSuggestion/:id' element={<CreateSuggestion />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
