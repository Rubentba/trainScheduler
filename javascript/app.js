// Initialize Firebase
var config = {
    apiKey: "AIzaSyCaxe0eZx7b0jCfP8M02VP8h9G-uppDrG0",
    authDomain: "trainscheduler-926e7.firebaseapp.com",
    databaseURL: "https://trainscheduler-926e7.firebaseio.com",
    projectId: "trainscheduler-926e7",
    storageBucket: "trainscheduler-926e7.appspot.com",
    messagingSenderId: "1054203526657"
};

firebase.initializeApp(config);

var database = firebase.database();
    name = '',
    destination = '',
    firstTrain = '',
    frequency = 0;

$('#addTrainBtn').on("click", function(){
    event.preventDefault();

    name = $("#trainName").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().limitToLast(10).on("child_added", function(snapshot) {

    var snapVal = snapshot.val();

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    $("#newTrain").append("<tr><td>" + snapVal.name +
        "</td><td>" + snapVal.destination +
        "</td><td>" + snapVal.frequency +
        "</td><td>" + moment(nextTrain).format("hh:mm") +
        "</td><td>" + tMinutesTillTrain + "</td></tr>");


    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});

