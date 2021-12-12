// Scroll navbar
const navbar = document.querySelector('.navbar');
window.onscroll = () => {
    if(window.pageYOffset > 0){
        navbar.classList.add('scroll');
    }else{
        navbar.classList.remove('scroll');
    }
}

// View Search Header
const searchProducts = document.querySelector('.search_products')
const btnclosesearch = document.querySelector('.content_search .bi-x')
const btnsearch = document.querySelector('.nav-bar-icons .bi-search');
const Inputsearch = document.querySelector('.search_product')

btnsearch.addEventListener('click', () => {
    searchProducts.classList.toggle("active");
    navbar.classList.toggle("marginTop");
});
btnclosesearch.addEventListener('click',() => {
    btnsearch.click();
    EmptySearch();
});

// Open and Close List Shop Cart
const CloseListCart = document.querySelector(".close-list-shop-cart");
const listShopCart = document.querySelector(".list-shop-cart");
const iconnavCart = document.querySelector(".nav-cart");
iconnavCart.addEventListener('click', () => listShopCart.classList.add("active"));
CloseListCart.addEventListener('click', () => listShopCart.classList.remove("active"));

// Events : ------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Add products to UI 
    handleProducts();

    // display product from shop cart
    addtoCart();
});
Inputsearch.addEventListener('search', SearchProduct)

// Function : ----------------------------------
// Products UI 
function handleProducts(){
    let listproducts = [];
    fetch('assets/js/DetailsProducts.json')
    .then(productjs => productjs.json())
    .then(data => {
        listproducts.push(...data);
        productsUI(listproducts);
    });
}
function productsUI(ListDetails){
    const AllProductsDom = document.querySelector('.new_arrivals .container .ProductsUI');
    ListDetails.forEach((product,index) => {
        const singalProduct = document.createElement('div');
        singalProduct.classList = "new_product col-xl-3 col-lg-4 col-md-6 col-sm-8";
        singalProduct.innerHTML = `
            <div class="body_new_product" dataId=${product.id}>
                <div class="img_body_n_product sale_p d-flex">
                    <div class="overlay_new_product"></div>
                    <img src="${product.pngProduct}" alt="">
                    <div class="new_product_cart d-flex justify-content-between align-items-center">
                        <span class="btn-addCart">Add to Cart</span>
                        <div>
                            <i class="bi bi-heart"></i>
                            <i class="bi bi-fullscreen"></i>
                        </div>
                    </div>
                </div>
                <h3 class="title-product text-center">${product.titelProduct}</h3>
                <h4 class="text-center">${product.priceProduct}</h4>
            </div>
        `
        AllProductsDom.appendChild(singalProduct);

        const btnflscrean = singalProduct.querySelector('.bi-fullscreen');
        const btnaddCart = singalProduct.querySelector('.btn-addCart');
        
        // View img product fullscreen
        btnflscrean.addEventListener('click',(e) => imgflScreen(e.target))

        // Add Shop cart
        btnaddCart.addEventListener('click',() => {
            setProducts(product);
            iconnavCart.click()
        }) 
    })
}
function imgflScreen(el){
    const srcImg = el.parentElement.parentElement.previousElementSibling.src;
    const viewPrd = document.querySelector('.view-product');
    const viewPrdcrs = viewPrd.querySelector('img');
    const btnclose = viewPrd.querySelector('.bi-x');

    viewPrd.classList.add('active');
    viewPrdcrs.setAttribute('src',`${srcImg}`);
    btnclose.onclick = () => {viewPrd.classList.remove('active');}
}

// Shop Cart
function storage(){
    let productStore;
    if(localStorage.getItem('productStore') === null){
        productStore = [];
    }else{
        productStore = JSON.parse(localStorage.getItem('productStore'));
    }
    return productStore;
}
function setProducts(product){
    let result = 0;
    const productStore = storage();
    productStore.forEach(item => {if(item.id === product.id) result += 1;})
    if(result < 1){
        productStore.push(product);
        localStorage.setItem('productStore',JSON.stringify(productStore));
        displayCartUI(product);
    }
}
function addtoCart(){
    const productStore =  storage();
    productStore.forEach(product => displayCartUI(product));
}
function displayCartUI(product){
    const cartshoplength = document.querySelector('.num_products_cart')
    const cartList = document.querySelector('.list-shopping');
    const ItemPrd = document.createElement('div');
    // Create new item to shop cart
    ItemPrd.classList = 'item-Prd d-flex align-items-center';
    ItemPrd.setAttribute('dataId',`${product.id}`);
    ItemPrd.innerHTML = `
        <img src="${product.pngProduct}" alt="">
        <h6>${product.titelProduct}<br>$<span class="price-product">${product.priceProduct}</span></h6>
        <i class="bi bi-trash"></i>
        <div class="counter-item text-center">
            <i class="bi bi-chevron-up"></i>
            <span class="number">0</span>
            <i class="bi bi-chevron-down"></i>
        </div>
        <div class="pricefinal" pricefinal="${product.priceProduct}"></div>
    `
    cartList.appendChild(ItemPrd);
    cartshoplength.innerText = cartList.querySelectorAll('.item-Prd').length;

    // number product
    const plusnum = ItemPrd.querySelector('.bi-chevron-up');
    const moinnum = ItemPrd.querySelector('.bi-chevron-down');
    const numproduct = ItemPrd.querySelector('.number');
    let num = parseInt(numproduct.innerText);
    let priceAll;
    plusnum.onclick = () => {
        numproduct.innerHTML = (num += 1);
        priceAllProduct();                             
        totalPrice()
    };
    moinnum.onclick = () => {
        num -= 1;
        if(num <= 0) num = 1;
        numproduct.innerHTML = num;
        priceAllProduct();
        totalPrice()
    };
    plusnum.click()

    // Remove product
    const btnremove = ItemPrd.querySelector('.bi-trash');
    btnremove.addEventListener('click',(e) => {
        removeproduct(e.target);
        totalPrice()
        cartshoplength.innerText = cartList.querySelectorAll('.item-Prd').length;
    });

    // Calculate the final price of the product
    function priceAllProduct(){
        priceAll = parseInt(plusnum.parentElement.parentElement.querySelector('.price-product').textContent) * num;
        numproduct.parentElement.nextElementSibling.setAttribute('pricefinal',priceAll)
    }

    // Calculate Total price
    function totalPrice(){
        const DomTotalprice = document.querySelector('.total-price span');
        const Dompricefinal = document.querySelectorAll('.pricefinal');
        let Results = [];
        let Totalprice = 0;
        for(let i = 0; i < Dompricefinal.length; i++){
            Results.push(parseInt(Dompricefinal[i].getAttribute('pricefinal')))
        }
        for(let i = 0; i < Results.length; i++){
            Totalprice += Results[i]
        }
        DomTotalprice.innerText = Totalprice;
    }
}
function removeproduct(product){
    const productStore = storage();
    const productId = product.parentElement.getAttribute('dataId');

    product.parentElement.remove()
    productStore.forEach((item,index) => {
        if(item.id === productId){
            productStore.splice(index,1)
        }
    })
    localStorage.setItem('productStore',JSON.stringify(productStore))
}

// Seache for products
function SearchProduct(){
    const container = document.querySelector('.search-container');
    const Allnamespoducts = document.querySelectorAll('.title-product');
    let inputValue = Inputsearch.value.toUpperCase();

    // Empty container Search
    EmptySearch()

    // if Result search true Get products
    for(let i = 0; i < Allnamespoducts.length; i++){
        if(Allnamespoducts[i].textContent.toUpperCase().split(" ").join("").indexOf(inputValue.split(" ").join("")) > -1 && inputValue !== ("") && inputValue !== " "){
            const titelPrd = Allnamespoducts[i].textContent;
            const singalItem = document.createElement('div');
            
            // Create product 
            singalItem.classList = "text-center col-xl-2 col-lg-2 col-md-4 col-sm-6";
            singalItem.innerHTML = `
            <h3>${titelPrd}</h3>
            `
            container.style.padding= "20px 0";
            container.appendChild(singalItem);
        }
    }
}
function EmptySearch(){
    const Elcontainer = document.querySelectorAll('.search-container div');
    const container = document.querySelector('.search-container');
    container.style.padding= "0px 0";
    if(Elcontainer.length > 0){
        for(let i = 0; i < Elcontainer.length; i++){
            Elcontainer[i].remove();
        }
    }
}