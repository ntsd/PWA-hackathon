(function () {
    var lobbiesTable = document.getElementById("lobbiesTable");

    // <tr>
    //     <td>Acrylic (Transparent)</td>
    //     <td>25</td>
    //     <td>$2.90</td>
    // </tr>

    function createLobby() {
        var lobby = new Lobby();
        lobby.setName("new lobby");
        var user = new User(getCookie("uid"), getCookie("displayName"));
        lobby.addPlayer(user);
        console.log("create lobby :"+lobby.id);
        console.log(lobby);
        fbDb.child("lobbies/" + lobby.id).set(lobby);
    }

    function enterLobby() {

    }

    function deleteLobby() {

    }
    
    function updateLobby(lobby) {
        var trLobby = document.createElement("tr");
        var tdName = document.createElement("td");
        tdName.innerHTML = lobby.name;
        trLobby.appendChild(tdName);
        var tdGame = document.createElement("td");
        tdGame.innerHTML = lobby.game;
        trLobby.appendChild(tdGame);
        var tdPlayer = document.createElement("td");
        tdPlayer.innerHTML = lobby.players.length;
        trLobby.appendChild(tdPlayer);
        trLobby.onclick = function () {
            document.location = "lobby.html?id="+lobby.id;
        };
        lobbiesTable.appendChild(trLobby);
    }

    var newLobbyButton = document.getElementById("newLobbyButton");
    newLobbyButton.addEventListener("click", createLobby);

    fbDb.child("lobbies").on('child_added', function(data) {
        updateLobby(data.val());
    });
})();