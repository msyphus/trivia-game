var questions = [
    {
        quest: "What is the main reason companies fail when implementing changes?",
        answers: ["Lack of training", "Lack of resources (money, time, etc.)", "Poor employees", "Failure to create the right work culture"],
        correct: "Failure to create the right work culture",
        explain: "It is common to blame circumstances or people when failure occurs, but failure to create an appropriate work culture is a root \
                 problem that creates unfavorable circumstances.",
        source: "Reference:  \"How You Are Killing Your Lean Program and Don\'t Know it.\" Mark Syphus, 2019."
    },
    {
        quest: "What is the most critical customer feedback to investigate?",
        answers: ["Complaints", "Compliments", "Saying everything is \"Just fine\"", "Silence"],
        correct: "Saying everything is \"Just fine\"",
        explain: "If a customer tells you this, they either don\'t trust that telling you will do any good or they have already decided to go \
                 elsewhere so they don't care to give you feedback.",
        source: "Reference: \"Raving Fans.\" Ken Blanchard and Sheldon Bowles, 1993."
    },
    {
        quest: "To have a successful business, you should set a goal to have satisfied customers.",
        answers: ["True", "False"],
        correct: "False",
        explain: "Having satisfied customers is a low target that won't create customer loyalty.  For long-term success, you need to create fans!",
        source: "Reference: \"Raving Fans.\" Ken Blanchard and Sheldon Bowles, 1993."
    },
    {
        quest: "What is the first thing you should do to inspire people to excel in their work?",
        answers: ["Show the importance of what they do", "Give them autonomy to do their work and show you trust their judgment", "Give them timely, sincere praise", "Give them a financial incentive to hit a target"],
        correct: "Show the importance of what they do",
        explain: "If people don't understand the importance of what they do, they will not be motivated enough to excel in difficult conditions.  The other \
                 options are also important, but they have to be built on a foundation of understanding why the work being done is important.",
        source: "Reference: \"Gung Ho.\" Ken Blanchard and Sheldon Bowles, 1998."
    }
];

var randQuest;
var chosenAns;
var correct = 0;
var incorrect = 0;
var time = 5;
var timeInterval;
var timeRunning = false;
var i = 0;
var score;

$(document).ready(function() {
    $("button").on("click", function() {
        randQuest = questions.sort(function (a, b) {
            return 0.5 - Math.random();
        })      
        newQuestion();
        $(".startButton").hide();
    });

    function newQuestion() {
        $("#questionText").text(randQuest[i].quest);
        answerList();
        startTimer();
    };

    function answerList() {
        $("#answerText").empty();
        $("#explanation").empty();
        $("#reference").empty();
        var sorted = randQuest[i].answers.sort(function (a, b) {
            return 0.5 - Math.random();
        });
        for(var j = 0; j < randQuest[i].answers.length; j++) {
            $("#answerText").append("<button class='btn btn-info btn-block userChoice'>" + sorted[j] + "</button>");
        }
    };

    function startTimer() {
        if(timeRunning === false) {
            timeRunning = true;
            timeInterval = setInterval(timerCount, 1000);
        }
    };

    function stopTimer() {
        if(timeRunning === true) {
            clearInterval(timeInterval);
            timeRunning = false;
            time = 5;
        }
    };

    function timerCount () {
        $("#timer").text("0:0" + time);
        if (time > 0) {
            time--;
        } else if (i < randQuest.length -1) {
            stopTimer();
            incorrect++;
            i++;
            newQuestion();
        } else {
            incorrect++;
            endQuiz();
        }
    };

    $(this).on("click", ".userChoice", function(event) {
        chosenAns = event.currentTarget.innerText;
        if(i < randQuest.length - 1) {
            stopTimer();
            checkAnswer();
            i++;
            setTimeout(newQuestion, 10000);
        } else {
            checkAnswer();
            console.log("hello");
            setTimeout(endQuiz, 10000);
        }
    });

    function checkAnswer() {
        if(chosenAns === randQuest[i].correct) {
            correct++;
            $("#explanation").text(randQuest[i].explain);
            $("#reference").text(randQuest[i].source);
        } else {
            incorrect++;
            $("#explanation").text("Sorry!  That's not the best answer.");
        }
    };

    function endQuiz() {
        stopTimer();
        setTimeout(function() {
            score = (correct / (correct +incorrect) * 100);
            var correctAnswers = $("<p>").html("Correct Answers: " + correct);
            var incorrectAnswers = $("<p>").text("Incorrect Answers: " + incorrect);
            $("#questionText").text("You scored " + score + "%")
            $("#answerText").empty();
            $("#answerText").append(correctAnswers, incorrectAnswers);
            $("#explanation").empty();
            $("#reference").empty();
            $("#timer").empty();
        }, 3000);
    }; 
});