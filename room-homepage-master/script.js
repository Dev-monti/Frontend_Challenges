const arrowLeft = document.querySelector('.arrow-Ar-left');
const arrowRigth = document.querySelector('.arrow-Ar-right');
const Details = [
    {
        title: "Discover innovative ways to decorate",
        description: `We provide unmatched quality, comfort, and style for property owners across the country. 
        Our experts combine form and function in bringing your vision to life. Create a room in your 
        own style with our collection and make your property a reflection of you and what you love.`,
        image: "images/desktop-image-hero-1.jpg"
    },
    {
        title: "We are available all across the globe",
        description: `With stores all over the world, it's easy for you to find furniture for your home or place of business. 
        Locally, we’re in most major cities throughout the country. Find the branch nearest you using our 
        store locator. Any questions? Don't hesitate to contact us today.`,
        image: "images/desktop-image-hero-2.jpg"
    },
    {
        title: "Manufactured with the best materials",
        description: `Our modern furniture store provide a high level of quality. Our company has invested in advanced technology 
        to ensure that every product is made as perfect and as consistent as possible. With three decades of 
        experience in this industry, we understand what customers want for their home and office.`,
        image: "images/desktop-image-hero-3.jpg"
    }
];
let indexItem = 0;

arrowLeft.addEventListener('click',() => changeItems("left"));
arrowRigth.addEventListener('click',() => changeItems("rigth"));



function changeItems (name) {
    name === "left" ? indexItem++ : indexItem--;

    indexItem === Details.length && (indexItem = 0);
    indexItem === -1 && (indexItem = Details.length - 1);

    handleItem(indexItem)
}

function handleItem (index) {
    const {image,title,description} = Details[index];
    document.querySelector('.image-hero img').src = image;
    document.querySelector('.body_mn_dsc h2').innerHTML = title;
    document.querySelector('.body_mn_dsc p').innerHTML = description;
}
