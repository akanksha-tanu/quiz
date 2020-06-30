
var highScoresList=document.getElementById("highScoresList");

const highScores=JSON.parse(localStorage.getItem("highScores")) || [];
const high=[];

highScores.forEach(function(e){
    // console.log(e);
    high.push(e);
})

high.sort((a,b) => b.score-a.score) ;
high.splice(5);


highScoresList.innerHTML=high.map(function(score){
    return("<li>"+score.name+'  -  '+score.score+"</li>");
}).join("");
