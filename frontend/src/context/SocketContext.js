import React from 'react';
import socketio from 'socket.io-client';

export const socket = socketio.connect('https://orange-fiesta-x544j5r7p7ph6wr4-4000.app.github.dev');
//export const socket = socketio.connect('http://localhost:4000');
console.log("socket [SocketContext]", socket)

export const SocketContext = React.createContext();