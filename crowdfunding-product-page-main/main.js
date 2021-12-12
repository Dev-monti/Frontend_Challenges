const navBar = document.querySelector('nav ul');
const navBar_icon = document.querySelector('.hamburger-icon');
navBar_icon.addEventListener('click',() => {
    let naviconValue = navBar_icon.getAttribute("data_target");
    navBar.classList.toggle("active-sm");
    if(naviconValue === "true"){
        navBar_icon.querySelector("img").setAttribute('src','images/icon-close-menu.svg');
        navBar_icon.setAttribute("data_target","false")
    }else{
        navBar_icon.querySelector("img").setAttribute('src','images/icon-hamburger.svg');
        navBar_icon.setAttribute("data_target","true")
    }
})