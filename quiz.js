$(document).ready(function() {

    // using jquery for onclick to start questions and timer
$("#start-quiz").on("click", function(beginQuiz) {
    // hide the starting div
    $("#start").hide();
    // show the questions div by removing the style attribute which hides it
    $("#questions").show();
    // set the counterId variable with setInterval to run the "countdown" at 1sec
    counterId = setInterval(countdown, 1000);
    // replace the html time (of "0") using text with the time var (which is questions.length * 10sec)
    $("#time-counter").text(time);
    startQuestions();
  });


var questionIndex = 0

// questions array
let questions = [
    {
        question : "Was choosing to write this quiz using JQuery after just one class in JQuery a good idea?",
        options : ["Yes", "No", "Maybe"],
        answer : "No"
    },
    {
        question : "Is this CSS beautiful?",
        options : ["Yes", "No", "Maybe"],
        answer : "Maybe"
    },
    {
        question : "Did I learn a lot making this?",
        options : ["Yes", "No", "Maybe"],
        answer : "Yes"
    }
];


function startQuestions() {
//    setup the questions to run through (index)
var questionOn = questions[questionIndex]
//  replace question id in html with text from current question index's question :)
 $("#question").text(questionOn.question);

$("#options").html("")
// answer options
// function that loops through "options"
    $(questionOn.options).each(function(options, i) {
    // create button
        var optionButton = document.createElement("button");
        // sets class
        $(optionButton).addClass("options");
        // sets value
        optionButton.setAttribute("value", (i));
        // adds button text
        $(optionButton).text(i);
        // appends button to div
        $("#options").append(optionButton)
        // assigns click function
        $(optionButton).on("click", click)
 })
}



// function for button click
function click() {
    console.log(questions[questionIndex].answer)
    console.log(this.value)
if(this.value !== questions[questionIndex].answer) {
    time -= 5;

    if (time < 0) {
        time = 0;
      }
}

$("#time-counter").text(time);

questionIndex++;
if(questionIndex === questions.length) {
    finish();
} else {
startQuestions();
}}

// Variables
// to setup counter & countdown

// sets the time relative to the number of questions
var time = questions.length * 10
// set questions to start



// function to reduce time - sits in the interval function 
// allows finish screen to popup with score if time goes = zero
function countdown(){
    time--;
    // replace the html with the new time
    $("#time-counter").text(time)
    if(time <= 0) {
        // cease timer
        clearInterval(counterId);
        // show finished screen
        $("#finished").removeAttr("style")
        // update final score with current time
        $("#final-score").text(time)
    }
}

function finish(){
    $("#container").hide()
    $("#finished").show()
    $("#final-score").text(time)
    clearInterval(counterId)
}

function scores(){
    var initials = $("#initials").val()
    if (initials !== "") {
    var thisScore = {
        score: time, initials: initials 

    }
    console.log(thisScore)
  
    var highscore = JSON.parse(window.localStorage.getItem("highscores")) || [];
    highscore.push(thisScore)
    window.localStorage.setItem("highscores", JSON.stringify(highscore))
   

    window.location.href = "highscores.html"
    }}

$("#submit").on("click", scores)
})


