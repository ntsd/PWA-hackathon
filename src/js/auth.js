function signIn(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function (result) {
        setCookie("uid", result.user.uid);
        setCookie("displayName", result.user.displayName);
    }).catch(function (error) {
        console.log("Error :" + error.message)
    });
}

function signOut(){
    firebase.auth().signOut().then(function() {
        setCookie("uid", "");
        setCookie("displayName", "");
    }).catch(function(error) {
        console.log("Error :" + error.message)
    });
}

function auth() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user);
            if (getCookie("uid") != user.uid){
                signIn();
            }
        } else {
            signIn()
        }
    });
}

var signOutButton = document.getElementById("signOutButton")
signOutButton.onclick = signOut;