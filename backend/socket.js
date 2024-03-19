const socketio = require("socket.io");

const initializeSocket = (server) => {
    const io = socketio(server, {
        cors: {
            origin: "https://orange-fiesta-x544j5r7p7ph6wr4-5173.app.github.dev", // Modifier en fonction de votre configuration frontend
            methods: ["GET", "POST"],
        }
    });
    /* const io = socketio(server, {
        cors: {
            origin: "http://localhost:5173", // Modifier en fonction de votre configuration frontend
            methods: ["GET", "POST"],
        }
    }); */

    const Deck = require("../backend/src/models/Deck");
    const Room = require("../backend/src/models/Room");
    const Player = require('../backend/src/models/Player');

    const rooms = [];
    let NUMBERS_OF_CARDS;
    const INTERVAL_TIME = 1000;

    io.on("connection", (socket) => {
        const userId = socket.id;
        console.log(`User ${userId} has connected.`);

         Room.getAll((err, rooms) => {
            if (err) {
                console.error(`Erreur lors de la récupération de toutes les salles :`, err);
                return;
            }
            console.log(`Toutes les salles :`, rooms);

            io.emit("rooms available", rooms)
        });

        setInterval(async () => {
            try {
                

            } catch (error) {
                console.log(error)
            }
        }, INTERVAL_TIME)

        socket.on("create room", (values) => {
            try {

                console.log("Creating a new room...", values)
                const creator = new Player(userId, values.creator)
                console.log("creator", creator)

                const room = new Room(values)
                room.addPlayer(creator)
                room.savePlayerToDatabase()
                    .then((playerId) => {
                        console.log("Joueur ajouté à la base de donnée avec succès. ID : ", playerId)
                        socket.join(room.getName())
                    })
                    .catch((error) => {
                        console.error("Erreur lors de l'enregistrement du joueur dans la base de données : ", error)
                    })
                room.createRoomToDatabase()
                    .then(() => {
                        console.log('La salle a été enregistrée dans la base de données avec succès.')
                        rooms.push(room);
                        socket.emit("room created", room)
                    })
                    .catch((error) => {
                        console.error("Erreur lors de l'enregistrement de la salle dans la base de données : ", error)
                    })
            } catch (error) {
                console.log("error", error)
            }
        })



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