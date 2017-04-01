/**/
const mool0008 = "giftr-mool0008";
var contacts = [];
var id = "";
var giftID = "";

document.addEventListener('deviceready', init);

function init() {
    if (!localStorage.getItem('giftr-mool0008')) { //check localstorage for key
        console.log("localstorage key not found, creating one");
        localStorage.setItem(mool0008, JSON.stringify(contacts));
    } else {
        contacts = JSON.parse(localStorage.getItem(mool0008));
    }
    changePage();
    window.addEventListener('push', changePage);
}

function saveContact() {
    let name = document.getElementById("myName").value;
    let dob = document.getElementById("myDOB").value;
    let personid = document.getElementById('myName').getAttribute('data-id');
    console.log(personid);
    if (personid == 0) {
        personid = Date.now();
        //add
        var newPerson = {
            id: personid,
            fullname: name,
            DOB: dob,
            ideaList: []
        }
        contacts.push(newPerson);
    } else {
        //edit
        var index = -1;
        console.dir(contacts);
        contacts.forEach(function (person, idx) {
            console.dir('all contacts:', person);
            if (person.id == personid) {
                index = idx;
            }
        });
        contacts[index].fullname = name;
        contacts[index].DOB = dob;
    }

    localStorage.setItem(mool0008, JSON.stringify(contacts));
    removeEventsPeople();

    console.log("Contact saved");
}

function saveGift() {
    let gift = document.getElementById("myGift").value;
    let price = document.getElementById("myPrice").value;
    let store = document.getElementById("myStore").value;
    let url = document.getElementById("myURL").value;
    let giftID = Date.now();

    let localStorageItems = localStorage.getItem(mool0008);
    contacts = JSON.parse(localStorageItems); //parsing json

    let newGift = {
        id: giftID,
        gift: gift,
        price: price,
        store: store,
        URL: url
    }


    if (newGift.gift != "") {
        contacts.forEach(function (person) {
            if (person.id == id) {
                person.ideaList.push(newGift);
                localStorage.setItem(mool0008, JSON.stringify(contacts));
                console.log("Gift saved");
                //                var str = "Hello world!";
                //                var res = str.substring(7, 4);
                //                console.log(res);
            }

        });
    }
    removeEventsGifts();
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
    document.getElementById("myURL").value = "http://";
}

function removeEventsGifts() {
    var saveButton = document.getElementById("saveButton");
    var cancelButton = document.getElementById("cancelButton");
    var x = document.getElementById("x");
    saveButton.removeEventListener('touchend', saveGift);
    cancelButton.removeEventListener('touchend', cancel);
    x.removeEventListener('touchend', removeEventsGifts);
    console.log("gift events removed!");
    showGifts();
    document.getElementById("myGift").value = "";
    document.getElementById("myPrice").value = "";
    document.getElementById("myStore").value = "";
    document.getElementById("myURL").value = "http://";


}

function changePage() {
    //var x = document.getElementById("x");
    var personButton = document.getElementById("personButton");
    var giftButton = document.getElementById("giftButton");
    if (document.getElementById("personButton")) {
        console.log("index.html - showing people");
        personButton.addEventListener('touchend', function () {
            document.getElementById("myName").setAttribute('data-id', 0);
            addEventsPeople();
        });


        console.log('changepage', contacts);
        showPeople();
    } else if (document.getElementById("giftButton")) {
        console.log("two.html - showing gifts");
        giftButton.addEventListener('touchend', addEventsGifts);

        showGifts();
    }
}

function compare(a, b) {
    if (a.DOB.substring(5) < b.DOB.substring(5)) return -1;
    if (a.DOB.substring(5) > b.DOB.substring(5)) return 1;
    return 0;
}

function showPeople() {
    //let localStorageItems = localStorage.getItem(mool0008);
    //let contacts = JSON.parse(localStorageItems); //parsing json

    //console.log("CONTACTS", contacts);

    console.log('showpeople', contacts);
    // sort by DOB
    console.log(typeof contacts);
    contacts.sort(compare);
    localStorage.setItem(mool0008, JSON.stringify(contacts));
    //contacts = JSON.parse(localStorageItems);

    console.log("CONTACTS", contacts);

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
            //li.id = element.id;
            span1.className = "name";
            a1.href = "#personModal";
            a1.setAttribute('data-id', element.id);
            a1.addEventListener('touchend', edit);
            if (element.fullname == "") {
                a1.innerHTML = "unknown";
            } else {
                a1.innerHTML = element.fullname;
            }
            a2.id = "gifts";
            a2.className = "navigate-right pull-right";
            a2.href = "two.html";
            span2.className = "dob";
            //if (element.DOB == "") {
            //    span2.innerHTML = "invalid DOB";
            //} else {
            var input = element.DOB;
            var momentInput = moment(input, "YYYY-MM-DD");
            var momentOutput = momentInput.format("MMM D");

            span2.innerHTML = momentOutput;
            //}
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
        div.innerHTML = "Nobody to display..";
        content.appendChild(div);
    }
}

function showGifts() {
    console.log("showing gifts for: " + id);
    let localStorageItems = localStorage.getItem(mool0008);
    contacts = JSON.parse(localStorageItems); //parsing json
    let content = document.getElementById("contentGifts");

    content.innerHTML = "";



    contacts.forEach(function (person) {
        if (person.id == id && person.fullname != "") {
            let name = document.createElement("h1");
            name.className = "content-padded";
            name.textContent = person.fullname + "'s idea list";
            content.appendChild(name);
        }

    });

    contacts.forEach(function (person) {
        if (person.id == id && person.ideaList != "") {
            let ul = document.createElement("ul");
            ul.className = "table-view";
            ul.id = "contact-list";
            content.appendChild(ul);

            person.ideaList.forEach(function (gift) {
                let li = document.createElement("li");
                let span1 = document.createElement("span");
                let span2 = document.createElement("span");
                let a1 = document.createElement("a");
                let a2 = document.createElement("a");
                let p = document.createElement("p");
                let h3 = document.createElement("h3");
                let a = document.createElement("a");
                a.href = gift.URL;
                a.innerHTML = gift.URL;
                h3.innerHTML = "<br />" + gift.gift + "<br />";
                if (gift.URL.length > 7) {
                    p.appendChild(a);
                }
                
                p.innerHTML += "<br />" + gift.store;
                p.innerHTML += "<br />" + gift.price;



                li.className = "table-view-cell media";
                li.id = gift.id;
                span1.className = "giftName";
                a1.href = "#giftModal";


                a2.id = "editGifts";
                a2.className = "icon icon-trash pull-right midline";
                span1.appendChild(h3);
                span1.appendChild(p);
                li.setAttribute("data-id", gift.id);
                li.appendChild(span1);
                li.appendChild(a2);
                ul.appendChild(li);
                a2.addEventListener('touchstart', removeGift);


            });

        } else if (person.id == id && person.ideaList <= 1) {
            //content.innerHTML = "";
            let div = document.createElement("div");
            div.id = "center";
            div.innerHTML = "No gifts to display..";
            content.appendChild(div);
        }

    });

}

function removeGift(ev) {
    let localStorageItems = localStorage.getItem(mool0008);
    contacts = JSON.parse(localStorageItems); //parsing json

    let a = ev.currentTarget;
    let giftID = a.parentElement.getAttribute("data-id");

    contacts.forEach(function (person, x) {
        if (person.id == id) {
            person.ideaList.forEach(function (gift, i) {
                if (gift.id == giftID) {
                    contacts[x].ideaList.splice(i, 1);
                }
            });
            localStorage.setItem(mool0008, JSON.stringify(contacts));
        }

    });

    showGifts();
    console.log("gift removed");
}

function current(ev) {
    let a = ev.currentTarget;
    id = a.parentElement.getAttribute("data-id");
}

function edit(ev) {
    var anchor = ev.currentTarget;
    var person = anchor.getAttribute('data-id');
    document.getElementById("myName").setAttribute('data-id', person);
    addEventsPeople();
    let localStorageItems = localStorage.getItem(mool0008);
    contacts = JSON.parse(localStorageItems); //parsing json

    let a = ev.currentTarget;
    let ok = a.parentElement; //.getAttribute("data-id");
    id = ok.parentElement.getAttribute("data-id");
    console.log("ya " + id);



    contacts.forEach(function (person) {
        if (person.id == id) {
            document.getElementById("myName").value = person.fullname;
            document.getElementById("myName").setAttribute('data-id', id);
            document.getElementById("myDOB").value = person.DOB;
        }

    });

}
