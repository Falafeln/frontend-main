
var userName = localStorage.getItem("username_storage");
var password = localStorage.getItem("password_storage");


/**
 * Get USER ACTIVE ORDERS
 * 
 */

getActiveOrders = async function(){
    $.ajax({
        url: "http://localhost:9090/api/v1/booking/activeorders",
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Basic " + btoa(userName + ":" + password),
            "username": userName
           
        },
        success: function(bookingArray){
            buildTable(bookingArray);
        
        }

});
}



/**
 *  Get ALL USER ORDERS
 */

getOrders = async function(){
    $.ajax({
        url: "http://localhost:9090/api/v1/booking/myorders",
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Basic " + btoa(userName + ":" + password),
            "cust_id": localStorage.getItem('cust_id')
           
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
        <th> </th>
        <th> </th>
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

        tableCell = $(`<td class='bookingTableCell'> <button onclick="updateOrd(${bookings[i].booking_id})">Update</button></td>`);
        tableRow.append(tableCell);

        tableCell = $(`<td class='bookingTableCell'> <button onclick="exchange(${bookings[i].booking_id})">EXCHANGE</button></td>`);
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

$(function(){
    $('#activeOrder').click(function(){

      getActiveOrders();


      document.getElementById("bookingHead").innerHTML =
    `
    <h4 class="bookingheader"> All My Active Orders</h4>
    
    `
     
    });
});


/***
 * Update order
 * 
 */
function updateOrd(booking_id){

    var number =parseInt(prompt("How many days do you want to change rent date too?", ""));
    if (isNaN(number)) {
      
    }
   
      else {
        localStorage.setItem('booking_storage', booking_id);
        localStorage.setItem('days', number);
        updateOrder(); 
      }
    
   



}


updateOrder = async function(){
    $.ajax({
        url: "http://localhost:9090/api/v1/booking/updateorder/",
        method: "PUT",
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Basic " + btoa(userName + ":" + password),
            "booking_id": localStorage.getItem('booking_storage') , "day": localStorage.getItem('days')
           
        },
        success: function(bookingArray){
            buildTable(bookingArray);
        
        }

});
}

/**
 * Exchange
 
 */


exchange = async function(booking){
    $.ajax({
        url: "http://localhost:9090/api/v1/booking/exchange",
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Basic " + btoa(userName + ":" + password),
            "bookingId": booking
           
        },
        success: 
            /**
             * Något annat kommer ske i success
             */
           
            function (results){ 
               
                console.log(results);
                exchangeres(results);
            
        }

});
}

function exchangeres(results){

    carTable = $ ('#carTableBody');
    carTable.html("");

    carTableHead =$('#carTableHead');
    carTableHead.html("");
    tableRow =$(`  
    <th>Booking ID</th>
     <th>Car id</th>
   
     <th>Rent date</th>
      <th>Return date</th>
      <th>Days</th>
      <th>Cost per day Euro</th>
      <th>Cost per Day in SEK</th>
      <th> Total Cost Euro</th>
      <th> Total Cost SEK</th>
      `);
      carTableHead.append(tableRow);
     
        tableRow = $(`<tr class ='carTableRow'> >/tr>`);
        carTable.append(tableRow);

        tableCell = $(`<td class='carTableCell' id='booking_id'> </td>`);
        tableCell.html(results.booking.booking_id);
        tableRow.append(tableCell);
        
        tableCell = $(`<td class='carTableCell' id='car_id'> </td>`);
        tableCell.html(results.booking.car.car_id);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='rent_date'> </td>`);
        tableCell.html(results.booking.rent_date);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='return_date'> </td>`);
        tableCell.html(results.booking.return_date);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='days'> </td>`);
        tableCell.html(results.exchange.days);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='euro'> </td>`);
        tableCell.html(results.exchange.euro);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='sek'> </td>`);
        tableCell.html(results.exchange.sek);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='totaleuro'> </td>`);
        tableCell.html(results.exchange.totalEuro);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='totalSek'> </td>`);
        tableCell.html(results.exchange.totalSEK);
        tableRow.append(tableCell);
  
}


function header(){
    document.getElementById("carHead").innerHTML =
    `
    <h4 class="carheader"> Available Cars </h4>
    
    `

}

function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}