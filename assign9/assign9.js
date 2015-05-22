window.console && console.log(new Date());
var $ = function (id) {
    return document.getElementById(id);
}
var calculate_future_value = function ( overdue, dailyRate, items ){
	if (overdue <= 0 || dailyRate <= 0 || items <= 0 ) {
		throw new Error("Please check your entries for validity");
		}
	var months = 12;
	var monthlyRate = months * dailyRate;
	var totalDue = 0;
		for ( i = 1; i <= months; i++ ) {
			totalDue = ( (items * monthlyRate) * overdue );
		}
	return totalDue.toFixed(2);
	}
var calculate_click = function () {
    try {
	var overdue = parseInt( $("overdue").value );
    var dailyRate = parseFloat( $("rate").value );
    var items = parseInt( $("items").value );
	
	$("totalDue").value = calculate_future_value(overdue, dailyRate, items);
	}
		catch(error)
			{
			alert(error.message);
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
