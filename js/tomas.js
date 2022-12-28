/***Functions */
function register(){
    loginForm.style.left = "-320px";
    registerForm.style.left="1px";
    buttonForm.style.left ="20px";
}

function slideLogin(){
    loginForm.style.left="-46px";
    registerForm.style.left ="-1px";
    buttonForm.style.left="20px";
}

function showStart(){  
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/api/v1/currentuser', true);
    xhr.onload  = function () {
        const responseData = JSON.parse(xhr.responseText);
        sessionStorage.setItem('userId', responseData.id);
        console.log(responseData);
        return responseData;

    } 
    xhr.withCredentials=true;
    xhr.send();
    document.getElementById("main-frame").innerHTML =
    `
    <div class="p-header"> text random skit </div>
    <p class = "p-text"> mer random </p>
    `
}


function getAllCars() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/api/v1/cars', true);
    xhr.onload = function () {
        const responseData =JSON.parse(xhr.responseText);
        return responseData;
    }
    xhr.withCredentials = true;
    xhr.send();

}

function showAllCars(){
    if(document.getElementById('slide-frame')){
        document.getElementById('slide-frame').remove();
    }
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/api/v1/getCar', true);
    xhr.onload = function(){
        const responseData = JSON.parse(xhr.responseText);
        let sortedCars = [];
        sortedCars = getSortedCars(responseData, sortedCars);
        let sortedCarsJSON = JSON.parse(JSON.stringify(sortedCars));
        document.getElementById("main-frame").innerHTML = 
        `
       ${sortedCarsJSON.map(carTemplate).join('')}
        `
        let button = document.querySelectorAll(".car-button-book")
        button.forEach((btn)=>{
            btn.addEventListener("click", () => {
              let getNode = event.currentTarget.id; 
              
              for (let i = 0; i<button.length; i ++){
                if(getNode == button[i].id){
                    let tempArray = sortedCars;
                    console.log(tempArray);

                    tempArray.sort(function(a, b){
                        return a.id - b.id;
                    });
                    let index = tempArray.findIndex(i => i.id ==getNode);

                    sessionStorage.setItem('carId', tempArray[index].id);
                    sessionStorage.setItem('model', tempArray[index].model);
                    sessionStorage.setItem('price', tempArray[index].price);
                }
              }
            });
            
        });
    }
    xhr.withCredentials = true;
    xhr.send();
}

function getSortedCars(responseData, sortedCars){
    sortedCars = responseData.sort((a,b)=>{
        if(a.name > b.name){
            return 1;
        }else{
            return -1;
        }
    });
    return sortedCars;
}

/***Login */
function login(){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/api/v1login', true);
    xhr.onload = function () {
        const responseData = JSON.parse(xhr.responseText);
        console.log(responseData);
        document.getElementById("main-frame").innerHTML = loginTemplate();
    }
    xhr.withCredentials = true;
    xhr.send();
}