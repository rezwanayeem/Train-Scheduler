// set up Firebase
var config = {
    apiKey: "AIzaSyA-O3FxaSg01KIwn6x8ggW8ZZAJOz0xjIk",
    authDomain: "trainscheduler-ad3dd.firebaseapp.com",
    databaseURL: "https://trainscheduler-ad3dd.firebaseio.com",
    projectId: "trainscheduler-ad3dd",
    storageBucket: "trainscheduler-ad3dd.appspot.com",
    messagingSenderId: "377325070580"
  };
  
// initialize firebase
firebase.initializeApp(config);

var database = firebase.database();

//display the current time
$("#currentTime").append(moment().format("hh:mm A"));

// button to add train according to user input
$("#addTrain").on("click", function () {
    event.preventDefault();

    // all user input
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = $("#firstTrainInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    // new train info
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }
    // Uploads new train to database
    firebase.database().ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    // clears all previous input
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
});

// adding trains to the database 
database.ref().on("child_added", function (childSnapshot) {

    var data = childSnapshot.val();
    var trainNames = data.name;
    var trainDestin = data.destination;
    var trainFrequency = data.frequency;
    var theFirstTrain = data.firstTrain;

    // Calculate the minutes until arrival  
    var tRemainder = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFrequency;
    var tMinutes = trainFrequency - tRemainder;

    // calculate the arrival time
    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    // Add each train's data into the table 
    $("#trainTable > tbody").append("<tr><td>" + trainNames + "</td><td>" + trainDestin + "</td><td class='min'>" + trainFrequency + "</td><td class='min'>" + tArrival + "</td><td class='min'>" + tMinutes + "</td></tr>");

});
