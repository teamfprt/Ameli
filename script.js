let p = document.createElement("p");
let submit = document.getElementById("submit");
let form = document.getElementById("myForm12");
let username = document.getElementById("input_name");
let password = document.getElementById("input_password");
let email = document.getElementById("input_email");
let phone = document.getElementById("input_phone");
let profile = document.getElementById("profile");
let h2_username = document.getElementById("h2_username");
let span_username = document.getElementById("span_username");
let span_phone = document.getElementById("span_phone");
let span_gmail = document.getElementById("span_gmail");
let span_passwrod = document.getElementById("span_password");
const show_password = document.getElementById("show_password");

if(form){
    form.addEventListener("submit",
        function(event){
            event.preventDefault();
            let check_username = document.forms["myForm"]["User"].value;
            let code = check_username.charCodeAt(0);
            let check_password = document.forms["myForm"]["password"].value;
            if(!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122)) {
                p.innerHTML = "Please enter a valid username";
                document.getElementById("add_message").appendChild(p);
                document.forms["myForm"]["User"].focus();
                event.stopPropagation();
            }
            else if(check_password.length < 8) {
                p.innerHTML = "Password must be at least 8 characters long";
                document.getElementById("add_message").appendChild(p);
                document.forms["myForm"]["password"].focus();
                event.preventDefault();
            }
            else if(check_password.length > 20) {
                p.innerHTML = "Password must be less than 20 characters long";
                document.getElementById("add_message").appendChild(p);
                document.forms["myForm"]["password"].focus();
                event.preventDefault();
            }
            else{
                sessionStorage.setItem("username", JSON.stringify(username.value));
                sessionStorage.setItem("password", JSON.stringify(password.value)); 
                sessionStorage.setItem("email", JSON.stringify(email?.value));
                sessionStorage.setItem("phone", JSON.stringify(phone?.value));
                sessionStorage.setItem("formSubmitted", "true");
                window.location.assign("index.html");
            }
        }
    );
}
if(profile){
    profile.hidden = true;
}
if(h2_username){
    h2_username.innerHTML = (JSON.parse(sessionStorage.getItem("username"))).charAt(0).toUpperCase() + (JSON.parse(sessionStorage.getItem("username"))).slice(1);
    span_username.innerHTML = (JSON.parse(sessionStorage.getItem("username"))).charAt(0).toUpperCase() + (JSON.parse(sessionStorage.getItem("username"))).slice(1);
    let width = (JSON.parse(sessionStorage.getItem("password"))).length;
    span_passwrod.innerHTML = "*".repeat(width) + " :Password";
    show_password.addEventListener("click", function() {
        if(show_password.innerHTML == "ظهور"){
        span_passwrod.innerHTML = "Password: " + (JSON.parse(sessionStorage.getItem("password")));
        show_password.innerHTML = "اخفاء";
        }
        else{
            span_passwrod.innerHTML = "*".repeat(width) + " :Password";
            show_password.innerHTML = "ظهور";
        }
    });
    if(sessionStorage.getItem("email") != 'undefined'){
        span_gmail.innerHTML = JSON.parse(sessionStorage.getItem("email"));
        span_phone.innerHTML = JSON.parse(sessionStorage.getItem("phone"));
    }
    else{
        span_gmail.innerHTML = "Email: Secured";
        span_phone.innerHTML = "Phone: Secured";
    }

}



document.addEventListener("DOMContentLoaded", function(e) {
    if(sessionStorage.getItem("formSubmitted") === "true") {
        if(document.getElementById("hiddenElement1")){
            document.getElementById("hiddenElement1").hidden = true;
            document.getElementById("hiddenElement2").hidden = true;
            profile.hidden = false;
        }
    }
});
const listCarts = {};
const arrSaved = [];
const tbodyFavorite = document.getElementById("favoritesBody");
function addFavorits(productName,price)
{
    if(sessionStorage.getItem("favorites") != null && JSON.parse(sessionStorage.getItem("favorites")).length != 0){
        let check = JSON.parse(sessionStorage.getItem("favorites"));
        let found = false;
        for(let arr in check){
            if(check[arr].name == productName){
                alert("This item is already in your favorites.");
                found = true;
                break;
            }
        }
        if(!found){
            listCarts.name = productName;
            listCarts.price = price;
            check.push(listCarts);
            sessionStorage.setItem("favorites", JSON.stringify(check));
        }
    }
    else{
        listCarts.name = productName;
        listCarts.price = price;
        arrSaved.push(listCarts);
        sessionStorage.setItem("favorites", JSON.stringify(arrSaved));
    }
}


function getFavorits(){
    return JSON.parse(sessionStorage.getItem("favorites"));
}

function saveFavorites(favorites){
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
}

function removeFavorits(index){
    if(confirm("Are you sure you want to remove this item?")){
        const favorites = getFavorits();
        if(favorites){
            favorites.splice(index, 1);
            saveFavorites(favorites);
            renderFavorites();
            location.reload();
            alert("Item removed from favorites.");
        }
    }
}

function rateItem(index, rating){
    const favorites = getFavorits();
    if(favorites){
        favorites[index].rating = rating;
        saveFavorites(favorites);
        location.reload();
        renderFavorites();
    }
}
function generateStars(rating, index){
    let stars = '';
    for(let i = 1; i <= 5; i++){
        stars += `<span class="star" onclick="rateItem(${index}, ${i})">${i <= rating ? "★" : "☆"}</span>`;
    }
    return stars;
}
function buyNow(productName){
    alert("You have purchased " + productName + " successfully.");
}

function renderFavorites(){
    const favorites = getFavorits();
    const wrapper = document.getElementById("favoritesTableWrapper");
    const emptyMessage = document.getElementById("emptyMsg");
    if(favorites?.length === 0 || favorites == null){
        wrapper.style.display = "none";
        emptyMessage.style.display = "block";
        return;
    }
    wrapper.style.display = "block";
    emptyMessage.style.display = "none";
    favorites?.forEach((item, index) => {
        const row = document.createElement("tr");
        let temp = ``;
        temp += `
        
            <td>${item.name}</td>
        <td>${item.price}</td>

        <td>
        <div class="rating">
            ${generateStars(item.rating, index)}
        </div>
        </td>
        <td><button class="btn-remove" onclick="removeFavorits(${index})">إزالة</button></td>
        <td><button class="btn-buy" onclick="buyNow('${item.name}')">شراء الآن</button></td>
        `;
        row.innerHTML = temp;
        tbodyFavorite.appendChild(row);
    });
}
if(tbodyFavorite){
    renderFavorites();
}


let ul = document.getElementById("myUL");
let input = document.getElementById('myInput');

if(input){
    ul.style.display="none";
    input.addEventListener("focusin", function(e) {
        ul.style.display="block";
    });
    input.addEventListener("focusout", function(e) {
        ul.addEventListener("mouseover", function() {
            ul.style.display="block";
        });
        ul.addEventListener("mouseout", function() {
            ul.style.display="none";
        });
    });

}
function myFunction() {
    var filter, li, a, i, txtValue ;

    li = ul.getElementsByTagName('li');
    filter = input.value;
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.indexOf(filter) > -1) {
        li[i].style.display = "block";
        } else {
        li[i].style.display = "none";
        }
    }
}
const tbodyCarts = document.getElementById("cartBody");


const list_Carts = {};
const arr_SavedCarts = [];
function addCarts(productName,price)
{
    if(sessionStorage.getItem("carts") != null && JSON.parse(sessionStorage.getItem("carts")).length != 0){
        let check = JSON.parse(sessionStorage.getItem("carts"));
        let found = false;
        for(let arr in check){
            if(check[arr].name == productName){
                check[arr].quantity += 1;
                check[arr].price += price;
                sessionStorage.setItem("carts", JSON.stringify(check));
                found = true;
            }
        }
        if(!found){
            list_Carts.name = productName;
            list_Carts.price = price;
            list_Carts.quantity = 1;
            check.push(list_Carts);
            sessionStorage.setItem("carts", JSON.stringify(check));
        }
    }
    else{
        list_Carts.name = productName;
        list_Carts.price = price;
        list_Carts.quantity =  1;
        arr_SavedCarts.push(list_Carts);
        sessionStorage.setItem("carts", JSON.stringify(arr_SavedCarts));
    }
}


function getCarts(){
    return JSON.parse(sessionStorage.getItem("carts"));
}

function saveCarts(carts)
{
    sessionStorage.setItem("carts", JSON.stringify(carts));
}

function renderCarts(){
    const carts = getCarts();
    const wrapper = document.getElementById("cartTableWrapper");
    const emptyMessage = document.getElementById("emptyMsg");
    if(carts?.length === 0 || carts == null){
        wrapper.style.display = "none";
        emptyMessage.style.display = "block";
        return;
    }
    wrapper.style.display = "block";
    emptyMessage.style.display = "none";
    carts?.forEach((item) => {
        const row = document.createElement("tr");
        let temp = ``;
        temp += `
            <td>${item.name}</td>
        <td>${item.price}</td>

        <td>
        ${item.quantity}
        </td>

        `;
        row.innerHTML = temp;
        tbodyCarts.appendChild(row);
    });
}
if(tbodyCarts){
    renderCarts();
}