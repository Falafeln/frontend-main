$(function(){
    $('#minknapp').click(function(){
        $('#main').load("/index.html");
     
    });
});

$(function(){
    $('#minknapp1').click(function(){
        $('#main').load("/cars.html");
     
    });
});



$(function(){
    $('#minknapp3').click(function(){
        $('#main').load("/customer.html");
     
    });
});

$(function(){
    $('#minknapp4').click(function(){
        $('#main').load("/login.html");
     
    });
});

$(function(){
    $('#logout').click(function(){
       loggedOutUser();
     
    });
});

  
function loggedInUser(){
    var hyper = document.getElementById("hyper");
    hyper.value ='my value';
    hyper.innerHTML=
    `
    <li><button id="minknapp1" class="navButton">Car Rental</button></li>
    <li><button id="minknapp3" class="navButton" value="my value">${localStorage.getItem("username_storage")}</button></li>
    <li><button id="logout" class="navButton">Log out</button></li>
    `

    ;
} 

function loggedOutUser(){

    localStorage.clear();

    var hyper = document.getElementById("hyper");
    hyper.value ='my value';
    hyper.innerHTML=
    `
    <li><button id="minknapp4" class="navButton" value="my value">Login</button></li>
    
    `
    window.location.reload();
    ;


}

$(function(){
    $('#submitLogin').click(function(){
        
        console.log("hej");  
        var userName = document.getElementById('userName').value;
        var password = document.getElementById('password').value;
        
        $.ajax({
            url: "http://localhost:9090/api/v1/login",
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": "Basic " + btoa(userName + ":" + password)
               
            },
                success: function(){
                    localStorage.setItem('username_storage',userName);
                    localStorage.setItem('password_storage',password);
                    loggedInUser();
                    getUserByUserName();
                    $('#main').load("/customer.html");
            },
                error: function(){
                    alert("WRONG USERNAME OR PASSWORD!");
            }
            
        })
    });
});

/**
 * Funktion för att få user_id från username som sedan ska sparas i storage
 */

getUserByUserName = async() => {

    console.log("hej");

    await fetch ("http://localhost:9090/api/v1/findUserWithUsername", {
        method: 'GET',
        headers: {
        accept:  "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "username":localStorage.getItem('username_storage')
        }
    }).then(
       async (res)=>{
            console.log(res);
            const result = await res.json();
            console.log(result.cust_id);
            localStorage.setItem('cust_id', result.cust_id)
       
            
        }
    ).catch(
        (res)=>{
            console.log(res);
        }
    )


}


