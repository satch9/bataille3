-- SQLite
CREATE TABLE Players (
    id INTEGER PRIMARY KEY,
    name TEXT,
    score INTEGER DEFAULT 0,
    hand TEXT,
    socket_id  TEXT
);

CREATE TABLE Game (
    game_id INTEGER PRIMARY KEY,
    game_room_id INTEGER,
    game_current_player INTEGER,
    game_start_date TEXT,
    game_end_date TEXT,
    game_winner_id INTEGER,
    FOREIGN KEY(game_room_id) REFERENCES Rooms(id)
);

CREATE TABLE Rooms (
    room_id INTEGER PRIMARY KEY,
    room_name TEXT,
    room_creator TEXT,
    room_createdAt  DATETIME DEFAULT CURRENT_TIMESTAMP,
    room_number_of_cards INTEGER
);

CREATE TABLE Game_Players (
    id INTEGER PRIMARY KEY,
    game_id INTEGER,
    player_id INTEGER,
    FOREIGN KEY(game_id) REFERENCES Game(game_id),
    FOREIGN KEY(player_id) REFERENCES Players(id)
);

DROP TABLE Players;
DROP TABLE Game;
DROP TABLE Game_Players;
DROP TABLE Rooms;

DELETE FROM Rooms WHERE room_id in(1,2,3);
DELETE FROM Players WHERE id in(1,2,3);
DELETE FROM Game WHERE game_id in(1,2,3);
DELETE FROM Game_Players WHERE id in(1,2,3);

SELECT 
    r.room_id AS room_id,
    r.room_name AS room_name,
    r.room_number_of_cards AS room_number_of_cards, 
    p.name AS player,
    p.hand AS hand
FROM Rooms r 
LEFT JOIN Game_Players gp ON r.room_id = gp.id 
LEFT JOIN Players p ON gp.player_id = p.id 
LEFT JOIN Game g ON gp.id = g.game_id 
GROUP BY r.room_id, g.game_id 
ORDER BY r.room_id ASC; 