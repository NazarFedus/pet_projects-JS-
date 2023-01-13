const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const timeEl = document.getElementById('time');
const board = document.getElementById('board');

const btnHome = document.getElementById('home');
const btnRestart = document.getElementById('restart');

const colors = ['#e51220', '#12e5d7', '#48e612', '#f2d714', '#ec13f2', '#1321f2', '#f28a13'];

let refreshIntervalId = null;
let currentTime = 0;
let aimcircle = [];
let scoreBoard = '';
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
     event.preventDefault();
     screens[0].classList.add('up');
     btnHome.classList.remove('none');
});

timeList.addEventListener('click', (event) => {
     if(event.target.classList.contains('time-btn')){
          time = Number(event.target.getAttribute('data_time'));
          screens[1].classList.add('up');
          btnRestart.classList.remove('none');
          currentTime = time;
          startGame()
     }
})

board.addEventListener('click', event => {
     if(event.target.classList.contains('circle')){
          score++
          event.target.remove()
          createRandomCircle()
     }
})

btnHome.addEventListener('click', () => {
     screens[1].classList.remove('up');
     screens[0].classList.remove('up');
     finishGame()
     timeEl.parentNode.classList.remove('hide');
})

btnRestart.addEventListener('click', () => {
     hideScore()
     score = 0;
     time = 0;
     timeEl.parentNode.classList.remove('hide');
     clearInterval(refreshIntervalId);
     time = currentTime;
     aimcircle.forEach(item => item.remove())
     startGame();

})

function startGame(){
     beginTime = time;
     refreshIntervalId = setInterval(decreaseTime, 1000);
     createRandomCircle()
     setTime(time)
}

function decreaseTime(){
     if(time === 0){
          finishGame()
     } else {
          let current = --time;
          if(current < 10){
               current = `0${current}`;
          }
          setTime(current)
     }
}

function setTime(value){
     timeEl.innerHTML = `00:${value}`;
}

function finishGame(){
     timeEl.parentNode.classList.add('hide'); // parentNode - повертає батьківський елемент
     showScore()
     currentCircle.remove();
}

function createRandomCircle(){

          const circle = document.createElement('div');
          circle.classList.add('circle')

          // set random size
          const size = getRandomNum(10, 60)
          circle.style.width = `${size}px`
          circle.style.height = `${size}px`

          // set random position
          const {width, height} = board.getBoundingClientRect() // getBoundingClientRect() - повертає об'єкт, який містить розміри елемента і його позицію відносно viewport
          const x = getRandomNum(0, width - size);
          const y = getRandomNum(0, height - size);
          circle.style.top = `${y}px`
          circle.style.left = `${x}px`
          circle.style.background = getRandomColor()

          aimcircle.push(circle) // to add circle to array
          currentCircle = circle
          board.append(circle)
}

function getRandomNum(min, max){
     return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor(){
     return colors[Math.round(Math.random() * colors.length)]
}

function showScore(){
     board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`;
}

function hideScore(){
     board.innerHTML = '';
}