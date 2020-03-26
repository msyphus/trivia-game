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

$(document).ready(function() {
    $("button").on("click", function() {
        randQuest = questions[Math.floor(Math.random() * questions.length)];
        $("#questionText").text(randQuest.quest);
        $("button").hide();
        answerList();
        
    })

    function answerList() {
        for(var i = 0; i < randQuest.answers.length; i++) {
            $("#answerText").append("<p>" + randQuest.answers[i] + "</p>");
                
        //var copy = [];
        //for(var i = 0; i < randQuest.answers.length; i++) {
          //  randAns = randQuest.answers[Math.floor(Math.random() * randQuest.answers.length)];
            //if(copy.includes(randAns)) { continue }
              //  copy.push(randAns);
                //$("#answerText").append("<p>" + randAns + "</p>");
            }
    };
});