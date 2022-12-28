
var userName = localStorage.getItem("username_storage");
var password = localStorage.getItem("password_storage");
var order = localStorage.getItem("order_storage");





/**
 * Get car by id
 */
getCarByID = async(oops) => {

    console.log("hej");

    await fetch ("http://localhost:9090/api/v1/getCarID", {
        method: 'GET',
        headers: {
        Authorization: "Basic " + btoa(userName + ":" + password),
        accept:  "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "carId":order
        }
    }).then(
       async (res)=>{
            console.log(res);
            const result = await res.json();
            console.log(result);
          carForm(result);
            
        }
    ).catch(
        (res)=>{
            console.log(res);
        }
    )


}

/**
 * Form car
 */
function carForm(cars){

    var date = new Date();

    var current_time = date.getFullYear()+"-"
        +(date.getMonth()+1)+"-"+ date.getDate()+": "
       + date.getHours()+":"+date.getMinutes();

    var return_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ (date.getDate()+3)+": "
    +date.getHours()+":"+date.getMinutes();


console.log(cars);
document.getElementById("orderForm").innerHTML =
`
<form id="formOrder">
    <label for="car_id">Car ID</label>
    <input type="text" id="car_id" name="car_id" value="${order}" readonly="readonly" />

    <label for="model">Model</label>
    <input type="text" id="model" name="model" value="${cars.model}" readonly="readonly" />

    <label for="cost_per_day">Cost/Day</label>
    <input type="text" id="cost_per_day" name="telnum" value="${cars.cost_per_day}" readonly="readonly" />

    <label for="seats">Seats</label>
    <input type="text" id="seats" name="seats" value="${cars.seats}" readonly="readonly" />

    <label for="transmission">Transmission</label>
    <input type="text" id="transmission" name="transmission" value="${cars.transmission}" readonly="readonly" />

    <label for="ac">AC</label>
    <input type="text" id="ac" name="ac" value="${cars.ac}" readonly="readonly" />

    <label for="rent_date">Rent Date (will change to the time you accept)</label>
    <input type="text" id="rent_date" name="rent_date" value="${current_time}" readonly="readonly" />

    <label for="return_date">Return Date (will change to the time you accept + 3 days)</label>
    <input type="text" id="return_date" name="return_date" value="${return_date}" readonly="readonly" />

    </form>

`

}


/**
 * Order car
 */


 orderCar = async(oops) => {
    await fetch ("http://localhost:9090/api/v1/booking/ordercar", {
        method: 'POST',
        headers: {
        Authorization: "Basic " + btoa(userName + ":" + password),
        accept:  "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "customerId": localStorage.getItem('cust_id') ,"carId":order
        } 

    }).then(
       async (res)=>{
            console.log(res);
            const result = await res.json();
            console.log(result);
            
        }
    ).catch(
        (res)=>{
            console.log(res);
        }
    )


}


getOrders = async function(){
    $.ajax({
        url: "http://localhost:9090/api/v1/booking/myorders",
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Basic " + btoa(userName + ":" + password),
            "cust_id": 1 
           
        },
        success: function(bookingArray){
            buildTable(bookingArray);
        
        }

});
}


buildTable = function(bookings){
    bookingTable = $ ('#bookingTableBody');
    bookingTable.html("");

    bookingTableHead =$('#bookingTableHead');
    bookingTableHead.html("");
    tableRow =$(`   
        <th>Username</th>
        <th>Booking ID</th>
        <th>Car ID</th>
        <th>Rent date</th>
        <th>Return date</th>
      
      `);
      bookingTableHead.append(tableRow);
    for(var i = 0; i<bookings.length; i++){
        tableRow = $(`<tr class ='bookingTableRow'> >/tr>`);
        bookingTable.append(tableRow);

        tableCell = $(`<td class='carTableCell' id='username'> </td>`);
        tableCell.html(userName);
        tableRow.append(tableCell);

        tableCell = $(`<td class='bookingTableCell' id='booking_id'> </td>`);
        tableCell.html(bookings[i].booking_id);
        tableRow.append(tableCell);

        tableCell = $(`<td class='bookingTableCell' id='car'> </td>`);
        tableCell.html(bookings[i].car.car_id);
        tableRow.append(tableCell);
        
        tableCell = $(`<td class='bookingTableCell' id='rent_date'> </td>`);
        tableCell.html(bookings[i].rent_date);
        tableRow.append(tableCell);

        tableCell = $(`<td class='bookingTableCell' id='return_date'> </td>`);
        tableCell.html(bookings[i].return_date);
        tableRow.append(tableCell);



      
    }

}

$(function(){
    $('#myorder').click(function(){

      getOrders();


      document.getElementById("bookingHead").innerHTML =
    `
    <h4 class="bookingheader"> All My Orders</h4>
    
    `
     
    });
});



/**
 * Button to comtple the order 
 */

$(function(){
    $('#order').click(function(){

    orderCar();
    
    localStorage.removeItem('order_storage');

    complete('orderDiv');

  
     
    });
});

/**
 * Clears div when order is done
 * @param {} elememendID 
 */
function complete(elememendID){
    document.getElementById(elememendID).innerHTML="";
    console.log("COMPLETE")
}

window.onload = getCarByID();