const castomVlue = document.querySelector('.castom-vlue');
const percents = document.querySelector('.form-percent');
const percentsInput = percents.querySelectorAll('input');
const numPerson = document.querySelector('.num-person');
const bill = document.querySelector('.input-bill');
const btnRest = document.querySelector('.btn-rest');
const tipAccount = document.querySelector('.account-value');
const Total = document.querySelector('.total-value');

// Btn rest
btnRest.addEventListener('click',submitRest)
// Entry precent input value
castomVlue.addEventListener('keyup',(e) => percents.setAttribute('value_target',`${e.target.value}`))
// Entry precent button value
percentsInput.forEach(el => {
    el.addEventListener('click',(e) => {
        percents.setAttribute('value_target',`${parseInt(e.target.value)}`)
        document.querySelector('input.clicked') && document.querySelector('input.clicked').classList.remove("clicked");
        el.classList.add('clicked')
    })
});
// Get inputs value and Calculation function push
function submitRest () {
    const billvalue = bill.value;
    let numerPrs = numPerson.value;
    const precent = percents.getAttribute('value_target');
    Calculation(billvalue,parseInt(precent),numerPrs)
}
// Calcule and show rest
function Calculation (bill,tip,number) {
    let tipAmount = bill * tip / 100 / number;
    let total = (bill / number) + tipAmount;
    tipAccount.innerText = `$${isNaN(tipAmount)? 0 : tipAmount}`;
    Total.innerText = `$${isNaN(total)? 0 : Math.floor(total)}`;
}
