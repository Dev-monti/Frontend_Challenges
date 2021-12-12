// Window Scroll
const navBar = document.querySelector('.navbar');
window.onscroll = () =>{
    if(window.pageYOffset > 0){
        navBar.classList.add('scroll');
    }else{
        navBar.classList.remove('scroll')
    }
}

// Portfolio
const portfoliobtns = document.querySelector('.portfolio-btns');
const groubBtn = document.querySelectorAll('.portfolio-btns button');
const imgsPortfolio = document.querySelectorAll('.imgs-portfolio div');
for(let i = 0 ; i < groubBtn.length ; i++){
    groubBtn[i].addEventListener('click', () => {
        portfoliobtns.querySelector('.active').classList.remove('active');
        groubBtn[i].classList.add('active');
        let namebtn = groubBtn[i].getAttribute('name');
        for( let j = 0 ; j < imgsPortfolio.length ; j++){
            imgsPortfolio[j].classList.add('hide');
        }
        let imgsPortfolioview = document.querySelectorAll(`.imgs-portfolio .${namebtn}`);
        for( j = 0 ; j < imgsPortfolioview.length ; j++){
            imgsPortfolioview[j].classList.remove('hide');
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
