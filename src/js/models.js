// var User = function(id, displayName) {
//     this.id = id;
//     this.displayName = displayName;
// };
class User{
    constructor(id, displayName) {
        this.id = id;
        this.displayName = displayName;
    }
}

class Player{
    constructor(id, displayName) {
        this.id = id;
        this.displayName = displayName;
        this.ready = false;
        this.isHead = false
    }
}

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

    setMinPlayer(minPlayer){
        this.minPlayer = minPlayer
    }

    setMaxPlayer(maxPlayer){
        this.maxPlayer = maxPlayer
    }

    setEndPoint(endPoint){
        this.endPoint = endPoint
    }

    startGame() {
    }
}