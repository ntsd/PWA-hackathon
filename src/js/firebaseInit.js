var config = {
    apiKey: "AIzaSyD2LFUsEm4D3VQFLl4hCCYzzZPxptUUBZM",
    authDomain: "active-reminder.firebaseapp.com",
    databaseURL: "https://active-reminder.firebaseio.com/",
    storageBucket: "active-reminder.appspot.com/"
};
firebase.initializeApp(config);
var fbDb = firebase.database().ref("data");
