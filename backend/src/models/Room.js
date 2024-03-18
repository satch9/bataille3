const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("../bataille.db");

class Room {
    constructor(params) {
        this.name = params.roomName
        this.numCards = params.numCards
        this.players = []
        this.lastCard = null
        this.creatorName = params.creator
        this.roomId = null
    }

    addPlayer(player) {
        this.players.push(player)
        //player.room = this
    }

    getName() {
        return this.name
    }

    setRoomId(roomId) {
        this.roomId = roomId
    }

    getRoomId() {
        return this.roomId
    }

    setId(id) {
        this.id = id
    }

    getPlayerId() {
        return this.id
    }

    getPlayerByName(name) {
        return this.players.find((player) => player.name === name)
    }

    getOpponent(player) {
        return this.players.find((p) => p !== player)
    }

    async savePlayerToDatabase() {
        try {
            for (const player of this.players) {
                const result = await new Promise((resolve, reject) => {
                    db.run(`INSERT INTO Players (name, socket_id) VALUES (?, ?)`, [player.name, player.socket_id], function (err) {
                        if (err) {
                            reject(err); // Rejeter la promesse en cas d'erreur
                        } else {
                            resolve(this); // Résoudre la promesse avec le résultat de la requête
                        }
                    });
                });
                console.log(`Joueur ${player.name} enregistré dans la base de données avec l'id : ${result.lastID}`);
                this.setId(result.lastID); // Supposons que vous avez une méthode setId dans la classe Player pour définir l'ID du joueur
                return result.lastID
            }
            console.log(`Tous les joueurs enregistrés dans la base de données.`);
        } catch (error) {
            console.error(`Erreur lors de l'enregistrement des joueurs dans la base de données :`, error);
            throw error;
        }
    }


    async createRoomToDatabase() {
        try {
            const result = await new Promise((resolve, reject) => {
                db.run(`INSERT INTO Rooms (room_name, room_number_of_cards) VALUES (?, ?)`, [this.name, this.numCards], function (err) {
                    if (err) {
                        reject(err); // Rejeter la promesse en cas d'erreur
                    } else {
                        resolve(this); // Résoudre la promesse avec le résultat de la requête
                    }
                });
            });
            console.log("result createRoomToDatabase", result.lastID)
            console.log(`Room ${this.name} enregistré dans la base de données avec l'id : ${result.lsatID}.`);
            this.setRoomId(result.lastID);
            await this.createGame(); // Attendre la création du jeu après avoir créé la salle
        } catch (error) {
            console.error(`Erreur lors de l'enregistrement de la room ${this.name} dans la base de données :`, error);
            throw error;
        }
    }

    async createGame() {
        try {
            const game_start_date = new Date().toISOString();
            const room_id = this.getRoomId();
            console.log("room_id createGame", room_id);

            const result = await new Promise((resolve, reject) => {
                db.run(`INSERT INTO Game (game_room_id, game_start_date) VALUES (?, ?)`, [room_id, game_start_date], function (err) {
                    if (err) {
                        reject(err); // Rejeter la promesse en cas d'erreur
                    } else {
                        resolve(this); // Résoudre la promesse avec le résultat de la requête
                    }
                });
            });

            console.log(`Game créé dans la base de données.`);
            const gameId = result.lastID;
            console.log("gameId", gameId)
            await this.addPlayersToGame(gameId); // Attendre l'ajout des joueurs au jeu après la création du jeu
        } catch (error) {
            console.error(`Erreur lors de l'enregistrement de game dans la base de données :`, error);
            throw error;
        }
    }

    async addPlayersToGame(gameId) {
        try {
            for (const player of this.players) {
                console.log("player addplayerstogame", this.players)
                console.log("player addplayerstogame", player)
                const result = await new Promise((resolve, reject) => {
                    db.run(`INSERT INTO Game_Players (game_id, player_id) VALUES (?,?)`, [gameId, this.getPlayerId()], function (err) {
                        if (err) {
                            reject(err); // Rejeter la promesse en cas d'erreur
                        } else {
                            resolve(this); // Résoudre la promesse avec le résultat de la requête
                        }
                    });
                });
                console.log("addPlayer: ", result);

            }
            console.log(`Joueurs ajoutés au jeu dans la base de données.`);
        } catch (error) {
            console.error(`Erreur lors de l'ajout des joueurs au jeu dans la base de données :`, error);
            throw error;
        }
    }

    static getById(id, callback) {
        const sql = `SELECT * FROM rooms WHERE id = ?`
        db.get(sql, [id], function (err, row) {
            if (err) return callback(err)
            if (!row) return callback(null, null)
            const room = new Room(row.id, row.name, row.num_cards)
            callback(null, room);
        });
    }
}

module.exports = Room;