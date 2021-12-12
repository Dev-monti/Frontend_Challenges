const filtering = document.querySelector('.filtering');
const Alljob = document.querySelector('.All-job');
let AllData = [];
let tags = [];

window.addEventListener('load',async () => {
    AllData = await getinfoJob();
    handleJobs(AllData);
})

async function getinfoJob () {
    const getData = await fetch('./data.json');
    const data = await getData.json();
    return data
}

function clickTag (name) {
    handleTag(name);
    FilteringJobs()
}

function removeTag () {
    const el = event.target;
    tags = tags.filter(item => item !== el.previousElementSibling.innerText);
    tags.length === 0 && filtering.classList.remove('show');
    el.parentElement.remove();
    FilteringJobs()
}

function clearAlltags () {
    tags = [];
    filtering.querySelector('div').innerHTML = "";
    filtering.classList.remove('show');
    FilteringJobs()
}

function FilteringJobs () {
    let newData = [];
    AllData.forEach(item => {
        let valueFlt = 0;
        const SearchTags = [item.role,item.level,...item.languages,...item.tools];
        tags.forEach(tag => SearchTags.includes(tag) && (valueFlt += 1))
        valueFlt === tags.length && newData.push(item)
    })
    handleJobs(newData)
}

function handleJobs (data) {
    Alljob.innerHTML = "";
    data.forEach(el => Alljob.appendChild(jobUI(el)))
}

function jobUI (job) {
    const {id,company,logo,neww,featured,position,role,level,postedAt,contract,location,languages,tools} = job;
    const Singaljob = document.createElement('div');
    Singaljob.classList = "row col-xl-12 col-lg-12 col-md-12 singal-job";
    Singaljob.setAttribute('id',id);
    Singaljob.innerHTML = `
        <div class="col-xl-6 col-lg-6 col-md-10 desc-job">
            <img src="${logo}" alt="${company}">
            <div class="info-job">
                <div class="head-info-job">
                    <h4>${company}</h4>
                    ${neww?`<span>!NEW</span>` : ""}
                    ${featured?`<span>FEATURED</span>` : ""}
                </div>
                <h3>${position}</h3>
                <p class="timePlace-job">${postedAt}<span>.</span> ${contract}<span>.</span>${location}</p>
             </div>
        </div>
        <div class="col-xl-6 col-lg-6 col-md-10 skills-job">
            <a href="#" onclick="clickTag(this.text)">${role}</a>
            <a href="#" onclick="clickTag(this.text)">${level}</a>
            ${languages.map(el => `<a href="#" onclick="clickTag(this.text)">${el}</a>`).join('')}
            ${tools.map(el => `<a href="#" onclick="clickTag(this.text)">${el}</a>`).join('')}
        </div>
    `
    return Singaljob
}


function handleTag (name) {
    if(!tags.includes(name)){
        filtering.classList.add('show');
        filteringUI(name);
        tags.push(name);
    }
}

function filteringUI (skill) {
    const containerTags = document.querySelector('.tag-filter')
    const content = document.createElement('div');
    const nameTag = document.createElement('span');
    nameTag.appendChild(document.createTextNode(skill))
    const closeIcn = document.createElement('img');
    closeIcn.setAttribute('src','images/icon-remove.svg');
    closeIcn.addEventListener('click',removeTag)
    content.appendChild(nameTag);
    content.appendChild(closeIcn);
    containerTags.appendChild(content);
}
