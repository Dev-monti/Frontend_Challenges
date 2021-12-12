// list color
const listcolor = ["#E1341E","#F6DA09","#02FD77","#FC7D03","#0382FC","#FC0306","#4C7157","#029F90"];

// variables
const windowContacts = document.querySelector('.list-contact');
const listContacts = document.querySelector('.group-items');
const SearchHead = document.querySelector('.search-fullname');
const fromInputs = document.querySelector('#form');
const hero_body = document.querySelector('.hero')

// Navigating between sections
const btnsHead = document.querySelectorAll('.btn-head');
for(let i = 0; i < btnsHead.length; i++){
    btnsHead[i].onclick = () => {
        const btnactive = document.querySelector('.btn-head.active');
        const sectionactive = document.querySelector('.hero .active');
        btnactive.classList.remove('active');
        btnsHead[i].classList.add('active');
        sectionactive.classList.remove('active');
        document.querySelector(`.${btnsHead[i].getAttribute('linkto')}`).classList.add('active');
    }
}
SearchHead.addEventListener('click',() => btnsHead[1].click())

// Classes: -------------------------
// contact Class: Represents a contact
class contact {
    constructor(flName, email, cmpJob, address, numTel, note) {
        this.flName = flName;
        this.email = email;
        this.cmpJob = cmpJob;
        this.address = address;
        this.numTel = numTel;
        this.note = note;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayContacts(){
        const Contacts = Store.getcontact();
        Contacts.forEach((contact) => UI.Createcontact(contact));
    }
    static Createcontact(contact){
        const person = document.createElement('div');

        person.classList = 'col-12 justify-content-between align-items-center singal-person';
        person.innerHTML = `
            <div class="d-flex align-items-center name-person">
                <span>${contact.flName.charAt(0).toUpperCase()}</span>
                <h4 class="flname">${contact.flName}</h4>
            </div>
            <h5>${contact.email}</h5>
            <h5>${contact.numTel}</h5>
            <div class="position-relative">
                <i class="bi bi-three-dots-vertical" data_click="close"></i>
                <ul class="dots other-actions"> 
                    <li class="btn-view"><i class="bi bi-eye"></i>View</li>
                    <li><i class="bi bi-star"></i>Favorite</li>
                    <li class="btn-edit"><i class="bi bi-pencil"></i>Edit</li>
                    <li class="btn-remove"><i class="bi bi-trash"></i>Remove</li>
                </ul> 
            </div>
        `;
        listContacts.appendChild(person);

        // Style first letter from full bame
        const indexColor = Math.floor(Math.random() * listcolor.length);
        const first_L = person.querySelector('div div span');
        first_L.style.background = `${listcolor[indexColor]}`;

        // Setting
        const btnDots = person.querySelector('.bi-three-dots-vertical');
        btnDots.addEventListener('click',(e) => settingContact(e))

        // Display contact info 
        const btn_view = person.querySelector('.btn-view');
        btn_view.addEventListener('click',() => {
            const num_tel = btn_view.parentElement.parentElement.previousElementSibling.textContent;
            UI.viewItem(num_tel)
        })

        // Remove contact
        const btn_remove = person.querySelector('.btn-remove');
        btn_remove.addEventListener('click',(e) => UI.removeItem(e))

        // Edit contact
        const btn_edit = person.querySelector('.btn-edit'); // editItem
        btn_edit.addEventListener('click',(e) => UI.editItem(e))

        // Contacts length
        contactsLength()
    }
    static clearFields(){
        const inputsForm = document.querySelectorAll('.input-form');
        for(let i = 0; i < inputsForm.length; i++){
            inputsForm[i].value = '';
        }
    }
    static viewItem(numCantact){
        let Contacts = Store.getcontact()
        let contactInfo = Contacts.filter(contact => contact.numTel === numCantact);

        const container_info = document.createElement('div');
        container_info.className = "view-contact";
        container_info.innerHTML = `
            <div class="content-view">
                <i class="bi bi-x-lg"></i>
                <ul>
                    <li>${contactInfo[0].flName}</li>
                    <li><i class="bi bi-telephone"></i>${contactInfo[0].numTel}</li>
                    <li><i class="bi bi-envelope"></i>${contactInfo[0].email}</li>
                    <li><i class="bi bi-building"></i>${contactInfo[0].cmpJob}</li>
                    <li><i class="bi bi-geo-alt"></i>${contactInfo[0].address}</li>
                    <li><i class="bi bi-chat-right"></i>${contactInfo[0].note}</li>
                </ul>
            </div>
        `
        hero_body.appendChild(container_info);
        const liAll = container_info.querySelectorAll('li'); 
        liAll.forEach(li => {if(li.textContent === "") li.remove()})

        const btnclose = container_info.querySelector('.bi-x-lg');
        btnclose.addEventListener('click',() => btnclose.parentElement.parentElement.remove())
    }
    static removeItem(e){
        const Contacts = Store.getcontact();
        const btn_remove = e.target;
        const nem_tel = btn_remove.parentElement.parentElement.previousElementSibling.textContent;

        btn_remove.parentElement.parentElement.parentElement.remove();
        Contacts.forEach((contact,index) => {
            if(contact.numTel === nem_tel){
                Contacts.splice(index,1)
            }
        });
        localStorage.setItem('Contacts',JSON.stringify(Contacts));

        Alert("alert-success","Deleted successfully");

        contactsLength()
    }
    static editItem(e){
        const edit = e.target;
        const num_tel = edit.parentElement.parentElement.previousElementSibling.textContent;
        
        const Contacts = Store.getcontact();
        Contacts.forEach((item,index) => {
            if(item.numTel === num_tel){
                formEdit(item,index)
            }
        })

        function formEdit(item,index){
            const editContact = document.createElement('div');
            editContact.classList = "edit-contact";
            editContact.innerHTML = `
                <div class="row content-edit">
                    <div class="col-xl-6 col-lg-6 col-md-12">
                        <label for=""></label>
                        <input class="inpt-flname" type="text" value="${item.flName}">
                        <label for="">Email</label>
                        <input class="inpt-email" type="text" value="${item.email}">
                        <label for="">Company name</label>
                        <input class="inpt-cmpjob" type="text" value="${item.cmpJob}">
                        <label for="">Address</label>
                        <input class="inpt-address" type="text" value="${item.address}">
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12">
                        <label for="">Number phone</label>
                        <input class="inpt-numtel" type="text" value="${item.numTel}">
                        <label for="">Notes</label>
                        <textarea class="inpt-note" rows="5">${item.note}</textarea>
                        <button class="btn-save">Edit</button>
                        <button class="btn-cancel">cancel</button>
                    </div>
                </div>
            `
            hero_body.appendChild(editContact);

            const btnCancel = editContact.querySelector('.btn-cancel');
            btnCancel.onclick = () => editContact.remove()

            const btnSave = editContact.querySelector('.btn-save');
            btnSave.onclick = () => {
                const flName = editContact.querySelector('.inpt-flname').value;
                const email = editContact.querySelector('.inpt-email').value;
                const cmpJob = editContact.querySelector('.inpt-cmpjob').value;
                const address = editContact.querySelector('.inpt-address').value;
                const numTel = editContact.querySelector('.inpt-numtel').value;
                const note = editContact.querySelector('.inpt-note').value;

                const newEdit = new contact(flName, email, cmpJob, address, numTel, note)
                Contacts.splice(index,1,newEdit)
                localStorage.setItem('Contacts',JSON.stringify(Contacts));

                btnCancel.click()
                document.querySelectorAll('.singal-person').forEach(div => div.remove());
                UI.displayContacts()
            }
        }
    }
    static searchContact(){
        if(listContacts.childElementCount){
            const searchValue = SearchHead.value.toUpperCase().trim();
            const Allcontact = listContacts.querySelectorAll('.singal-person');
            listContacts.querySelectorAll('.flname').forEach(el => {
                if(el.textContent.toUpperCase().indexOf(searchValue) > -1){
                    el.parentElement.parentElement.style.display = "flex";
                }else{
                    el.parentElement.parentElement.style.display = "none";
                }
            })
        }
    }
}

// Store class: handles contacts from Store
class Store {
    static getcontact(){
        let Contacts;
        if(localStorage.getItem('Contacts') === null){
            Contacts = [];
        }else{
            Contacts = JSON.parse(localStorage.getItem('Contacts'));
        }
        return Contacts;
    }
    static addcontact(contact){
        const Contacts = Store.getcontact();
        Contacts.push(contact);
        localStorage.setItem('Contacts',JSON.stringify(Contacts));
    }
}

// Events: -------------------------------------
document.addEventListener('DOMContentLoaded',UI.displayContacts());

fromInputs.addEventListener('submit',(e) => {
    e.preventDefault()

    // Get form values
    const flName = document.querySelector('#flname').value;
    const email = document.querySelector('#email').value;
    const cmpJob = document.querySelector('#com_job').value;
    const address = document.querySelector('#address').value;
    const numTel = document.querySelector('#num_phone').value;
    const note = document.querySelector('#note').value;

    // Push Inputs Value to new object
    const newContact = new contact(flName, email, cmpJob, address, numTel, note);

    // If the input values true
    if(newContact.flName !== "" && newContact.email !== "" && newContact.numTel !== ""){

        // Addtrue()
        const Contacts = Store.getcontact();
        let T = 0;
         
        // Verify if the phone number exists
        if(Contacts.length === 0){
            Addtrue()
        }else{
            Contacts.forEach(item => { if(item.numTel === newContact.numTel) T += 1 })
            if (T === 0) Addtrue()
            else Alert("alert-danger","The number already exists")
        }
    }
    else{
        Alert("alert-danger","There is an empty field")
    }

    // Add new contact
    function Addtrue(){
        // Add new info contact to localStirage
        Store.addcontact(newContact);

        // Create new contact
        UI.Createcontact(newContact);

        // Clear from Inputs
        UI.clearFields();

        // display message when Add and Remove
        Alert("alert-success","Added successfully");
    }

});

SearchHead.addEventListener('keyup',() => UI.searchContact());

// function: --------------
function settingContact(e){
    const itemBtn = e.target;
    const Dots = itemBtn.nextElementSibling;
    document.onclick = (e) => { 
        if(e.target === itemBtn){
            if(document.querySelector('.dots.view')){
                document.querySelector('.dots.view').classList.remove('view')
            }
            Dots.classList.toggle('view')
        }else{
            if(document.querySelector('.dots.view')){
                document.querySelector('.dots.view').classList.remove('view')
            }
        }
    }
}

function contactsLength(){
    const Contacts = Store.getcontact();
    const numContacts = document.querySelector('.btn-list span');
    numContacts.innerHTML = Contacts.length;
}

function Alert(color,text){
    const modaladd = document.querySelector('.modal-add');
    const Alert = document.createElement('div');

    // Create Alert and display
    Alert.classList = `alert text-center ${color}`;
    Alert.appendChild(document.createTextNode(text));
    modaladd.appendChild(Alert);
    setTimeout(function(){Alert.remove()},1500)
}