const sqlite3 = require('sqlite3').verbose();
const bataille_db = new sqlite3.Database("../bataille.db");

class Player {
    constructor(id, name) {
        this.socket_id = id
        this.name = name
        this.hand = []
    }

    addCard(card) {
        this.hand.push(card);
    }

    playCard(card) {
        const cardIndex = this.hand.findIndex((c) => c.value === card.value);
        this.hand.splice(cardIndex, 1);
    }

    static async findNamePlayer(name) {
        try {
            const row = await bataille_db.get(`SELECT * FROM Players WHERE name = ?`, [name]);
            return !!row; // Retourner true si le joueur existe, sinon false
        } catch (error) {
            console.error(`Erreur lors de la recherche du joueur ${name} dans la base de données :`, error);
            throw error;
        }
    }

    async savePlayerToDatabase() {
        try {
            const playerExists = await Player.findNamePlayer(this.name);
            if (!playerExists) {
                const result = await bataille_db.run(`INSERT INTO Players (name, socket_id) VALUES (?, ?)`, [this.name, this.socket_id]);
                console.log(`Joueur ${this.name} enregistré dans la base de données avec ID= ${result.lastID}`);
                return result.lastID;
            } else {
                console.warn("Impossible d'enregistrer ce joueur car il existe déjà.");
                return null;
            }
        } catch (error) {
            console.error(`Erreur lors de l'enregistrement du joueur ${this.name} dans la base de données :`, error);
            throw error;
        }
    }

    async updateHandInDatabase() {
        try {
            await bataille_db.run(`UPDATE Players SET hand = ? WHERE name = ?`, [JSON.stringify(this.hand), this.name]);
            console.log(`Main du joueur ${this.name} mise à jour dans la base de données.`);
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de la main du joueur ${this.name} :`, error);
            throw error;
        }
    }

    async loadHandFromDatabase() {
        try {
            const row = await bataille_db.get(`SELECT hand FROM Players WHERE name = ?`, [this.name]);
            if (row) {
                this.hand = JSON.parse(row.hand);
                console.log(`Main du joueur ${this.name} chargée depuis la base de données.`);
            } else {
                console.log(`Aucune main trouvée pour le joueur ${this.name} dans la base de données.`);
            }
        } catch (error) {
            console.error(`Erreur lors du chargement de la main du joueur ${this.name} :`, error);
            throw error;
        }
    }


}

module.exports = Player;