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

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
});

database.ref().limitToLast(10).on("child_added", function(snapshot) {
    
    var snapVal = snapshot.val(),
        firstTimeConverted = moment(snapVal.firstTrain, "HH:mm").subtract(1, "years"),
   
        diffTime = moment().diff(moment(firstTimeConverted), "minutes"),
        tRemainder = diffTime % snapVal.frequency,
        tMinutesTillTrain = snapVal.frequency - tRemainder,
        nextTrain = Math.abs(moment().add(tMinutesTillTrain, "minutes"));

        
    $("#newTrain").append("<tr><td>" + snapVal.name +
        "</td><td>" + snapVal.destination +
        "</td><td>" + snapVal.frequency +
        "</td><td>" + moment(nextTrain).format("hh:mm") +
        "</td><td>" + tMinutesTillTrain + "</td></tr>");

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
});

