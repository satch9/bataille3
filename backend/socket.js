const socketio = require("socket.io");

const initializeSocket = (server)=>{
    const io = socketio(server, {
        cors: {
            origin: "https://orange-fiesta-x544j5r7p7ph6wr4-5173.app.github.dev", // Modifier en fonction de votre configuration frontend
            methods: ["GET", "POST"],
        }
    });

    io.on("connection", (socket)=>{
        const userId = socket.id;
        console.log(`User ${userId} has connected.`);
    })
}

module.exports = initializeSocket;