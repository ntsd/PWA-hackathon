(function () {
    'use strict';
    var players = [];
    var thisPlayer;
    var lobbyId = gup('id');
    var playerGrid = document.getElementById("player-grid");
    var playersRef = fbDb.child("lobbies/" + lobbyId + "/players");

    function updateElements() {
        for(var i=0;i<players.length;i++){

            console.log(players[i]);
            var playerCard = document.getElementById("player-card-" + i);
            playerCard.innerHTML = "<h2>"+players[i].displayName+"</h2>";
        }
    }



    function updatePlayer(player) {
        var playerCard = document.getElementById("player-"+player.id);
        if(player.ready == true){
            playerCard.className = playerCard.className.replace('player-card-off', 'player-card-on');
        }else {
            playerCard.className = playerCard.className.replace('player-card-on', 'player-card-off');
        }
        var allPlayerCard = document.getElementsByClassName("player-card");
        var len = allPlayerCard.length;
        var count = 0;
        [].forEach.call(allPlayerCard, function (playerCard) {
            count += /player-card-on/.test(playerCard.className);
        });
        if(count == len){
            console.log("game start")
        }
    }

    function addPlayer(player) {
        players.push(player);
        var playerCard = document.createElement("div");
        playerCard.className = "player-card mdl-cell mdl-cell--6-col player-card-off mdl-card__title-text mdl-color-text--white";
        playerCard.id = "player-"+player.id;
        playerCard.innerHTML = player.displayName;
        console.log(player.displayName);
        playerGrid.appendChild(playerCard)
    }
    
    function removePlayer(player) {
        players = players.filter(function(item) {
            return item !== player
        });
        document.getElementById("player-"+player.id).remove();
    }
    
    function ready() {
        playersRef.child(thisPlayer.id+"/ready").set(true);
    }

    function notReady() {
        playersRef.child(thisPlayer.id+"/ready").set(false);
    }

    function enterRoom() {
        thisPlayer = new Player(getCookie("uid")+"ttt", getCookie("displayName"));
        playersRef.child(thisPlayer.id).set(thisPlayer);
    }

    enterRoom();

    fbDb.child("lobbies/" + lobbyId+"/players").on('child_added', function (data) {
        addPlayer(data.val())
    });

    fbDb.child("lobbies/" + lobbyId+"/players").on('child_removed', function (data) {
        removePlayer(data.val())
    });

    fbDb.child("lobbies/" + lobbyId+"/players").on('child_changed', function (data) {
        updatePlayer(data.val())
    });

    window.addEventListener("beforeunload", function (e) {
        var count = 0;
        playersRef.on("child_added", function(snapshot) {
            count++;
        });
        if(count <= 1){
            fbDb.child("lobbies/" + lobbyId).remove();
        }else {
            playersRef.child(thisPlayer.id).remove();
        }
    });

    var readyButton = document.getElementById("ready-button");
    var dialog = document.querySelector('dialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    readyButton.addEventListener('click', function() {
        ready();
        dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
        notReady();
        dialog.close();
    });

    document.getElementById("exit-button").onclick = function () {
        // window.close();
        document.location = "index.html";
    }
})();