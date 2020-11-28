/*
Name: Aaron Gedz
Course Name: ICT 4510 Adv Web Design
Date: 8/19/2020
Description: 

This script is to validate user information using a fetch call. 

The majority of the work performed in this script is hiding the div's depending on what button is clicked

The same modal is used for the Login, Logout, Create, and Remove, button but the contents of the modal change depending on
what button is clicked to open it

*/

$(document).ready(async function () {
    document.getElementById("loginSuccessBanner").style.overflow = "visible";
    document.getElementById("displayMenu").style.display = "none";
    if (sessionStorage.getItem('data') != null) {
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("loginSuccessContainer").style.display = "block";
        document.getElementById("loginSuccessBanner").style.overflow = "hidden";
        document.getElementById("displayMenu").style.display = "block";
        document.getElementById("login").style.display = "none";
        document.getElementById("create").style.display = "block";
        document.getElementById("remove").style.display = "block";
        document.getElementById("logout").style.display = "block";

        var apiKey = JSON.parse(sessionStorage.getItem('data')).user.api_key;
        var menu = await fetch("https://ict4510.herokuapp.com/api/menus?api_key=" + apiKey)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    document.getElementById("menuItem").innerHTML = "Menu items could not be retrieved";
                    throw new Error(response.status);
                }
            })
            .then(data => JSON.stringify(data))
            .then(data => menu = JSON.parse(data));
        console.log(menu);

        var menuItems = "";
        for (var i = 0; i < menu.menu.length; i++) {
            console.log(menu.menu[i].item);
            menuItems += "Item: " + menu.menu[i].item + "<br>" +
                "Description: " + menu.menu[i].description + "<br>" +
                "Price: " + menu.menu[i].price + "<br><br>";
        }

        var menuItemID = "";
        for (var i = 0; i < menu.menu.length; i++) {
            console.log(menu.menu[i].item);
            menuItemID += "ID: " + menu.menu[i].id + "<br>" +
                menu.menu[i].item + ", " +
                menu.menu[i].description + ", " +
                menu.menu[i].price + "<br>";
        }

        document.getElementById("menuItems").innerHTML = menuItems;
        document.getElementById("menuItemID").innerHTML = menuItemID;
        //document.getElementById("welcomeback").innerHTML = "Welcome back " + userFirstName;
    } else {
        return false;
    }
});

document.getElementById("myBtn").addEventListener("click", getData);
document.getElementById("myBtnMenu").addEventListener("click", getData);

document.getElementById("create").addEventListener("click", () => {
    document.getElementById("loginSuccessContainer").style.display = "none";
    document.getElementById("removeItem").style.display = "none";
    document.getElementById("createItem").style.display = "block";
    document.getElementById("logoutMenu").style.display = "none";
});

document.getElementById("remove").addEventListener("click", async () => {
    document.getElementById("loginSuccessContainer").style.display = "none";
    document.getElementById("createItem").style.display = "none";
    document.getElementById("removeItem").style.display = "block";
    document.getElementById("logoutMenu").style.display = "none";

    document.getElementById("myBtnRemove").addEventListener("click", async () => {
        let apiKey = JSON.parse(sessionStorage.getItem('data')).user.api_key;
        console.log(apiKey);

        let token = JSON.parse(sessionStorage.getItem('data')).user.token;
        console.log(token);

        const itemId = document.getElementById("itemID").value;

        const removeURL = "https://ict4510.herokuapp.com/api/menus?api_key=" + apiKey + "&id=" + itemId;

        let removeOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }

        await fetch(removeURL, removeOptions);
        
        document.getElementById("removeSuccess").innerHTML = "Menu item " + itemId + " has been removed";

    });
});

document.getElementById("logout").addEventListener("click", () => {
    document.getElementById("create").style.display = "none";
    document.getElementById("remove").style.display = "none";
    document.getElementById("logout").style.display = "none";
    document.getElementById("removeItem").style.display = "none";
    document.getElementById("createItem").style.display = "none";
    document.getElementById("login").style.display = "block";
    document.getElementById("logoutMenu").style.display = "block";
    document.getElementById("loginSuccessBanner").style.overflow = "visible";
    document.getElementById("loginSuccessContainer").style.display = "none";
    document.getElementById("displayMenu").style.display = "none";
    sessionStorage.removeItem('data');
});

document.getElementById("login").addEventListener("click", () => {
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("logoutMenu").style.display = "none";
});

async function postData() {

    const userData = sessionStorage.getItem('data');

    const url = 'https://ict4510.herokuapp.com/api/login';

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const item = document.getElementById("item").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;

    let user = {
        username: username,
        password: password
    }

    let options = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (!userData) {
        await fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Username or Password not found - Please try again");
                    throw new Error(response.status);
                }
            })
            .then(json => sessionStorage.setItem('data', JSON.stringify(json)));

        document.getElementById("loginContainer").style.display = "none";
        var userFirstName = JSON.parse(sessionStorage.getItem('data')).user.first_name;
        //document.getElementById("welcomeback").innerHTML = "Thank you for logging in " + userFirstName + ". Enjoy your session!";
        document.getElementById("loginSuccessBanner").style.display = "block";
        document.getElementById("loginSuccessBanner").style.overflow = "hidden";
        document.getElementById("displayMenu").style.display = "block";
        document.getElementById("loginSuccessContainer").style.display = "block";
        document.getElementById("remove").style.display = "block";
        document.getElementById("logout").style.display = "block";
        document.getElementById("create").style.display = "block";
        document.getElementById("login").style.display = "none";

        var apiKey = JSON.parse(sessionStorage.getItem('data')).user.api_key;
        var menu = await fetch("https://ict4510.herokuapp.com/api/menus?api_key=" + apiKey)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    document.getElementById("menuItem").innerHTML = "Menu items could not be retrieved";
                    throw new Error(response.status);
                }
            })
            .then(data => JSON.stringify(data))
            .then(data => menu = JSON.parse(data));
        console.log(menu);

        var menuItems = "";
        for (var i = 0; i < menu.menu.length; i++) {
            console.log(menu.menu[i].item);
            menuItems += "Item: " + menu.menu[i].item + "<br>" +
                "Description: " + menu.menu[i].description + "<br>" +
                "Price: " + menu.menu[i].price + "<br><br>";
        }

        var menuItemID = "";
        for (var i = 0; i < menu.menu.length; i++) {
            console.log(menu.menu[i].item);
            menuItemID += "ID: " + menu.menu[i].id + "<br>" +
                menu.menu[i].item + ", " +
                menu.menu[i].description + ", " +
                menu.menu[i].price + "<br>";
        }

        document.getElementById("menuItems").innerHTML = menuItems;
        document.getElementById("menuItemID").innerHTML = menuItemID;
    } else {

        let apiKey = JSON.parse(sessionStorage.getItem('data')).user.api_key;
        console.log(apiKey);

        let token = JSON.parse(sessionStorage.getItem('data')).user.token;
        console.log(token);

        const menuURL = "https://ict4510.herokuapp.com/api/menus?api_key=" + apiKey;

        let menu = {
            item: item,
            description: description,
            price: price
        }

        let menuOptions = {
            method: 'POST',
            body: JSON.stringify(menu),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }

        await fetch(menuURL, menuOptions)
            .then((response) => {
                if (response.ok) {
                    console.log(response.text);
                    document.getElementById("errorHandling").innerHTML = "Menu item submitted " + item;
                    return response.json();
                } else {
                    console.log(response.text);
                    document.getElementById("errorHandling").innerHTML = "Error submitting menu item";
                    throw new Error(response.status);
                }
            });
    }
}

async function getData() {
    const getData = await postData();
    return getData;
}









