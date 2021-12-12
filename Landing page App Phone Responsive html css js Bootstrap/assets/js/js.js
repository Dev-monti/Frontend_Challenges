
// window scroll
window.onscroll = function () {
    'use strict';
    if(window.pageYOffset > 0){
        document.getElementById('header_navbar').classList.add('header-navbar-shadow');
        document.getElementById('navbar').classList.add('navbar-scroll');
        document.getElementById('btn-back-to-top').classList.add('back-to-top-active')
    }else{
        document.getElementById('header_navbar').classList.remove('header-navbar-shadow');
        document.getElementById('navbar').classList.remove('navbar-scroll');
        document.getElementById('btn-back-to-top').classList.remove('back-to-top-active')
    }
};

// counter number
const numdownlaod = setInterval(downloads, 10);
let count = 1 ;
function downloads () {
    count++;
    document.querySelector("#num_download").innerHTML = (count + 'k');
    if (count == 140){
        clearInterval(numdownlaod);
    }
};

const numuser = setInterval(users, 10);
let count1 = 1 ;
function users () {
    count1++;
    document.querySelector("#num_users").innerHTML = (count + 'k');
    if (count1 == 120){
        clearInterval(numuser);
    }
};

const numreview = setInterval(reviews, 10);
let count2 = 1 ;
function reviews () {
    count2++;
    document.querySelector("#num_reviews").innerHTML = (count + 'k');
    if (count2 == 70){
        clearInterval(numreview);
    }
}
// counter numbers ends

// Accordin
const accordinEle = document.getElementsByClassName("body-w-singal"); 
for( let i = 0 ; i < accordinEle.length ; i++){
    accordinEle[i].addEventListener('click', () =>{
        let detail = accordinEle[i].nextElementSibling;
        if(detail.classList.contains("active")){
            detail.classList.remove("active");
            accordinEle[i].childNodes[1].style.borderRadius = "5px";
            accordinEle[i].childNodes[3].style.color = "#505478";
            accordinEle[i].childNodes[5].style.color = "#505478";
            accordinEle[i].childNodes[5].style.transform = "rotate(0deg)";
        }else{
            detail.classList.add("active");
            accordinEle[i].childNodes[1].style.borderRadius = "50%";
            accordinEle[i].childNodes[3].style.color = "#d63384";
            accordinEle[i].childNodes[5].style.color = "#d63384";
            accordinEle[i].childNodes[5].style.transform = "rotate(180deg)";
        }
    })
}

// wow
window.onload = function (){
    wow = new WOW ( 
        { 
        boxClass: 'wow', // default 
        animateClass: 'animated', // default 
        offset: 0, // default 
        mobile: false, // default 
        live: true // default 
        } 
    ) 
    wow.init ( );
};

