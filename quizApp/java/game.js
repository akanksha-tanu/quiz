const ques=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choicetext"));
var currentQues={};
var acceptingans=true;
var score=0;
var quescounter=0;
var availableques=[];
const loader=document.getElementById("load");
const game=document.getElementById("game");

let questions=[];

//fetching ques from json file

/*fetch("questions.json").then(function(res){
    return res.json();
}).then(function(loadedQuestion){
    questions=loadedQuestion;
    startGame();
})
.catch(function(err){
    console.log(err);
});*/



// loading ques from open trivia database

/*https://opentdb.com/api.php?amount=45&category=17&difficulty=easy&type=multiple*/



fetch("questions.json")
    .then(function(res){
        return res.json();
    })
    .then(loadedQuestions => {

        questions=loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion={
                ques : loadedQuestion.question
            };


            const answerChoices=[... loadedQuestion.incorrect_answers];
            formattedQuestion.ans=Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(formattedQuestion.ans - 1,0,loadedQuestion.correct_answer);


            answerChoices.forEach(function(choice,index){
                formattedQuestion["choice" + (index + 1)]=choice;
            });

            return formattedQuestion;
        });
        
        startGame();
    })
    .catch(function(err){
        console.log(err);
    });


var quescountertext=document.getElementById("quescount");
var scoretext=document.getElementById("score");

var progressbarfull=document.getElementById("progressbarfull");

//constants
const correctbonus=10;
const maxques=10;


function startGame(){
    quescounter=0;
    score=0;
    availableques=[...questions];
    setTimeout(function(){
        getNewQuestion();
        game.classList.remove("hidden");
        loader.classList.add("hidden");
    },1500);
};
function getNewQuestion(){

    if(availableques.length==0 || quescounter>=maxques)
    {
        localStorage.setItem("mostRecentScore",score);
        //go to end page
        return window.location.assign("end.html");
    }

    quescounter++;
    // quescountertext.innerText=quescounter+"/"+maxques;
    quescountertext.innerText=`${quescounter}/${maxques}`;

    //update progressbar
    progressbarfull.style.width=`${(quescounter/maxques)*100}%`;

    var quesindex=Math.floor(Math.random()*availableques.length);
    currentQues=availableques[quesindex];
    ques.textContent=currentQues.ques;

    choices.forEach(function(choice){
        const number=choice.dataset["number"];
        choice.textContent=currentQues["choice"+number];
    });

    availableques.splice(quesindex,1);
    // console.log(availableques);
    acceptingans=true;
};

choices.forEach(function(choice){
    choice.addEventListener("click",function(e){
        if(!acceptingans)return;

        acceptingans=false;
        const  selectedchoice=e.target;
        const selectedans=selectedchoice.dataset["number"];

        // if(selectedans==currentQues.ans){
        //     ClassList.add("correct");
        // }
        // ClassList.add("incorrect");

        const classapply=selectedans==currentQues.ans ? "correct" : "incorrect";
        
        choice.classList.add(classapply);
        if(classapply=="correct")
            incementScore(correctbonus);
        
        setTimeout(function(){
            choice.classList.remove(classapply);
            getNewQuestion();
        },1000);
        
    });
});

function incementScore(num){
    score+=num;
    scoretext.textContent=score;
};
