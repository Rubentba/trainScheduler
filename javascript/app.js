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

    database.ref().on("child_added", function(snapshot) {

        var snapVal = snapshot.val();
  

        console.log(snapVal.name);
        console.log(snapVal.destination);
        console.log(snapVal.firstTrain);
        console.log(snapVal.frequency);

        $("#trainNameDisplay").text(snapVal.name);
        $("#destinationDisplay").text(snapVal.destination);
        $("#firstTrainDisplay").text(snapVal.firstTrain);
        $("#frequancyDisplay").text(snapVal.frequency);
  

      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

})

