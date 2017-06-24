(function () {
    auth()

    var newLobbyButton = document.getElementById("newLobbyButton");

    var createLobby = function () {
        var lobby = new Lobby();
        lobby.setName("new game");
        var user = new User(getCookie("uid"), getCookie("username"));
        console.log(user);
        var fbLobby = fbDb.child("lobbies/" + lobby.id);
        fbLobby.child("players").set([
            user
        ]);
    }

    newLobbyButton.addEventListener("click", createLobby);

    function enterLobby() {

    }

    function deleteLobby() {

    }
})();
