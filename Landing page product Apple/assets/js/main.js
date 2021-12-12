// Change Style Page
let backcolor , srcimg , srcnavbar , iconscolor , j ;
let circlesilder = document.querySelectorAll(".ele-silder div");
const iconssocial = document.querySelectorAll(".social-media i");
const navbarLeft = document.querySelector(".bar-left i img");
const btn = document.querySelector(".info-product button");
const imgproduct = document.querySelector(".imgproduct");
const content = document.querySelector(".content");
changestyle = (j , backcolor , srcimg , srcnavbar , iconscolor) => {
    for(i = 0 ; i < circlesilder.length ; i++){
        circlesilder[i].classList.remove("active");
    }
    circlesilder[j].classList.add("active");
    content.style.background = backcolor ;
    content.style.color = iconscolor ;
    imgproduct.src = srcimg ;
    navbarLeft.src = srcnavbar ;
    for(i = 0 ; i < iconssocial.length ; i++){
        iconssocial[i].style.color = iconscolor ;
    }
    btn.onmouseenter = () => {
        btn.style.color = iconscolor;
    }
    btn.onmouseleave = () => {
        btn.style.color = "#fff";
    }
}
// Toggole NavBar
const navlinksUl = document.querySelector('.nav-links ul');
const navlinksUllia = navlinksUl.querySelectorAll('li a'); 
const iconBar = document.getElementById('icon_bar'); 
iconBarClose = () => {
    iconBar.setAttribute('class', 'fas fa-bars');
    navlinksUl.classList.remove('active');
    iconBar.setAttribute('value', 'close');
    for(i = 0; i < navlinksUllia.length; i++){
        navlinksUllia[i].style.color = "#fff";
    }
}
iconBar.onclick = () => {
    if(iconBar.getAttribute('value') == "close"){
        iconBar.setAttribute('class', 'fas fa-times');
        navlinksUl.classList.add('active');
        iconBar.setAttribute('value', 'open');
        for(i = 0; i < navlinksUllia.length; i++){
            navlinksUllia[i].style.color = content.style.color;
        }
    }else{
        iconBarClose ();
    }
}
document.querySelector('body').onmouseleave = () => {
    iconBarClose ();
}
navlinksUl.onmouseleave = () => {
    iconBarClose ();
}
// change icon search width input search
const inputsearch = document.querySelector(".nav-icons input");
const btnsearch = document.querySelector(".icon-search");
btnsearch.onclick = () => {
    btnsearch.style.display = "none";
    inputsearch.style.display = "inline-block";
    inputsearch.focus();
    document.querySelectorAll(".nav-icons i")[1].style.marginLeft = "15px";
}
inputsearch.onblur = () => {
    btnsearch.style.display = "inline-block";
    inputsearch.style.display = "none";
    inputsearch.value = " ";
    document.querySelectorAll(".nav-icons i")[1].style.marginLeft = "80px";
}
      