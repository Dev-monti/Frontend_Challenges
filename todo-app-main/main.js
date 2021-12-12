const Form = document.querySelector('form');
const input = document.querySelector('input');
const footerItems = document.querySelector('.footer-items')
const containerItem = document.querySelector('.items');
const btnActive = document.querySelector('.btn-active');
const btnCompleted = document.querySelector('.btn-completed');
const btnClear = document.querySelector('.btn-clear');
const btnAll = document.querySelector('.btn-all');
const darkModeicon = document.querySelector('.darkMode-icon');
const container = document.querySelector('.container')

// Events
Form.addEventListener('submit',(e) => Submitform(e));

btnAll.addEventListener('click',(e) => allItem(e));

btnActive.addEventListener('click',(e) => stateItem(e,"active"));

btnCompleted.addEventListener('click',(e) => stateItem(e,"completed"));

btnClear.addEventListener('click',clearCompleted);

darkModeicon.addEventListener('click',Darkmode)

// Function
// Submit Form
function Submitform (e) {
    e.preventDefault();

    creatingitem(input.value);

    itemNumber();

    input.value = ""
}
// Create and add new item
function creatingitem (title) {
    const newitem = document.createElement('div');
    const nameitem = document.createElement('h3');
    nameitem.innerText = title;
    newitem.className = `item back-dark active ${container.classList.contains('nigth') && "valueDark"}`; 
    nameitem.className = `text-dark ${container.classList.contains('nigth') && "valueDark"}`
    newitem.innerHTML = `
        <div class="icon-check">
            <img src="images/icon-check.svg" alt="">
        </div>
    `
    newitem.appendChild(nameitem);
    newitem.onclick = () => {
        newitem.classList.toggle('completed');
        newitem.classList.toggle('active');
    }
    containerItem.appendChild(newitem)
}
// Items filter
function allItem (e) {
    const btnprevious = document.querySelector('button.active');
    const items = document.querySelectorAll('.item');
    items.forEach(el => el.style.display = "flex");
    btnprevious.classList.remove('active')
    e.target.classList.add("active")
}
function stateItem (e,state) {
    const btnprevious = document.querySelector('button.active');
    const items = document.querySelectorAll('.item');
    btnprevious.classList.remove('active');
    e.target.classList.add('active')
    items.forEach(el => el.style.display = "none");
    if(document.querySelector(`.item.${state}`)){
        const itemsTraget = document.querySelectorAll(`.item.${state}`);
        itemsTraget.forEach(el => el.style.display = "flex");
    }
}
// Remove items completed
function clearCompleted () {
    if(document.querySelector('.item.completed')){
        const items = document.querySelectorAll('.item.completed');
        items.forEach(el => {
            el.style.animation = "animi 1s ease-in-out";
            el.addEventListener('animationend',() => {
                el.remove();
                itemNumber()
            })
        })
    }
}
// Item length
function itemNumber () {
    const numberItem = document.querySelectorAll('.items .item');
    document.querySelector('.item-length').innerHTML = numberItem.length;
    numberItem.length !== 0 
    ? footerItems.classList.add('show') 
    : footerItems.classList.remove('show');
}
// Dark mode
function Darkmode () {
    const textColor = document.querySelectorAll('.text-dark');
    const backColor = document.querySelectorAll('.back-dark');
    textColor.forEach(el => el.classList.toggle("valueDark"));
    backColor.forEach(el => el.classList.toggle("valueDark"));
    container.classList.toggle('nigth');
    container.classList.contains('nigth')
    ? darkModeicon.querySelector('img').setAttribute('src','images/icon-moon.svg')
    : darkModeicon.querySelector('img').setAttribute('src','images/icon-sun.svg');
}