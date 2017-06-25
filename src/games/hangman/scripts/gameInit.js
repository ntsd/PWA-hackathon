var lobbyId = gup('id');
var playersRef = fbDb.child("games/" + lobbyId + "/players");
var gamesRef = fbDb.child("games/" + lobbyId);

var lettersPickedRef = gamesRef.child("letterPicked");
var wordRef = gamesRef.child("word");

function playerInLobby() {
    playersRef.once('value', function(snapshot) {
        if (!snapshot.hasChild(thisUser.id)) {
            alert('Your not in this lobby');
            document.location = "/";
        }
    });
}

playerInLobby();

function pickLetter(letter) {
    lettersPickedRef.push(letter)
}

// window.addEventListener("beforeunload", function (e) {
//     if(1){//!gameStarted){
//         var count = 0;
//         playersRef.on("child_added", function(snapshot) {
//             count++;
//         });
//         if(count <= 1){
//             gamesRef.remove();
//         }else {
//             playersRef.child(thisPlayer.id).remove();
//         }
//     }
// });


