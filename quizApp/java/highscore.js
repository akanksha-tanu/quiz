
var highScoresList=document.getElementById("highScoresList");

const highScores=JSON.parse(localStorage.getItem("highScores")) || [];

// var high=[];

// highScores.forEach(function(e){
//     // console.log(e);
//     high.push(e);
// })

// high.sort((a,b) => b.score-a.score) ;
// high.splice(5);


// highScoresList.innerHTML=high.map(function(score){
//     return("<li><span class='name'>"+score.name+'</span>  -  <span class="score">'+score.score+"</span></li>");
// }).join("");





//retriving all the present high scores stored in li
var final=[];
var n="";
var sc=Number();
var li=Array.from(document.querySelectorAll("li"));
//console.log(li);
for(var i=0;i<li.length;i++){
    var index=li[i].outerText.indexOf("-");
    n=li[i].outerText.slice(0,index-1);
    sc=li[i].outerText.slice(index+2,li[i].outerText.length);
    //console.log(n+sc);
    final.push({score:sc,name:n});
}
//console.log(final);

//retriving current scores in local storage
for(var j=0;j<highScores.length;j++)
{
    final.push(highScores[j]);
}
for(var z=0;z<final.length;z++)
//console.log(Number(final[z].score));

final.sort((a,b) => b.score-a.score) ;
final.splice(5);

//console.log(final);



highScoresList.innerHTML=final.map(function(score){
    return("<li style='visibility:visible;'><span class='name'>"+score.name+'</span>  -  <span class="score">'+score.score+"</span></li>");
}).join("");

