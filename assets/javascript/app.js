var questions = [
    {
        quest: "What is the main reason companies fail when implementing changes?",
        answers: ["Lack of training", "Lack of resources (money, time, etc.)", "Poor employees", "Failure to create the right work culture"],
        correct: "Failure to create the right work culture",
        explain: "Correct! It is common to blame circumstances or people when failure occurs, but failure to create an appropriate work culture is a root \
                 problem that creates unfavorable circumstances.",
        source: "For more information:  \"How You Are Killing Your Lean Program and Don\'t Know it.\" Mark Syphus, 2019."
    },
    {
        quest: "What is the most critical customer feedback to investigate?",
        answers: ["Complaints", "Compliments", "Saying everything is \"Just fine\"", "Silence"],
        correct: "Saying everything is \"Just fine\"",
        explain: "Correct! If customers tell you this, they either don\'t trust that you'll do anything about their feedback or they don't care to give it to you. \
                 Is it because they have already decided to go elsewhere? Is it because they are not loyal? You'll never know if you don't investigate!",
        source: "For more information: \"Raving Fans.\" Ken Blanchard and Sheldon Bowles, 1993."
    },
    {
        quest: "To have a successful business, you should set a goal to have satisfied customers.",
        answers: ["True", "False"],
        correct: "False",
        explain: "Correct! Having satisfied customers is a low target that won't create customer loyalty.  For long-term success, you need to create fans!",
        source: "For more information: \"Raving Fans.\" Ken Blanchard and Sheldon Bowles, 1993."
    },
    {
        quest: "What is the first thing you should do to inspire people to excel in their work?",
        answers: ["Show the importance of what they do", "Give them autonomy to do their work and show you trust their judgment", "Give them timely, sincere praise", "Give them a financial incentive to hit a target"],
        correct: "Show the importance of what they do",
        explain: "Correct! If people don't understand the importance of what they do, they will not be motivated enough to excel in difficult conditions.  The other \
                 options are also important, but they have to be built on a foundation of understanding why the work being done is important.",
        source: "For more information: \"Gung Ho.\" Ken Blanchard and Sheldon Bowles, 1998."
    },
    {
        quest: "You create a KPI for customer satisfaction based off of customer reviews, complaints, and surveys that you review each month.  Is this a good strategy?",
        answers: ["Yes", "No", "Depends on the business, market, or culture"],
        correct: "No",
        explain: "Correct! Although this is a well-rounded approach for customer feedback, it does not consider leading indicators and the review interval is too long. \
                 By the time you know there's a problem, it's already too late!",
        source:  "For more information: \"When Leaders Torture Their Employees.\" Daniel Markovitz, 2020."
    },
    {
        quest: "It is best to avoid having fun in the workplace so you can maintain a professional atmosphere.",
        answers: ["True", "False"],
        correct: "False",
        explain: "Correct! Creating a fun environment is a great way to boost results as long as it is controlled.",
        source: "For more information: \"FISH! A Proven Way to Boost Morale and Improve Results\" Stephen C. Lundin, Harry Paul, and John Christensen, 2000."
    },
    {
        quest: "A successful manager:",
        answers: ["Achieves results", "Builds good relationships with subordinates", "Strikes a balance between results and relationships"],
        correct: "Strikes a balance between results and relationships",
        explain: "Correct! There are two kinds of bad managers: One who gets results but is hated by subordinates and one who is loved by subordinates but can't achieve good business results. \
                 The challenge to being a good manager is to find the balance between the two.",
        source: "For more information: \"The New One Minute Manager.\" Ken Blanchard and Spencer Johnson, 2015."
    }
];

var randQuest;
var chosenAns;
var correct = 0;
var incorrect = 0;
var time = 30;
var timeInterval;
var timeRunning = false;
var i = 0;
var score;
var convertedTime;

$(document).ready(function() {    
    $("#nextBtn, #continueBtn").hide();
    $(".clock").hide();

    $("#startBtn").on("click", function() {
        randQuest = questions.sort(function (a, b) {
            return 0.5 - Math.random();
        });      
        newQuestion();
        $("#startBtn").hide();
        $(".clock").show();
    });

    function newQuestion() {
        time = 30;
        convertedTime = timeConvert(time);
        $("#timer").text(convertedTime);
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
            $(".btn").off("click", false);
            time--; //prevents 1 second delay of the first timerCount interval
            timeInterval = setInterval(timerCount, 1000);
        }
    };

    function stopTimer() {
        if(timeRunning === true) {
            $(".btn").on("click", false);
            clearInterval(timeInterval);
            timeRunning = false;
        }
    };

    function timerCount () {
        convertedTime = timeConvert(time);
        $("#timer").text(convertedTime);
        if (time > 0) {
            time--;
        } else if (i < randQuest.length -1) {
            stopTimer();
            incorrect++;
            i++;
            $("#explanation").text("Time's Up");
            $("#nextBtn").show();
        } else {
            stopTimer();
            incorrect++;
            $("#explanation").text("Time's Up");
            $("#continueBtn").show();
        }
    };

    function timeConvert () {
        if (time < 10) {
            time = "0" + time;
        }
        return "0:"+ time;
    };

    $(this).on("click", ".userChoice", function(event) {
        chosenAns = event.currentTarget.innerText;
        if(i < randQuest.length - 1) {
            checkAnswer();
            i++;
        } else {
            checkAnswer();
        }
    });

    function checkAnswer() {
        stopTimer();
        if(chosenAns === randQuest[i].correct) {
            correct++;
            $("#explanation").text(randQuest[i].explain);
            $("#reference").text(randQuest[i].source);
            if( i < randQuest.length -1) {
                $("#nextBtn").show();
            } else {
                $("#continueBtn").show();
            }
        } else {
            incorrect++;
            $("#explanation").text("Sorry!  That's not the best answer.");
            if( i < randQuest.length -1) {
                $("#nextBtn").show();
            } else {
                $("#continueBtn").show();
            }
        }
    };

    function endQuiz() {
        score = Math.round((correct / (correct + incorrect)) * 100);
        var correctAnswers = $("<p>").html("Correct Answers: " + correct);
        var incorrectAnswers = $("<p>").text("Incorrect Answers: " + incorrect);
        $("#questionText").text("You scored " + score + "%")
        $("#answerText").empty();
        $("#answerText").append(correctAnswers, incorrectAnswers);
        $("#explanation").empty();
        $("#reference").empty();
        $("#timer").empty();
        $("#explanation").html("<button class='btn btn-info retake'>" + "Retake Quiz" + "</button>");
        $(".retake").on("click", restart);
    }; 

    $("#nextBtn").on("click", function() {
        newQuestion();
        $("#nextBtn").hide();
    });

    $("#continueBtn").on("click", function() {
        endQuiz();
        $("#continueBtn").hide();
    });

    function restart () {
        $("#questionText").empty();
        $("#answerText").empty();
        $("#explanation").empty();
        i = 0;
        correct = 0;
        incorrect = 0;
        randQuest = questions.sort(function (a, b) {
            return 0.5 - Math.random();
        })      
        newQuestion();
    };
});
