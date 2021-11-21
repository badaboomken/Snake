


/* Создаем переменную canvas и получаем по id поле */
let canvas = document.querySelector("#game-canvas");
/* создаем контекст 2д формата для рисования на нем*/
let context = canvas.getContext("2d");
/* создали переменную в которой будет нам счетчик */
let scoreBlock = document.querySelector(".game-score .score-count");

function gameLoop() {
    /* 
    requestAnimationFrame вызывается 60 кадров в секунду 
    мы делаем функциональное замыкание что бы функция вызывала саму себя 
    до бесконечности
    */
    requestAnimationFrame(gameLoop);
	
}
requestAnimationFrame(gameLoop);

/* Функция по созданию змейки */
function drawSnake() {}

/* Функция  */
function collisionBorder() {}

/* Функция по обновлению игры */
function refreshGame() {}

/* Функция по отрисовке ягод */
function drawBerry() {}

/* Функция по случайному появлению ягоды */
function randomPositionBerry() {
    /* создать повяление ягоды рандомно на поле */
    getRandomInt()
    getRandomInt()
}

/*  */
function incScore() {}

/*  */
function drawScore() {}

/* Создание случайного числа внутри нашего поля */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


 