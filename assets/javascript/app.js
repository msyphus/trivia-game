var questions = [
    {
        quest: "What is the main reason companies fail when implementing changes?",
        answers: ["Lack of training", "Lack of resources (money, time, etc.)", "Poor employees", "Failure to create the right work culture"],
        correct: "Failure to create the right work culture"
    },
    {
        quest: "What is the most critical customer feedback to investigate?",
        answers: ["Complaints", "Compliments", "Saying everything is Just fine", "Silence"],
        correct: "Silence"
    },
    {
        quest: "To have a successful business, you should set a goal to have satisfied customers.",
        answers: ["True", "False"],
        correct: "False"
    },
    {
        quest: "What is the first thing you should do to inspire people to excel in their work?",
        answers: ["Show the importance of what they do", "Give them autonomy to do their work and show you trust their judgment", "Give them timely, sincere praise", "Give them a financial incentive to hit a target"],
        correct: "Show the importance of what they do"
    }
];

var randQuest;
var randAns;
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
        var sorted = randQuest[i].answers.sort(function (a, b) {
            return 0.5 - Math.random();
        });
        for(var j = 0; j < randQuest[i].answers.length; j++) {
       $("#answerText").append("<button class='btn btn-info btn-block userChoice'>" + sorted[j] + "</button>");
        }
    };

    function endQuiz() {
        setTimeout(function() {
            if(chosenAns === randQuest[i].correct) {
                correct++;
            } else {
                incorrect++;
            }
            score = correct / (correct +incorrect);
            var correctAnswers = $("<p>").text("Correct Answers: " + correct);
            var incorrectAnswers = $("<p>").text("Incorrect Answers: " + incorrect);
            $("#questionText").text("You scored " + score + "%")
            $("#answerText").empty();
            $("#answerText").append(correctAnswers, incorrectAnswers);
            stopTimer();
            $("#timer").empty();
        }, 1000);
    };

    $(this).on("click", ".userChoice", function(event) {
        chosenAns = event.currentTarget.innerText;
        if(i < randQuest.length - 1) {
            if(chosenAns === randQuest[i].correct) {
                correct++;
            } else {
                incorrect++;
            }
            i++;
            setTimeout(newQuestion, 1000);
        } else {
            endQuiz();
        }
    });

    function timerCount () {
        if(time > 0) {
        time--;
        var convertedTime = timeConvert(time);
        $("#timer").text(convertedTime);
        } else if (time === 0 && i < randQuest.length -1) {
            stopTimer();
            incorrect++;
            i++;
            newQuestion();
        } else {
            endQuiz();
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

    function timeConvert (t) {
        minutes = Math.floor(t / 60);
        seconds = t - (minutes * 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (minutes === 0) {
            minutes = "0";
        }
        return minutes + ":" + seconds;
    }; 
});