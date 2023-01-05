const item = document.querySelector('.item');
const placeholders = document.querySelectorAll('.placeholder');

// when we start to move the item
item.addEventListener('dragstart', (event) => {
     event.target.classList.add('hold')
     setTimeout(() => event.target.classList.add('hide'), 0)
})
// when we finish to move the item
item.addEventListener('dragend', (event) => {
     event.target.className = 'item'
})

placeholders.forEach(placeholder => {
     // to remove the default behavior of the browser
     placeholder.addEventListener('dragover', (event) => {
          event.preventDefault();
     })
     placeholder.addEventListener('dragenter', (event) => {
          event.target.classList.add('hovered');
     })
     placeholder.addEventListener('dragleave', (event) => {
          event.target.classList.remove('hovered');
     })
     // add item to placeholder
     placeholder.addEventListener('drop', (event) => {
          event.target.classList.remove('hovered');
          event.target.append(item);
          if(event.target.id === 'start'){
               item.innerHTML = 'Start';
          } else if(event.target.id === 'inprogress'){
               item.innerHTML = 'In Progress';
          } else if(event.target.id === 'ready'){
               item.innerHTML = 'Ready';
          }
     })
})