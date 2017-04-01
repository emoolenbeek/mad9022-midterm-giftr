//main.js
const mool0008 = "giftr-mool0008";
var contacts = [];
var id = "";

document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem('giftr-mool0008')) { //check localstorage for key
        console.log("localstorage key not found, creating one");
        localStorage.setItem(mool0008, JSON.stringify(contacts));
    }
    changePage();
    window.addEventListener('push', changePage);
});

function saveContact() {
    let name = document.getElementById("myName").value;
    let dob = document.getElementById("myDOB").value;
    let id = Date.now();

    let localStorageItems = localStorage.getItem(mool0008);
    let contacts = JSON.parse(localStorageItems); //parsing json

    let newPerson = {
        id: id,
        fullname: name,
        DOB: dob,
        ideaList: []
    }

    contacts.push(newPerson);
    localStorage.setItem(mool0008, JSON.stringify(contacts));

    removeEventsPeople();

    console.log("Contact saved");
}

function saveGift() {
    //let name = document.getElementById("myName").value;
    //let dob = document.getElementById("myDOB").value;
    //let id = Date.now();
    //let localStorageItems = localStorage.getItem(mool0008);
    //let contacts = JSON.parse(localStorageItems); //parsing json
//    let newGift = {
//        id: id,
//        name: name,
//        DOB: dob,
//        ideaList: []
//    }
    removeEventsGifts();
    console.log("Gift saved");
}

function cancel() {
    var personButton = document.getElementById("personButton");
    if (document.getElementById("personButton")) {
        removeEventsPeople();
    } else {
        removeEventsGifts();
    }
}

function addEventsPeople() {
    var saveButton = document.getElementById("saveButton");
    var cancelButton = document.getElementById("cancelButton");
    x.addEventListener('touchend', removeEventsPeople);
    saveButton.addEventListener('touchend', saveContact);
    cancelButton.addEventListener('touchend', cancel);
    console.log("people events added!");
}

function removeEventsPeople() {
    var saveButton = document.getElementById("saveButton");
    var cancelButton = document.getElementById("cancelButton");
    var x = document.getElementById("x");
    saveButton.removeEventListener('touchend', saveContact);
    cancelButton.removeEventListener('touchend', cancel);
    x.removeEventListener('touchend', removeEventsPeople);
    console.log("people events removed!");
    document.getElementById("myName").value = "";
    document.getElementById("myDOB").value = "";
    showPeople();

}

function addEventsGifts() {
    var saveButton = document.getElementById("saveButton");
    var cancelButton = document.getElementById("cancelButton");
    x.addEventListener('touchend', removeEventsGifts);
    saveButton.addEventListener('touchend', saveGift);
    cancelButton.addEventListener('touchend', cancel);
    console.log("gift events added!");
}

function removeEventsGifts() {
    var saveButton = document.getElementById("saveButton");
    var cancelButton = document.getElementById("cancelButton");
    var x = document.getElementById("x");
    saveButton.removeEventListener('touchend', saveGift);
    cancelButton.removeEventListener('touchend', cancel);
    x.removeEventListener('touchend', removeEventsGifts);
    console.log("gift events removed!");
    //document.getElementById("myName").value = "";
    //document.getElementById("myDOB").value = "";
}

function changePage() {
    var x = document.getElementById("x");
    var personButton = document.getElementById("personButton");
    var giftButton = document.getElementById("giftButton");
    if (document.getElementById("personButton")) {
        console.log("index.html - showing people");
        personButton.addEventListener('touchend', addEventsPeople);

        showPeople();
    } else if (document.getElementById("giftButton")) {
        console.log("two.html - showing gifts");
        giftButton.addEventListener('touchend', addEventsGifts);

        showGifts();
    }
}

function showPeople() {
    let localStorageItems = localStorage.getItem(mool0008);
    let contacts = JSON.parse(localStorageItems); //parsing json
    if (contacts.length >= 1) {
        let content = document.getElementById("contentIndex");
        content.innerHTML = "";
        let ul = document.createElement("ul");
        ul.className = "table-view";
        ul.id = "contact-list";
        content.appendChild(ul);

        contacts.forEach(function (element) {
            let li = document.createElement("li");
            let span1 = document.createElement("span");
            let span2 = document.createElement("span");
            let a1 = document.createElement("a");
            let a2 = document.createElement("a");
            li.className = "table-view-cell";
            li.id = element.id;
            span1.className = "name";
            a1.href = "#personModal";
            if (element.fullname == "") {
                a1.innerHTML = "unknown";
            } else {
                a1.innerHTML = element.fullname;
            }
            a2.id = "gifts";
            a2.className = "navigate-right pull-right";
            a2.href = "two.html";
            span2.className = "dob";
            if (element.DOB == "") {
                span2.innerHTML = "invalid DOB";
            } else {
                span2.innerHTML = element.DOB;
            }
            span1.appendChild(a1);
            a2.appendChild(span2);
            li.setAttribute("data-id", element.id);
            li.appendChild(span1);
            li.appendChild(a2);
            ul.appendChild(li);
            a2.addEventListener('touchstart', current);
            //console.log(element);
        });
    } else {
        let content = document.getElementById("contentIndex");
        content.innerHTML = "";
        let div = document.createElement("div");
        div.id = "center";
        div.innerHTML = "Nobody to display";
        content.appendChild(div);
    }
}

function showGifts() {
    console.log("showing gifts for: " + id);
    let localStorageItems = localStorage.getItem(mool0008);
    let contacts = JSON.parse(localStorageItems); //parsing json
    let content = document.getElementById("contentGifts");
    content.innerHTML = "";



    contacts.forEach(function (element) {
        if (element.id == id && element.ideaList.length >= 1) {
            console.log("ya");
            let ul = document.createElement("ul");
            ul.className = "table-view";
            ul.id = "contact-list";
            content.appendChild(ul);
//            element.ideaList.forEach(function (gift) {
//                console.log(gift);
//            });
        }

    });
}

function current(ev) {
    let a = ev.currentTarget;
    id = a.parentElement.getAttribute("data-id");
    console.log("data-id: " + id);
}
