const btn_drakLight = document.querySelector('.btn_drakLight');
const Container = document.querySelector('.container');
const inputSearch = document.querySelector('.inputSearch');
const Form = document.getElementById('form');
const errUI = document.querySelector('.err');
const dataDefault = {
    avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
    bio: "This profile has no bio",
    blog: "https://github.blog",
    created_at: "25 Jan 2011",
    location: "San Francisco",
    twitter_username: null,
    name: "The Octocat",
    company: "github",
    public_repos: "8",
    followers: "4162",
    login: "octocat",
    following: "9",
    url: ""
};
const Months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Set","Oct","Nov","Dec"];


// Events
btn_drakLight.addEventListener('click',(e) => {

    document.body.classList.toggle('dark');

    const state_dt = btn_drakLight.getAttribute('status');

    state_dt === "light" 
    ? modeChange("LIGHT <img src='images/icon-sun.svg' alt=''>","dark")
    : modeChange("DARK <img src='images/icon-moon.svg' alt=''>","light"); 

})

inputSearch.addEventListener('keyup', () => errUI.style.display = "none")

Form.addEventListener('submit',submitForm);



// Functions
function modeChange (inrhtml,status) {
    btn_drakLight.innerHTML = inrhtml;
    btn_drakLight.setAttribute('status',status);
}

async function submitForm () {

    event.preventDefault();

    const Api_url = "https://api.github.com/users/";

    const inputValue = inputSearch.value;

    let restData = await GetinfoApi(Api_url + inputValue);

    Container.querySelector('.content').remove();

    HandleContent (restData);
}

async function GetinfoApi (url) {

    let dataAll;

    const data_url = await fetch(url);

    if(data_url.ok){

        dataAll = await data_url.json();

    }else{

        dataAll = dataDefault;

        errUI.style.display = "inline-block";

    }

    return dataAll
}

function HandleContent (obj) {

    const {
        avatar_url,bio,blog,created_at,followers,following,location,
        login,name,public_repos,twitter_username,company,html_url
    } = obj;

    const content = document.createElement('div');
    
    content.className = "content";

    content.innerHTML = `
        <div class="head_content">
            <img src="${avatar_url}" alt="">
            <div class="info_user">
                <h2>${name}</h2>
                <span><a href="${html_url}" target="_blank">@${login}</a></span>
                <h3>Joined ${created_at.slice(0,4) + " " + Months[parseInt(created_at.slice(5,7)) - 1] + " " + created_at.slice(8,10)}</h3>
            </div>
        </div>
        <h3 class="name_job">${bio}</h3>
        <div class="profile_num">
            <div class="rops">
                <p>Repos</p>
                <span>${public_repos}</span>
            </div>
            <div class="followers">
                <p>Followers</p>
                <span>${followers}</span>
            </div>
            <div class="folling">
                <p>Following</p>
                <span>${following}</span>
            </div>
        </div>
        <div class="other_infUser">
            <div class="${!location ? "opctyItem" : ""}">
                <img src="images/icon-location.svg" alt="">
                <h3>${!location ? "Not available" : location}</h3>
            </div>
            <div class="${!twitter_username ? "opctyItem" : ""}">
                <img src="images/icon-twitter.svg" alt="">
                <h3>${!twitter_username ? "Not available" : twitter_username}</h3>
            </div>
            <div class="${!blog ? "opctyItem" : ""}">
                <img src="images/icon-website.svg" alt="">
                <h3><a href="${blog}" target="_blank">${!blog ? "Not available" : blog}</a></h3>
            </div>
            <div class="${!company ? "opctyItem" : ""}">
                <img src="images/icon-company.svg" alt="">
                <h3>${!company ? "Not available" : company}</h3>
            </div>
        </div>
    `
    Container.appendChild(content)
}