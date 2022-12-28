
var userName = localStorage.getItem("username_storage");
var password = localStorage.getItem("password_storage");

/**
 * SEE ORDER
 */

function test(car_id){
    localStorage.setItem('order_storage', car_id)
    console.log(car_id);
    


     $('#main').load("/order.html");     
    }





/**
 * Show all Cars
 */

getCars = async function(){
    $.ajax({
        url: "http://localhost:9090/api/v1/getCar",
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Basic " + btoa(userName + ":" + password)
           
        },
        success: function(carArray){
            buildTable(carArray);
        
        }

});
}


buildTable = function(cars){
    carTable = $ ('#carTableBody');
    carTable.html("");

    carTableHead =$('#carTableHead');
    carTableHead.html("");
    var tableRow = $('<tr></tr>');   
    tableRow.append('<th onclick="sortTable(0)">Model</th>'); 
    tableRow.append('<th onclick="sortTable(1)">Name</th>');
    tableRow.append('<th onclick="sortTable(2)">Cost per Day</th>'); 
    tableRow.append('<th onclick="sortTable(3)">Seats</th>');
    tableRow.append('<th onclick="sortTable(4)">Transmission</th>') ;
    tableRow.append('<th onclick="sortTable(5)">AC</th>') 
    tableRow.append('<th onclick="sortTable(6)">Car id</th>') ;
      
      
      carTableHead.append(tableRow);
   
    for(var i = 0; i<cars.length; i++){
        tableRow = $(`<tr class ='carTableRow'> >/tr>`);
        carTable.append(tableRow);

        tableCell = $(`<td class='carTableCell' id='model'> </td>`);
        tableCell.html(cars[i].model);
        tableRow.append(tableCell);
        
        tableCell = $(`<td class='carTableCell' id='name'> </td>`);
        tableCell.html(cars[i].name);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='cost_per_day'> </td>`);
        tableCell.html(cars[i].cost_per_day);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='seats'> </td>`);
        tableCell.html(cars[i].seats);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='transmission'> </td>`);
        tableCell.html(cars[i].transmission);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='ac'> </td>`);
        tableCell.html(cars[i].ac);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='carId'> </td>`);
        tableCell.html(cars[i].car_id);
        tableRow.append(tableCell);

    }

}

$(function(){
    $('#showAllCars').click(function(){

      getCars();


      document.getElementById("carHead").innerHTML =
    `
    <h4 class="carheader"> All Cars </h4>
    
    `
     
    });
})

/**
 * Show available Cars
 */

getAvailableCars = async function(){
 
    $.ajax({
        url: "http://localhost:9090/api/v1/booking/cars",
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": "Basic " + btoa(userName+ ":" + password)
           
        },
        success: function(carArray){
            buildAvailableTable(carArray);
        
        }

});
}



buildAvailableTable = function(cars){
    carTable = $ ('#carTableBody');
    carTable.html("");

    carTableHead =$('#carTableHead');
    carTableHead.html("");
    var tableRow = $('<tr></tr>');   
    tableRow.append('<th onclick="sortTable(0)">Model</th>'); 
    tableRow.append('<th onclick="sortTable(1)">Name</th>');
    tableRow.append('<th onclick="sortTable(2)">Cost per Day</th>'); 
    tableRow.append('<th onclick="sortTable(3)">Seats</th>');
    tableRow.append('<th onclick="sortTable(4)">Transmission</th>') ;
    tableRow.append('<th onclick="sortTable(5)">AC</th>') 
    tableRow.append('<th onclick="sortTable(6)">Car id</th>') ;
    tableRow.append('<th> .</th>');
      
      carTableHead.append(tableRow);
   
    for(var i = 0; i<cars.length; i++){

        tableRow = $(`<tr class ='carTableRow'> >/tr>`);
        carTable.append(tableRow);

        tableCell = $(`<td class='carTableCell' id='model'> </td>`);
        tableCell.html(cars[i].model);
        tableRow.append(tableCell);
        
        tableCell = $(`<td class='carTableCell' id='name'> </td>`);
        tableCell.html(cars[i].name);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='cost_per_day'> </td>`);
        tableCell.html(cars[i].cost_per_day);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='seats'> </td>`);
        tableCell.html(cars[i].seats);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='transmission'> </td>`);
        tableCell.html(cars[i].transmission);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='ac'> </td>`);
        tableCell.html(cars[i].ac);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell' id='carId'> </td>`);
        tableCell.html(cars[i].car_id);
        tableRow.append(tableCell);

        tableCell = $(`<td class='carTableCell'> <button onclick="test(${cars[i].car_id})">Order</button></td>`);
        
        tableRow.append(tableCell);
  
        }
        
}


$(function(){
    $('#showAvailableCars').click(function(){
        console.log(localStorage.getItem("username_storage"));
        getAvailableCars();
     

      document.getElementById("carHead").innerHTML =
    `
    <h4 class="carheader"> Available Cars </h4>
    
    `
     
    });
});


/**
 * Sort table, den verkar nu tro min andra rad är header vilket blir lite fel. 
 * Fixa om tid finns
 *///sort
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("myTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
   



