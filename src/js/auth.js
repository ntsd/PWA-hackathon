function signIn(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });
    firebase.auth().signInWithRedirect(provider);
}

function signOut(){
    firebase.auth().signOut().then(function() {
        setCookie("uid", "");
        setCookie("displayName", "");
    }).catch(function(error) {
        console.log("Error :" + error.message)
    });
    location.reload();
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

function getUser() {
    if(getCookie("uid") == ""){
        var randUser = randomString(6);
        setCookie("uid", randUser);
        setCookie("displayName", "Guest-"+randUser);
        return new User(randUser, "Guest-"+randUser);
    }
    else{
        return new User(getCookie("uid"), getCookie("displayName"));
    }
}

function setAuthElements() {
    var signOutButton = document.getElementById("signOutButton");
    signOutButton.onclick = signOut;

    var signInButton = document.getElementById("signInButton");
    signInButton.onclick = signIn;

    var myUser = getUser();
    console.log(myUser);
    var displayNameNav = document.getElementById("displayNameNav");
    displayNameNav.innerHTML = myUser.displayName;

    if(myUser.uid == ""){
        signOutButton.style.display = 'none';
        signInButton.style.display = '';
    }else{
        signInButton.style.display = 'none';
        signOutButton.style.display = '';
    }
}

firebase.auth().getRedirectResult().then(function (result) {
    setCookie("uid", result.user.uid);
    setCookie("displayName", result.user.displayName);
    setAuthElements()
}).catch(function (error) {
    setAuthElements()
});