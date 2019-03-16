var horizontalMax;
var verticalMax;
var removeTimer;
var lifes = 5;
var score = 0;
var renderScore="";
var renderLifes="";

var apparitionTimer = 2000;
var disaTimer = 1800;

$(document).ready(function(){
  renderGameboard(5,5);





  setInterval(displayTarget, 2000);
  // disparait si on clic sur la taupe
  $('body').on('click','div.imgDiv img', function() {
    playSound("./assets/tap.wav")
    clearTimeout(removeTimer);
    removeTarget(true);
  });





  function displayScore(data){

    $('#score').html(data);
  }


  function displayLifes(data){

    $('#lifes').html(data);

  }






  // incremente la variable score avec le parametre increment
  function incrementScore(increment){
    score = score + increment;
  
  }



  // si le status est true on incremente le score
  // else exexute loselife
  function removeTarget(status){
    $('#target').remove();

    if(status){
      incrementScore(1);
      displayScore(score);
    }else{
      loselife();
      displayLifes(lifes);

    }
  }

  function playSound(sound){
    $('body').append('<audio id="musicbg" src="' + sound + '" autoplay></audio>')
  }


  // Affiche une alerte Game over
  function gameOver(){
    //alert('GAME OVER');
    $('#musicbg').remove();
    playSound("./assets/loose.wav");
    clearTimeout(removeTimer);
    clearInterval(interval);
    alert("ciao");
    }

  // décrémente la vie et execute la fonction gameOver si les points de vie
  // sont a 0
  function loselife(){
    lifes --;
    if(lifes <= 0){
     gameOver();
    }
  }

  /*
  Affiche notre cible sur une div random
  Lance le compteur de dispration de la cible
  */
  function displayTarget(){
    var hor = 1 + Math.floor(Math.random() * horizontalMax);
    var ver = 1 + Math.floor(Math.random() * verticalMax);
    $('div[data-vertical="'+ ver +'"] div[data-horizontal="'+ hor +'"]').html('<div id="target" class="imgDiv"><img  src="./assets/target.png"></div>')
    removeTimer = setTimeout(function(){
      removeTarget(false);
    },800);
  }


  // Création de la grille du jeu
  function renderGameboard(horizontal = 10 , vertical = 10){
    horizontalMax = horizontal;
    verticalMax = vertical;


    var gameBoard ="";
    for (var i = 1; i <= vertical ; i++) {
      gameBoard += "<div data-vertical='"+ i +"'>";
      for (var j = 1; j <= horizontal; j++) {
        gameBoard += "<div style='height:"+ 100 / vertical+"vh; width:"+ 100 / horizontal +"%;' data-horizontal='"+ j +"'></div>";
      }
      gameBoard += "</div>";
    }
    $('section[data-use="gameboard"]').html(gameBoard);
    playSound("./assets/soundGame.mp3");

  }
})
