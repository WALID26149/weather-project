const model = document.querySelector('.model');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.closeModalBtn');

// pop up to explain what this website do
setTimeout(() => {
    model.classList.remove('hidden');
    overlay.classList.remove('hidden');
}, 2000)

// btn to close the model
closeBtn.addEventListener('click', () => {
    model.classList.add('hidden');
    overlay.classList.add('hidden');
});