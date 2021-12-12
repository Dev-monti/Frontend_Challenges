const btn_menu = document.querySelector('.btn-menu');
const nav_links = document.querySelector('nav ul');
const QuantityUI = document.querySelector('.pd-cnt');
const btnCart = document.querySelector('.btn-cart');
const btnsChangeQnut = document.querySelectorAll('.btn-changeQnut');
const produdctCartUI = document.querySelector('.dt-bd-cartshop');
const imgBig = document.querySelector('.big-img-prd');
const add_product = document.getElementById('#add_product');
const Qnty_prd = document.querySelector('.Qnty_prd');

let Quantity = 0;


window.addEventListener('load',() => {
    QuantityChange();
    imagesmClicked();
});

btnCart.addEventListener('click',btnCartShop)

add_product.addEventListener('click',AddtoCartshop);


btn_menu.addEventListener('click',() => {

    nav_links.classList.toggle('show');

    let linksState = btn_menu.getAttribute('data_state');

    if(linksState === "open"){
        btn_menu.setAttribute('data_state','close');

        btn_menu.querySelector('img').setAttribute('src',"images/icon-close.svg");
    }else{
        btn_menu.setAttribute('data_state','open');

        btn_menu.querySelector('img').setAttribute('src',"images/icon-menu.svg")
    }
})

// Quantity Changed function
function QuantityChange () {

    const btnsChangeQnut = document.querySelectorAll('.btn-changeQnut');

    const QuantityUI = document.querySelector('.pd-cnt');

    btnsChangeQnut.forEach(item => item.addEventListener('click',() => {

            if(item.getAttribute('data_status') === "plus"){

                Quantity = Quantity + 1;

                QuantityUI.innerHTML = Quantity;

            }else{

                if(Quantity !== 0){

                    Quantity = Quantity - 1;

                    QuantityUI.innerHTML = Quantity;

                }
            }
        })
    )
}

// View produdct img small
function imagesmClicked () {

    const img_Small = document.querySelectorAll('.img-small');

    img_Small.forEach(img => img.addEventListener('click',() => {

        const displayedImg = document.querySelector('.img-small.clicked');

        imgBig.setAttribute('src_img',img.querySelector('img').src);

        imgBig.querySelector('img').setAttribute('src',img.querySelector('img').src);

        displayedImg.classList.remove('clicked');

        img.classList.add('clicked');
    }))
}

// Cart Shop
function btnCartShop (){

    const cartProductUI = document.querySelector('.cartProduct');

    cartProductUI.classList.toggle('active');

}

function AddtoCartshop () {

    if(Quantity !== 0){

        Qnty_prd.classList.add('show');
        Qnty_prd.innerHTML = Quantity;

        produdctCartUI.innerHTML = `
            <img src="${imgBig.getAttribute('src_img')}" alt="">
            <div>
                <p>Fall Limited Edition Sneakers</p>
                <div>
                    <p>$125.00 * ${Quantity}</p>
                    <span class="total-price">$${125 * Quantity}</span>
                </div>
            </div>
            <img src="images/icon-delete.svg" onclick="productDelete()" alt="">
        `

        window.scrollTo(0,0)
    }else{
        emptyCartshop()
    }
}

function productDelete () {
    emptyCartshop()
}

function emptyCartshop () {

    produdctCartUI.innerHTML = "<h6>Your cart is empty</h6>";

    Qnty_prd.classList.remove('show');
}