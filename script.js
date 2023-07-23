let c = 0
let previous_time = 0;
let start = document.getElementById("start")
let snake_speed = 6;
let stop = document.getElementById("stop")
let a;
let score = document.getElementById("score")
const music = new Audio('music.mp3')
const foodSound = new Audio("food.mp3")
const move = new Audio("move.mp3")
const gameOver = new Audio("gameover.mp3")
const board = document.getElementById("board")
let food = { x: 5, y: 7 }
let sscore=0
let snake_body = [
    { x: 8, y: 11 }

]
let inputDir = [
    { x: 1, y: 0 }
]


function speed_cntrl(starting_time) {
    a = requestAnimationFrame(speed_cntrl)
    let gap = (starting_time - previous_time) / 1000

    if (gap < 1 / snake_speed) {
        return
    }
    previous_time = starting_time;
    gameUpdate()
    gamengine()
};


function gameUpdate() {
    if (snake_body[0].x === 19 || snake_body[0].y === 19 || snake_body[0].x === 0 || snake_body[0].y === 0) {
        gameOver.play()
         
        alert("lost! Press any key to play again")

        snake_body = [

            { x: 8, y: 11 }
        ]

    }


    if (snake_body[0].x === food.x && snake_body[0].y === food.y) {
        snake_body.unshift({ x: snake_body[0].x + inputDir[0].x, y: snake_body[0].y + inputDir[0].y })
        sscore+=10;
        score.innerHTML="score: "+ sscore
        foodSound.play()
        let x = 1;
        let y = 15;
        food = { x: Math.round(x + (y - x) * Math.random()), y: Math.round(x + (y - x) * Math.random()) }
    }
    for (let i = snake_body.length - 2; i >= 0; i--) {
        const element = snake_body[i];
        snake_body[i + 1] = { ...snake_body[i] };
    }

    snake_body[0].x += inputDir[0].x
    snake_body[0].y += inputDir[0].y

    for (let i = 1; i < snake_body.length; i++) {
        if (snake_body[0].x === snake_body[i].x && snake_body[0].y === snake_body[i].y) {
            console.log(snake_body[0].x);
            console.log(snake_body[i].x);

            alert("lost! Press any key to play again")
            gameOver.play()
            snake_body = [
                { x: 8, y: 11 }
            ]
        }
    }
}


function gamengine() {
    
    board.innerHTML = ""
    snake_body.forEach((a, index) => {
        let snakedisplay = document.createElement("div")
        snakedisplay.style.gridRowStart = a.y;
        snakedisplay.style.gridColumnStart = a.x;
        snakedisplay.classList.add("head")
        if (index === 0) {
            snakedisplay.classList.add("snake")
        }
        board.appendChild(snakedisplay);
    })
    let foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("fud")
    board.appendChild(foodElement);
}

start.addEventListener("click", function () {

music.play()
    a = requestAnimationFrame(speed_cntrl);
    window.addEventListener("keydown", e => {
        move.play()
        switch (e.key) {
            case "ArrowUp":
                if (inputDir[0].y !== 0) {
                    return;
                }
                inputDir[0].x = 0
                inputDir[0].y = -1
                break;
            case "ArrowDown":
                if (inputDir[0].y === -1) {
                    return;
                }
                inputDir[0].x = 0
                inputDir[0].y = 1
                break;

            case "ArrowLeft":
                if (inputDir[0].x === 1) { return; }
                inputDir[0].x = -1
                inputDir[0].y = 0
                break;

            case "ArrowRight":
                if (inputDir[0].x === -1) { return }
                inputDir[0].x = 1
                inputDir[0].y = 0
                break;

        }
    })
});

stop.addEventListener("click", function () {
    console.log("stop");
    cancelAnimationFrame(a);
    music.pause()

})  
