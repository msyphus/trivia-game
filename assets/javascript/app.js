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
var i = 0;

$(document).ready(function() {
    $("button").on("click", function() {
        randQuest = questions.sort(function (a, b) {
            return 0.5 - Math.random();
        })      
        newQuestion();
        $(".startButton").hide();
    });

    function newQuestion() {
        console.log('begin', i);
        $("#questionText").text(randQuest[i].quest);
        answerList();
        //startTimer();
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

    $(this).on("click", ".userChoice", function(event) {
        chosenAns = event.currentTarget.innerText;
        if(i < randQuest.length - 1) {
            if(chosenAns === randQuest[i].correct) {
                correct++;
            } else {
                incorrect++;
            }
            i++;
            newQuestion();
        } else {
            $("#questionText").empty();
            $("#answerText").empty();
        }
        console.log(i);
        //setTimeout(startQuiz, 1000);
    });

    function timerCount () {
        time--;
        var convertedTime = timeConvert(time);
        $("#timer").text(convertedTime);
        if(time === 0) {
            newQuestion();
            incorrect++;
            time = 5;
        }
    }

    function startTimer () {
        timeInterval = setInterval(timerCount, 1000);
    }

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