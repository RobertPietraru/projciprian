document.getElementById('loginButton').addEventListener('click', login);
document.getElementById('registerButton').addEventListener('click', register);
document.getElementById('logoutButton').addEventListener('click', logout);
document.getElementById('itemForm').addEventListener('submit', addItemFormSubmit);
document.getElementById('searchBar').addEventListener('input', function() {
    var query = this.value.toLowerCase();
    filterItems(query);
});

let currentUser = null;
//The Login function
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (username && password) {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username] && users[username].password === password) {
            currentUser = username;
            document.getElementById('currentUser').textContent = currentUser;
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('loggedInContent').style.display = 'block';
            document.getElementById('informations').style.display = 'none';
            loadItems();
            localStorage.setItem('currentUser', currentUser);
        } else {
            alert('Invalid username or password');
        }
    }
}

//The register funciton

function register() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (username && password) {
        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (!users[username]) {
            users[username] = { password: password, items: [] };
            localStorage.setItem('users', JSON.stringify(users));
            alert('User registered successfully');
        } else {
            alert('User already exists');
        }
    }
}

//Logout function, it just stops displaying the list and displays the login screen...


function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('loggedInContent').style.display = 'none';
    document.getElementById('itemList').innerHTML = '';
    document.getElementById('informations').style.display = 'block';
    
}

function addItemFormSubmit(e) {
    e.preventDefault();
    
    if (!currentUser) return;

    var itemName = document.getElementById('itemName').value;
    var itemDescription = document.getElementById('itemDescription').value;
    var itemStatus = document.getElementById('itemStatus').value;
    var itemImageFile = document.getElementById('itemImage').files[0];
    var itemId = Date.now().toString(); // Unique ID for each item

    if (itemImageFile) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var itemImage = event.target.result;
            addItem(itemId, itemName, itemDescription, itemImage, itemStatus);
            saveItem(itemId, itemName, itemDescription, itemImage, itemStatus);
        };
        reader.readAsDataURL(itemImageFile);
    } else {
        addItem(itemId, itemName, itemDescription, '', itemStatus);
        saveItem(itemId, itemName, itemDescription, '', itemStatus);
    }

    // Clear form fields
    document.getElementById('itemForm').reset();
}

//This is the function to add and delete items from the list

function addItem(id, name, description, image, status) {
    var itemList = document.getElementById('itemList');

    var item = document.createElement('div');
    item.classList.add('item', status);
    item.setAttribute('data-id', id); // Set a data attribute for the item's ID

    if (image) {
        var itemImage = document.createElement('img');
        itemImage.src = image;
        itemImage.alt = name;
        item.appendChild(itemImage);
    }

    var itemDetails = document.createElement('div');

    var itemName = document.createElement('h3');
    itemName.textContent = name;
    itemDetails.appendChild(itemName);
    
    var itemDescription = document.createElement('p');
    itemDescription.textContent = description;
    itemDetails.appendChild(itemDescription);
    
    var itemStatus = document.createElement('span');
    itemStatus.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    itemDetails.appendChild(itemStatus);

    item.appendChild(itemDetails);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        deleteItem(id, item);
    });
    item.appendChild(deleteButton);

    itemList.appendChild(item);
}

//These are for the site to remember the list

function saveItem(id, name, description, image, status) {
    var users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[currentUser].items) {
        users[currentUser].items = [];
    }
    users[currentUser].items.push({ id, name, description, image, status });
    localStorage.setItem('users', JSON.stringify(users));
}

function deleteItem(id, itemElement) {
    var users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[currentUser]) {
        users[currentUser].items = users[currentUser].items.filter(item => item.id !== id);
        localStorage.setItem('users', JSON.stringify(users));
        itemElement.remove();
    }
}



function loadItems() {
    var users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[currentUser] && users[currentUser].items) {
        users[currentUser].items.forEach(item => {
            addItem(item.id, item.name, item.description, item.image, item.status);
        });
    }
}

//This is for the searchbar

function filterItems(query) {
    var items = document.querySelectorAll('.item');
    items.forEach(item => {
        var itemName = item.querySelector('h3').textContent.toLowerCase();
        var itemDescription = item.querySelector('p').textContent.toLowerCase();
        if (itemName.includes(query) || itemDescription.includes(query)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

//This is for the loginform

document.addEventListener('DOMContentLoaded', function() {
    const savedCurrentUser = localStorage.getItem('currentUser');
    if (savedCurrentUser) {
        currentUser = savedCurrentUser;
        document.getElementById('currentUser').textContent = currentUser;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('loggedInContent').style.display = 'block';
        loadItems();
    }
});
