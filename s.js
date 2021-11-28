/* создаем блок за отображение на странице очков и очки */

let scoreBlock; // это блок с очками
let score = 0; // сами очки

/* =============================================================================== */

/* Содержит настройки игры. Объект */

const config = {

	/* step, maxstep чтобы пропускать игровой цикл */
	step: 0, // шаг
	maxStep: 5, // максимальная скорость

	/* sizeCEll размер одной ячейки, а sizeBerry ягода которую будет кушать змейка */
	sizeCell: 16, // размер ячейки
	sizeBerry: 16 / 4 // размер ягоды
}
/* =============================================================================== */


/* Все что связано со змейкой. Объект */

const snake = {

	/* Координаты */
	x: 160,
	y: 160,

	/* Скорость по вертикали и горизонтали */
	dx: config.sizeCell, // скорость по горизонтали просит у объекта config значение ключа sizeCell
	dy: 0,
	/* массив ячеек под контролем змейки */
	tails: [],
	/* кол-во ячеек */
	maxTails: 3
}

/* =============================================================================== */

/* хранит координаты ягоды. Объект */
let berry = {
	x: 0,
	y: 0
} 

/* получаем поле канвас из ХТМЛ */
let canvas = document.querySelector("#game-canvas");
/* Создаем контекст для рисования */
let context = canvas.getContext("2d");
/* получаем из ХТМЛ наш счетчик */
scoreBlock = document.querySelector(".game-score .score-count");

/* =============================================================================== */

/* вставляем пустую функцию для рандомных значений у ягоды */
drawScore();
randomPositionBerry();
/* =============================================================================== */

/* в игровой цикл подаем бесконечную функцию отрисовки */
function gameLoop() {

	requestAnimationFrame( gameLoop );
	/* проверка позволяет контролировать скорость отрисовки, 
    если значение из конфига меньше чем максимальное то пропускаем функцию */
	if ( ++config.step < config.maxStep) {
		return;
	}
	config.step = 0;
	/* очищаем канвас  */
	context.clearRect(0, 0, canvas.width, canvas.height);
	/* заново отрисовывем змейку и ягоду */
	drawBerry();
	drawSnake();
}
requestAnimationFrame( gameLoop );

/* Первые функции оформления змейки */

/* 1. увеличевает кол-во очков на 1 */
function incScore() {
	score++; // увеличит значение на 1
	drawScore(); // отрисует его на экране
}
/* 2. отображает очки на странице */
function drawScore() {
	scoreBlock.innerHTML = score;
}
/* 3. рандом в заданном диапазоне возваращет число */
function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

/* 4. отображаем змейку */
function drawSnake() {
	/* внутри меняем координаты змейки согласно скорости */
	snake.x += snake.dx;
	snake.y += snake.dy;

	collisionBorder();

	// добавляем в массив объект с координатами
	snake.tails.unshift( { x: snake.x, y: snake.y } );
	/* если кол-во дочерних элементов у змейки больше чем разрешено то мы 
	удаляем последний элемент*/
	if ( snake.tails.length > snake.maxTails ) {
		snake.tails.pop();
	}
	
	/* перебираем все дочерние элементы у змейки и отрисовываем их попутно
	проверяя на соприкосновение друг с другом и с ягодой */
	snake.tails.forEach( function(el, index){
		if (index == 0) {
			context.fillStyle = "#a42abd"; /* красим красный */
		} else {
			context.fillStyle = "#2ab8bd"; /* остальное тело в тусклый */
		}
		context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );

		/* проверяем координаты ягоды и змейки, если совпадают то увеличиваем хвост */
		if ( el.x === berry.x && el.y === berry.y ) {
			snake.maxTails++; /* увеличиваем хваост на 1 */
			incScore(); /* увеличиваем очки */
			randomPositionBerry(); /* создаем новую ягоду */
			if( score === 10 ) {
				config.maxStep = 7;
			} else if ( score === 20 ) {
				config.maxStep = 6;
			} else if ( score === 30 ) {
				config.maxStep = 5;
			} else if ( score === 40 ) {
				config.maxStep = 4;
			}
		}
		/* нужно проверить змейку с хвостом ЕСЛИ совпало то заного запускаем игру */
		for( let i = index + 1; i < snake.tails.length; i++ ) {
			/* если координаты совпали то запускаем заного */
			if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y ) {
				/* функция перезапуска игры */
				refreshGame();
			}
		}

	});
	
}

/* 5. рисование ягоды, описание после колиз */
function drawBerry() {
	
	context.beginPath(); // начало рисования
	context.fillStyle = "#ff0561"; // задаем цвет ягоды
	/* рисуем окружность на основе координат от ягоды */
	context.arc( berry.x + (config.sizeCell / 2 ), berry.y + (config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI );
	context.fill();
}


/*  для назначения координа для этой ягоды */
function randomPositionBerry() {
	/*В рандом передаем 0 и кол-во ячеек получаем засчет деления ширины канваса 
	на размер ячейки и полученый результат умножить на размер ячейки */
	berry.x = getRandomInt( 0, canvas.width / config.sizeCell ) * config.sizeCell;
	berry.y = getRandomInt( 0, canvas.height / config.sizeCell ) * config.sizeCell;
}

/* 7. коллизия для границ, если змейка подошла к краю то должна
 отображаться с другой стороны */
function collisionBorder() {
	/* проверка координа змейки, если выходят за 
	границу канваса то меняем координаты */

	/* если х координаты объекта змейка меньше нуля */
	if (snake.x < 0) {
		/* то тогда ее координаты станут ширина канваса вычесть размер ячеек в объекте конфиг */
		snake.x = canvas.width - config.sizeCell;
	} else if ( snake.x >= canvas.width ) { // а если х больше или равен канвас ширина
		snake.x = 0;
	}

	if (snake.y < 0) {
		snake.y = canvas.height - config.sizeCell;
	} else if ( snake.y >= canvas.height ) {
		snake.y = 0;
	}
}
/* прописываем обнуление всех значеий */
function refreshGame() {
	score = 0;
	drawScore();

	snake.x = 160;
	snake.y = 160;
	snake.tails = [];
	snake.maxTails = 3;
	snake.dx = config.sizeCell;
	snake.dy = 0;

	randomPositionBerry();
}




/*  обработчик события в котором определяем какую клавишу нажали */
document.addEventListener("keydown", function (e) {
	/* проверяем екод который проверяет код клавиши */
	/* после нажатия мы должны поменять направление у змейки учитывая что она 
	движется постоянно мы меняем значение движения с ПОЛОЖИТЕЛЬНОГО на ОТРИЦАТЕЛЬНОЕ 
	и наоборот в завиимсости от того, какую клавишу нажали. 
	Помимо того что мы 	сменили направление, нам также нужно обнулить 
	движение по горизонтали или вериткали
	в зависимости от клавиши которую нажали */
	if ( e.code == "KeyW" ) { 
		snake.dy = -config.sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyA" ) {
		snake.dx = -config.sizeCell;
		snake.dy = 0;
	} else if ( e.code == "KeyS" ) {
		snake.dy = config.sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyD" ) {
		snake.dx = config.sizeCell;
		snake.dy = 0;
	}
});