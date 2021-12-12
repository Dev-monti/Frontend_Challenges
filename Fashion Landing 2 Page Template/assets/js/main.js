// Scroll Pages
const navbarToggler = document.querySelector('.navbar-toggler');
const header = document.querySelector('header');
window.onscroll = () =>{
    if(window.pageYOffset > 0){
        header.classList.add("active");
        navbarToggler.style.marginTop = "10px";
        navbarToggler.style.backgroundColor = "#1f1f1f";
    }else{
        header.classList.remove("active");
        navbarToggler.style.marginTop = "20px";
        navbarToggler.style.backgroundColor = "#0000009e";
    }
}

// NavBar Toggler
const iconBarbtn = document.querySelector('.icon-bar i img');
const navcollapse = document.querySelector('.nav-collapse');
const linknav = document.querySelector('.nav-collapse ul');
const iconBar = document.querySelector('.icon-bar');
const Body = document.querySelector('body');
iconBarBlur = () => {
    const [copylinknav] = [linknav];
    navbarToggler.removeChild(copylinknav);
    navbarToggler.style.padding = "0";
    navcollapse.insertBefore(copylinknav,navcollapse.firstElementChild);
    iconBarbtn.setAttribute('src','assets/icons/Icon awesome-bars.png');
    iconBarbtn.style.width = "auto"
    iconBar.setAttribute('value','true');
};
iconBar.onclick = () =>{
    const [copylinknav] = [linknav];
    if(iconBar.getAttribute('value') == 'true'){
        navbarToggler.appendChild(copylinknav);
        navbarToggler.style.padding = "1px 0";
        iconBarbtn.setAttribute('src','assets/icons/Icon material-close.png');
        iconBarbtn.style.width = "25px"
        iconBar.setAttribute('value','false'); 
    }else{
        iconBarBlur();
    }
}; 
Body.onmouseleave = () => {
    if(iconBar.getAttribute('value') == 'false'){
        iconBarBlur();
    }
};

// Other Img Products
const otherimgPrd = document.querySelectorAll('.otherimg-prd img');
const srcImgProduct = document.querySelector('.img-product img');
for(let i = 0; i < otherimgPrd.length; i++){
    otherimgPrd[i].onclick = () =>{
        srcImgProduct.setAttribute("src", otherimgPrd[i].src);
    }
};

// Slider Production
const btnarrowleft = document.querySelector('.arrow-back .btn_arrow_left');
const groupsProduct = document.querySelectorAll('.groups_product .group_product');
let j = 1;
const btnNextslider = () => {
    if (j < groupsProduct.length) {
        groupsProduct[j - 1].classList.remove("active");
        groupsProduct[j].classList.add("active");
        j++;
    } else {
        groupsProduct[j - 1].classList.remove("active");
        j = 0;
        groupsProduct[j].classList.add("active");
        j++;
    }
    btnarrowleft.onclick = () => {
        if (j > 1) {
            groupsProduct[j - 1].classList.remove("active");
            groupsProduct[j - 2].classList.add("active");
            j--;
        }
    };
};