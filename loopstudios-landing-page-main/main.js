const homePage = document.querySelector('.home');
const navLinkes = document.querySelector('nav ul');
const navBaricon = document.querySelector('nav i');
const srcnavBaricon = navBaricon.querySelector('img');

navBaricon.addEventListener('click',navLinkssm)

function navLinkssm () {
    homePage.classList.toggle("home-sm");
    navLinkes.classList.toggle("links-sm");
    srcnavBaricon.getAttribute("src") === "images/icon-hamburger.svg" 
    ? srcnavBaricon.setAttribute("src","images/icon-close.svg")
    : srcnavBaricon.setAttribute("src","images/icon-hamburger.svg");
} 









