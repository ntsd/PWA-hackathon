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
        this.isHead = false;
        this.score = 0
    }
}

class Game{
    constructor() {
        this.id = randomString(16);
    }

    setName(name){
        this.name = name;
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

    setPlayers(players){
        this.players = players;
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

    startGame() {
    }

    setGameName(gameName){
        this.gameName = gameName;
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
}