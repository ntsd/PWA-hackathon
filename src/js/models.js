var User = function(uid, username) {
    this.uid = uid;
    this.username = username;
};

class Lobby {
    constructor() {
        this.id = randomString(16);
    }

    setName(name) {
        this.name = name;
    };

    setGame(game) {
        this.game = game;
    };

    setPlayers(players) {
        this.players = players;
    };

    startGame() {
    };
}