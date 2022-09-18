  inputDir={x:0,y:0};
const  foodsound=new Audio('food.mp3');
const  gameOverSound=new Audio('gameover.mp3');
const  moveSound=new Audio('move.mp3');
const  musicSound=new Audio('music.mp3');
let speed=5;
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:11,y:5};

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
    
}function isCollide(sarr){
     //if you bump into yourself
     for (let i = 1; i < snakeArr.length; i++) {
         if(snakeArr[i].x===snakeArr[0].x && snakeArr[i].y===snakeArr[0].y){
             return true;
         }
        }
         if(snakeArr[0].x>=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0].y<=0 ) {
              return true;
         }
     
}

function gameEngine(){
    //part1:updating the snake array & food
    musicSound.play();
    localStorage.clear();
    //if snake collides
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert('Game Over,press any key to play again');
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
        scoreBox.innerHTML="Score:"+score;
        highScoreBox.innerHTML="HighScore:"+highScoreval;
    } 
    // when eaten the food,increment the score,and regerate the food
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        foodsound.play();
        score +=1;
        if(score>highScoreval){
            highScoreval=score;
            localStorage.setItem('highScore',JSON.stringify(highScoreval));
            highScoreBox.innerHTML="HighScore:"+highScoreval;
        }
        
       
        scoreBox.innerHTML="Score:"+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    //moving the snake
    for (let i = snakeArr.length-2; i>=0; i--) {
        snakeArr[i+1]={...snakeArr[i]};  
    }
snakeArr[0].x +=inputDir.x;
snakeArr[0].y +=inputDir.y;


    //part2:dispalying snake and food
      //dispalying snake
     board.innerHTML="";
     snakeArr.forEach((e,index)=>{
         snakeElement=document.createElement('div');
         snakeElement.style.gridRowStart=e.y;
         snakeElement.style.gridColumnStart=e.x;
          if(index==0){
             snakeElement.classList.add('head');
         }
         else{
            snakeElement.classList.add('snake');
         }
         board.appendChild(snakeElement);
     })

     //dispalying food
     foodElement=document.createElement('div');
     foodElement.style.gridRowStart=food.y;
     foodElement.style.gridColumnStart=food.x;
     foodElement.classList.add('food');
     board.appendChild(foodElement);
}

//main logic starts here

let highScore=localStorage.getItem('highScore');
if(highScore==null){
    highScoreval=0;
    localStorage.setItem('highScore',JSON.stringify(highScoreval));
}
else{
    highScoreval=JSON.parse(highScore);
    highScore.innerHTML="HighScore:"+highScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
  inputDir={x:0,y:1}  //start the game
  moveSound.play();
  switch (e.key) {
      case "ArrowUp":
          console.log("Arrowup");
          inputDir.x=0;
          inputDir.y=-1;
          break;
      case "ArrowDown":
          console.log("Arrowdown");
        inputDir.x=0;
        inputDir.y=1;
          break;
      case "ArrowLeft":
          console.log("Arrowleft");
        inputDir.x=-1;
        inputDir.y=0;
          break;
      case "ArrowRight":
          console.log("ArrowRight");
        inputDir.x=1;
        inputDir.y=0;
          break;
  
      default:
          break;
  }
});