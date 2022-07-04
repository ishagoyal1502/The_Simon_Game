var colors=["red","blue","green","yellow"];
var pattern=[];
var clicked=[];
var i=0;
var flag=0;
$(document).keydown(function()
{
  if(flag==0)
  {
    flag=1;
    sequenceGenerator();
  }
});
function sequenceGenerator()
{
  $("h1").text("Level "+i);
  randomNumber=Math.random();
  randomNumber=Math.floor(randomNumber*4);
  console.log(randomNumber);
  var chosenColor=colors[randomNumber];
  console.log(chosenColor);
  pattern.push(chosenColor);
  console.log(pattern);
  $("#"+chosenColor).fadeOut(100).fadeIn(100);
  sound(chosenColor);
}

$(".btn").click(function(){
  if(flag==1)
  {
    clicked.push($(this).attr("id"));
    sound($(this).attr("id"));
    animate(this);
    check();
  }
});


function sound(id)
{
  var music=new Audio("sounds/"+id+".mp3");
  return music.play();
}

function animate(key)
{
  $(key).addClass("pressed");
  setTimeout(function(){
    $(key).removeClass("pressed");
  },100);
}


function check()
{
  if(pattern.length===clicked.length)
  {
    for(var j=0;j<pattern.length;j++)
    {
      if(pattern[j]!==clicked[j])
      {
        gameover();
        break;
      }
    }
    if(j===pattern.length)
    {
      clicked=[];
      console.log(clicked);
      i++;
      setTimeout(function(){
        sequenceGenerator();
      },1000);
    }
  }
}

function gameover()
{
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over. Press any key to restart the game");
  flag=0;
  i=0;
  pattern=[];
  clicked=[];
}
