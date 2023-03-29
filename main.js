var player = document.getElementById("player");
var game = document.getElementById("game");
var alien = document.getElementById("alien");
var p1= document.getElementById("p1")
var p2= document.getElementById("p2")
//var bg=document.getElementById("bg")

// result section
var result = document.getElementById("result");
var score = document.getElementById("score");
var counter = -1;
var gameEnd=document.getElementById("gameEnd")

// sounds & video
var shoot = document.getElementById("shoot");
var gameOverSound = document.getElementById('gameover');
var theme= document.getElementById("theme");
var video2= document.getElementById("video2")
var gameBg = document.getElementById("gameBg")

// Avatar movement
addEventListener("keydown", function (e) {
    if (e.keyCode == "39") {
        var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        if (playerLeft < 260) {
            player.style.left = (playerLeft + 130) + "px"
            theme.play();
        }
    }
    if (e.keyCode == "37") {
        var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        if (playerLeft > 0) {
            player.style.left = (playerLeft - 130) + "px"
        }
    }    
})
// fire bullet
addEventListener("keydown", function (e) {
    if (e.keyCode == "32") {
        var canon = document.createElement("div");
        var img = document.createElement("img");
        img.src = "fire.png";
        canon.appendChild(img);
        game.appendChild(canon);
        img.classList.add("bulletImg");
        canon.classList.add("bullet");
        canon.style.left = player.style.left;
        shoot.play();

        //When bullet hit alien
        setInterval(function collision() {
            var canonLeft = parseInt(window.getComputedStyle(canon).getPropertyValue("left"));
            var canonTop = parseInt(window.getComputedStyle(canon).getPropertyValue("top")); 
            var alienLeft = parseInt(window.getComputedStyle(alien).getPropertyValue("left"));
            var alienTop = parseInt(window.getComputedStyle(alien).getPropertyValue("top"));
            if (((canonTop - alienTop) < 100) && (alienTop < canonTop)
                && (alienLeft === canonLeft)) {
                canon.style.display = 'none';
                alien.style.display = 'none';
            }
        });      
        setTimeout(function () { canon.remove() }, 1000)
    }
})
// Alien move
function alienMove() {
    alien.style.display = 'block';
    var random = ((Math.floor(Math.random() * 3)) * 130);
    alien.style.left = random + "px";
    alien.classList.add("alienMove");
    counter++;
    p1.innerHTML=counter + "Kills"
    if (counter > 20) {
        alien.style.animationDuration = '0.7s';
    }
}
setInterval(alienMove, 2000);
// Game over
function gameOver() {
    var alienTop = parseInt(window.getComputedStyle(alien).getPropertyValue("top"));
    if (alienTop > 400) {
      //  window.location.href="gameEnd.html"
        result.style.display = 'block';
        game.style.display = 'none';
        gameBg.style.display= 'none';

       // bg.style.display= 'none'
        score.innerHTML = `score: ${counter}`;
        gameEnd.style.display='block';
        theme.pause(); 
        video2.play();
        // console.log("hjuaegfuehdi");
    }
}
setInterval(gameOver, 1000);