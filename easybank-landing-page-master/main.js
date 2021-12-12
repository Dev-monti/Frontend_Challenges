




const navUl = document.querySelector('nav ul');
const navbarIcon = document.querySelector('.icon-bar');

navbarIcon.addEventListener('click',(e) => {
    const element = e.target;
    navUl.classList.toggle('active');
    if(element.getAttribute('data_target') === "open"){
        element.setAttribute('src','images/icon-hamburger.svg')
        element.setAttribute('data_target','close')
    }else{
        element.setAttribute('src','images/icon-close.svg')
        element.setAttribute('data_target','open')
    }
})
