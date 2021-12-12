// Nav bar md
const ulLinks = document.querySelector('.Ul-links');
const btnnav = document.querySelector('.bi-list');

btnnav.addEventListener('click',() => {
    ulLinks.classList.toggle('d-none');
})