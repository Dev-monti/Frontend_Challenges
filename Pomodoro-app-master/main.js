const btns_Break = document.querySelectorAll('.break-mode button')
const btn_Pomodora = document.querySelector('.btn-pomodora');
const btn_Start = document.querySelector('.btn-start');
const counter_UI = document.querySelector('.counter_ui');
const progress__circle = document.querySelector('.progress__circle');

const setting_icon = document.querySelector('.setting_icon');
const inptsSF = document.querySelectorAll('.inpt-SF');

let dataTimer = {
    pomodoro: 25,
    shortbreak: 5,
    longbreak: 15,
    colorUI: "#f87070"
}

let type_counter = "pomodoro";
let counterState = false;


// EVENTS ------------
btns_Break.forEach(btn => btn.addEventListener('click',btnSelectionTimer));

btn_Start.addEventListener('click',playTimerPomodoro);

setting_icon.addEventListener('click',formOpen);


// FUNCTIONS ------------

function btnSelectionTimer () {

    pauseTimer();

    const btnTarget = event.target;

    const color_El = dataTimer.colorUI;

    const btnActive = document.querySelector('.break-mode button.active');

    btnActive.style.backgroundColor = "transparent";

    btnActive.classList.remove('active')

    btnTarget.classList.add('active');

    const munitesUI = dataTimer[btnTarget.getAttribute('type_target')];
    
    counter_UI.innerHTML = (munitesUI > 9 ? munitesUI : "0" + munitesUI )+ ": 00";

    progress__circle.style.stroke = color_El;

    btnTarget.style.backgroundColor = color_El;

    type_counter = btnTarget.getAttribute('type_target');

    counterState = false;
}


function playTimerPomodoro () {

    const btnType = btn_Start.getAttribute('data_state');

    if(btnType === "start"){
        startTimer()
    }else{
        pauseTimer()
    }
}


function startTimer () {

    let constMunites = dataTimer[type_counter];
    let munites =  constMunites - 1;
    let seconds = 60;
    let stockOffset = 750;
    let circleLength = stockOffset / ((munites + 1) * 60);

    counterState = true;

    btn_Start.setAttribute('data_state','pause');
    btn_Start.innerHTML = "Pause";

    const startInterval = setInterval(() => {

        if(counterState){

            seconds--;

            stockOffset -= circleLength;

            counter_UI.innerHTML = `
                ${munites > 9 ? munites : "0" + munites} : ${seconds > 9 ? seconds : "0" + seconds}
            `;

            progress__circle.style.strokeDashoffset = stockOffset;

            if(seconds === 0){

                munites--;

                if(munites !== -1){

                    seconds = 60;

                    dataTimer[type_counter] = munites + 1;

                }else{

                    dataTimer[type_counter] = constMunites;

                    document.querySelector('.audio').play();

                    pauseTimer();
                }
            }
        }else{
            clearInterval(startInterval)
        }

    },1000)
}

function pauseTimer () {

    btn_Start.setAttribute('data_state','start');

    btn_Start.innerHTML = "Start";

    counterState = false;
}


function formOpen () {

    const item = event.target;

    const formUI = item.parentElement.querySelector('.form-setting');
    formUI.classList.add('show');

    const closeIcon = formUI.querySelector('.close-form');
    closeIcon.addEventListener('click',() => formUI.classList.remove('show'));

    const btnApply = formUI.querySelector('.btn_apply');
    btnApply.addEventListener('click',() => {
        formUI.classList.remove('show');
        btn_Pomodora.click();
    });

    const inputsValue = formUI.querySelectorAll('input');
    inputsValue.forEach(input => {
        input.value = dataTimer[input.name];
        input.addEventListener('keyup',() => dataTimer[input.name] = input.value)
    });

    const btnsColor = formUI.querySelectorAll('.colors ul li');
    btnsColor.forEach(btn => btn.addEventListener('click',() => {
        dataTimer.colorUI = btn.getAttribute('data_Color');
        btnApply.style.backgroundColor = btn.getAttribute('data_Color');
    }));

}
