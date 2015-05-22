window.console && console.log(new Date());
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

var renewElig = function () {
	var grades = $("grades").value;
	switch ( grades ) {
		case "4":
		case "3":
			alert("Eligible for renewal. Please contact Librarian.");
			break;
		case "2":
			alert("May be eligible for renewal. Please contact Librarian.");
			break;
		case "1":
			alert("Not eligible for renewal.");
			break;
		}
		return grades;
	}
	
window.onload = function () {
    $("calculate").onclick = calculate_click;
	$("clear").onclick = clear_click;
	$("overdue").onchange = totalChange;
	$("grades").onchange = renewElig;
}
