var User = function(uid, displayName) {
    this.uid = uid;
    this.displayName = displayName;
};

class Lobby {
    constructor() {
        this.id = randomString(16);
        this.players = [];
    }

    setName(name) {
        this.name = name;
    }

    setGame(game) {
        this.game = game;
    }

    addPlayer(user) {
        this.players.push(user);
    }

    removePlayer(user) {
        this.players = this.players.filter(item => item.uid !== user.uid);
    }

    checkPlayer(){

    }

    startGame() {
    }
}