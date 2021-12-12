document.querySelector('.dark__mode button').addEventListener('click',(e) => {
    e.target.classList.toggle('dark');
    document.querySelector('body').classList.toggle('themeDark')
})