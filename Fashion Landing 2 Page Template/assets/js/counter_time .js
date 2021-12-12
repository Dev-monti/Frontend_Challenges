// Time Crazy Sale Ends
const timesend = document.querySelectorAll(".times-ends span"); 
const stratminutes = 37;
let time = stratminutes * 60;
times = () => {
    const munites = Math.floor(time / 60);
    let seconds = time % 60;
    timesend[2].innerHTML = munites;
    timesend[3].innerHTML = seconds;
    time--;
}
setInterval(times, 1000); 