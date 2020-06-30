const username=document.getElementById("username");
const saveScoreBtn=document.getElementById("saveScoreBtn");

const mostRecentScore=localStorage.getItem("mostRecentScore");
const finalScore=document.getElementById("finalScore");
finalScore.innerText=mostRecentScore;

//const high=[];
const highScores=(JSON.parse(localStorage.getItem("highScores")) || []);

const maxHighScore=5;

username.addEventListener("keyup",function(){

    saveScoreBtn.disabled=!username.value;
});

function saveHighScore(e){
    e.preventDefault();

    const score={
        score: mostRecentScore,
        // score:Math.floor(Math.random()*100),
        name:username.value
    };
    highScores.push(score);
    //highScores.sort((a,b) => b.score-a.score) ;
    //highScores.splice(5);

    localStorage.setItem("highScores",JSON.stringify(highScores));
    window.location.assign("index.html");

    // console.log(highScores);
};
