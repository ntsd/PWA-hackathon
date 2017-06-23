function signIn(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });
    firebase.auth().signInWithRedirect(provider);
    firebase.auth().getRedirectResult().then(function (result) {
        setCookie("uid", result.user.uid);
    }).catch(function (error) {
        console.log("Error :" + error.message)
    });
}

//sign-in
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