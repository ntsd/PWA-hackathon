(function () {
    var lobbiesTable = document.getElementById("lobbiesTable");

    function createLobby() {
        var lobby = new Lobby();
        lobby.setName(getCookie("displayName")+" lobby");
        lobby.setGame("hangman");
        lobby.setMinPlayer();
        lobby.setMaxPlayer();
        lobby.setEndPoint();
        fbDb.child("lobbies/" + lobby.id).set(lobby);
        document.location = "lobby.html?id="+lobby.id;
    }

    function exitLobby() {
    }
    
    function addLobbyElement(lobby) {
        var trLobby = document.createElement("tr");
        trLobby.id = "lobby-"+lobby.id;
        var tdName = document.createElement("td");
        tdName.innerHTML = lobby.name;
        trLobby.appendChild(tdName);
        var tdGame = document.createElement("td");
        tdGame.innerHTML = lobby.game;
        trLobby.appendChild(tdGame);
        var tdPlayer = document.createElement("td");
        try{
            tdPlayer.innerHTML = Object.keys(lobby.players).length;
        }catch(e){
            tdPlayer.innerHTML = 0
        }
        tdPlayer.id = "tdPlayersNumber";
        trLobby.appendChild(tdPlayer);
        trLobby.onclick = function () {
            document.location = "lobby.html?id="+lobby.id;
            // var w = window.open('lobby.html?id='+lobby.id, "Lobby-"+lobby.id, "");
            // w.onbeforeunload = function(){
            //     console.log("exit "+'lobby.html?id='+lobby.id);
            // };
        };
        lobbiesTable.appendChild(trLobby);
    }
    function removeLobbyElement(lobbyKey) {
        document.getElementById("lobby-"+lobbyKey).remove();
    }

    var newLobbyButton = document.getElementById("newLobbyButton");
    newLobbyButton.addEventListener("click", createLobby);

    fbDb.child("lobbies").on('child_added', function(data) {
        addLobbyElement(data.val());
    });

    fbDb.child("lobbies").on('child_removed', function(data) {
        removeLobbyElement(data.key);
    });

    fbDb.child("lobbies").on('child_changed', function(data) {
        if(data.val().players){
            if(!data.val().players){
                var tdPlayers = document.getElementById("lobby-"+data.key).getElementsByTagName("td")[2];
                tdPlayers.innerHTML = 0;
            }else {
                var tdPlayers = document.getElementById("lobby-"+data.key).getElementsByTagName("td")[2];
                tdPlayers.innerHTML = Object.keys(data.val().players).length;
            }
        }
    });
})();