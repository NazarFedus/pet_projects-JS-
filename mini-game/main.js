const screen = document.querySelector('.box-form');
const amount = document.querySelector('.amount')
const button = document.querySelector('.btn')

const board = document.getElementById('board');

const colors = ['#17bad3', '#a717d4', '#e3f133', '#2023eb', '#3deb1e', '##eb1ea1', '#1e6ceb'];

button.addEventListener('click', () =>{
     screen.classList.add('none')
     board.classList.remove('none')

     for(let i = 0; i < amount.value; i++){
          // Create a div element
          const square = document.createElement('div');
          // Add a class to the div element
          square.classList.add('square');

          // when the mouse is over the square, change the color
          square.addEventListener('mouseover', () => {
               setColor(square);
          })
          // when the mouse leaves the square
          square.addEventListener('mouseleave', () => {
               removeColor(square);
          })

          // Add the div element to the board
          board.append(square);
     }
})

function setColor(element){
     const color = getRandomColor();
     element.style.backgroundColor = color;
     element.style.boxShadow =`0 0 2px ${color}, 0 0 10px ${color}`
}

function removeColor(element){
     element.style.backgroundColor = '#1d1d1d';
     element.style.boxShadow =`0 0 2px #000`
}

function getRandomColor(){
     const index = Math.floor(Math.random() *colors.length);
     return colors[index];
}