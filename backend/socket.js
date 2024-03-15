const socketio = require("socket.io");

const initializeSocket = (server)=>{
    const io = socketio(server, {
        cors: {
            origin: "https://orange-fiesta-x544j5r7p7ph6wr4-5173.app.github.dev", // Modifier en fonction de votre configuration frontend
            methods: ["GET", "POST"],
        }
    });

    const Deck = require("../backend/src/models/Deck");
    const Room = require("../backend/src/models/Room");
    const Player = require('../backend/src/models/Player');

    const rooms = [];
    let NUMBERS_OF_CARDS;

    io.on("connection", (socket)=>{
        const userId = socket.id;
        console.log(`User ${userId} has connected.`);



        // Handle user disconnection
        socket.on("disconnect", () => {
            console.log(`User ${userId} has disconnected.`);
            // Supprimer l'utilisateur des salles et effectuer tout nettoyage nécessaire
            for (let room of rooms) {
                room.players = room.players.filter((player) => player.id !== socket.id);
                io.to(room.name).emit("playerLeft", { playerId: socket.id, players: room.players });
            }
        });
    })
}

module.exports = initializeSocket;