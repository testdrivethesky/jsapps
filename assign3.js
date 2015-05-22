var $ = function (id) {
    return document.getElementById(id);
}

var calculate_click = function () {
    var overdue = parseInt( $("overdue").value );
    var dailyRate = parseFloat( $("rate").value );
    var items = parseInt( $("items").value );
	$("totalDue").value = "";
	
	if (isNaN(overdue) || overdue <= 0) {
		alert("Days overdue must be a valid number\nand greater than zero.");
	} else if(isNaN(dailyRate) || dailyRate < 0) {
		alert("Rate must be a valid number.");
	} else if(isNaN(items) || items < 0) {
		alert("Items must be a valid number.");
	} else {
		var months = 12;
		var monthlyRate = months * dailyRate;
		var totalDue = 0;

		for ( i = 1; i <= months; i++ ) {
			totalDue = ( (items * monthlyRate) * overdue );
		}
		$("totalDue").value = totalDue.toFixed(2);
	} 
}
var clear_click = function () {
    $("overdue").value = "";
	 $("rate").value = "";
	  $("items").value = "";
	   $("totalDue").value = "";
	}
var totalChange = function () {
	calculate_click();
}
window.onload = function () {
    $("calculate").onclick = calculate_click;
	$("clear").onclick = clear_click;
	$("overdue").onchange = totalChange;
}
