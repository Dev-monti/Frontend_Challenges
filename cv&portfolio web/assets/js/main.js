// Variables 
const btnAboutMehero = document.querySelector('.btn-aboutme-hero');
const ViewSpinner = document.querySelectorAll('.spinner-view');
const linksNavBar = document.querySelectorAll('nav ul li a');
const AllSection = document.querySelectorAll('body section');
const btnNavLinks = document.querySelector('.btn-nav-links');
const headerNav = document.querySelector('header nav');
const GoAboutme = document.querySelector('.go-about');

// Opone and close nav bar
btnNavLinks.addEventListener('click', () => {
    btnNavLinks.classList.toggle('bi-x');
    headerNav.classList.toggle('active')
});

// Tooltips when hover a icons navBar
linksNavBar.forEach(item => {
    item.addEventListener('mouseenter',Tooltips);
    item.addEventListener('mouseleave',() => item.lastChild.remove())
    function Tooltips () {
        // Varibels Toolips
        let titlelItem = item.getAttribute('title_toolTip');
        const Elmenttooltip = document.createElement('span'); 
        const texttooltip = document.createTextNode(`${titlelItem}`)
        // Add span to Item
        Elmenttooltip.className = 'tool-tip';
        Elmenttooltip.appendChild(texttooltip);
        item.appendChild(Elmenttooltip);
    };
});

// Button About Me
btnAboutMehero.addEventListener('click', () => GoAboutme.click());

// When Loading window
window.addEventListener('load', Spinners);

// When Click of item navBar Play Function
TransitionTo ();

function TransitionTo () {
    for(let i = 0 ; i < linksNavBar.length ; i++){
        linksNavBar[i].addEventListener('click', () => {
            Spinners();
            let ActiveSection = document.querySelector('.singal-section.active'),
                ActivelinkNavBar = document.querySelector('nav ul li .active'),
                gotoitemlink = linksNavBar[i].getAttribute('data_href');
    
            // Add and Remove Class Name active nav Link
            ActivelinkNavBar.classList.remove('active');
            linksNavBar[i].classList.add('active');
            ActiveSection.classList.remove('active');
            document.getElementById(`${gotoitemlink}`).classList.add("active");

            // Close btn navBar links when Loading  
            btnNavLinks.click();
        })
    };
};

// Transition from section to section
function Spinners() {
    Spinner()
    setTimeout(() => {
        AllSection.forEach(item => item.style.display = 'block');
        ViewSpinner.forEach(item => item.style.display = "none");
    },1000);

    function Spinner() {
        AllSection.forEach(item => item.style.display = 'none');
        ViewSpinner.forEach(item => item.style.display = "flex");
    }
};

// View img portfolio full screen
Imgportfolio ();

function Imgportfolio(){ 
    const btnsViewimgprtf = document.querySelectorAll('.view-img-prtf');
    const Portfolio = document.querySelector('.our_portfolio');

    btnsViewimgprtf.forEach(item => {
        item.addEventListener('click',() => {
            let srcimg = item.parentNode.previousElementSibling.getAttribute('src');

            // Create Elements View img
            const overlayView = document.createElement('div');
            const imgviewprtf = document.createElement('img');
            const iconClose = document.createElement('i');

            // Appendchild New Element 
            overlayView.className = 'overlay-view';
            iconClose.classList = 'bi bi-x-square'
            imgviewprtf.setAttribute('src',`${srcimg}`);
            overlayView.appendChild(imgviewprtf);
            overlayView.appendChild(iconClose);
            Portfolio.appendChild(overlayView);

            // Close View Img
            iconClose.onclick = () => {Portfolio.removeChild(overlayView)};

        })
    })
}

// Display post Blog
viewPost()
function viewPost(){
    const Blogsection = document.querySelector('.a_blog');
    const containerPost = document.querySelector('.display-blog');
    const titelsBlog = document.querySelectorAll('.title-singal-blog');
    const btnClosePost = document.querySelector('.display-blog .bi-x-circle')

    titelsBlog.forEach(Ti => Ti.onclick = () => clcikTitel(Ti));
    btnClosePost.addEventListener('click',() => containerPost.classList.remove('active'))
    Blogsection.addEventListener('click',() => containerPost.classList.remove('active'))

    function clcikTitel(Ti){
        const blogImg = Ti.parentElement.previousElementSibling.querySelector('img').src;
        containerPost.querySelector('img').setAttribute('src',blogImg);
        containerPost.classList.add('active');
        window.scrollTo(0,0)
    }
}










