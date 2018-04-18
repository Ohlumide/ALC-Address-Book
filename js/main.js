window.onload = function(){
    //input
    var fullName = document.getElementById("fullname");
    var phNo = document.getElementById("phno");
    var address = document.getElementById("address");
    var email = document.getElementById("email");
    
    //buttons
    var addBtn = document.getElementById("add");
    var searchBtn = document.getElementById("search");
    var showallBtn = document.getElementById("showall");

    //Divs
    var addContactDiv = document.querySelector(".addcontact");
    var showTextBox = document.querySelector("#textbox");

    addBtn.addEventListener("click", addContact);
    addContactDiv.addEventListener("click", removeEntry);
    showallBtn.addEventListener("click", showAddressBook);
    //Storage Array
    var addressBook = [];

    //localStorage["addcontact"]
    function jsonStructure(fullName, phNo, address, email){
        this.fullName = fullName;
        this.phNo = phNo;
        this.address = address;
        this.email = email;
    }

    function addContact(){
        var isNull = fullName.value!= "" && phNo.value!= "" && address.value!= "" && email.value!= "";
        if(isNull){
            //convert input to JSON structure
            var obj = new jsonStructure(fullName.value, phNo.value, address.value, email.value);
            addressBook.push(obj);
            localStorage["addcontact"] = JSON.stringify(addressBook);
            clearForm();
            showAddressBook();
        }
    }

    function removeEntry(e){
        //Remove an entry from the addressbook
        if (e.target.classList.contains("delbuttton")){
            var remID = e.target.getAttribute("data-id");
            addressBook.splice(remID,1);
            localStorage["addcontact"] = JSON.stringify(addressBook);
            showAddressBook();
        }
    }

    function clearForm(){
        var input = document.querySelectorAll(".input");
        for(var i in input){
            input[i].value = "";
        }
    }

    function showAddressBook(){
        if(localStorage["addcontact"] == undefined){
            localStorage["addcontact"] = "";
        } else {
            addressBook = JSON.parse(localStorage["addcontact"]);
            //loop over the array addressBook and insert into the page
            addContactDiv.innerHTML = "";
            for(var n in addressBook){
                var str = '<div class="entry">';
                    str += '<div class="fullName"><p>' + addressBook[n].fullName + '</p></div>';
                    str += '<div class="phone"><p>' + addressBook[n].phNo + '</p></div>';
                    str += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
                    str += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
                    str += '<div class="del"><a href="#" class="delbuttton" data-id="' + n + '">Delete</a></div>';
                    str += '</div>';
                addContactDiv.innerHTML += str;
            }  
        } 
    }

    showAddressBook();
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
