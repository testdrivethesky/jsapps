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
	} else if(isNaN(dailyRate) || dailyRate < 0 || dailyRate >= 20) {
		alert("Daily rate must be a valid number that is greater than zero \nand less than or equal to twenty dollars.");
	} else if(isNaN(items) || items <= 0) {
		alert("items must be a valid number \ngreater than zero.");
	} else {
		var months = 12;
		var monthlyRate = months * dailyRate;
		var totalDue = 0;

		for ( i = 1; i <= months; i++ ) {
			totalDue = ( (items * monthlyRate) * overdue)
		}
		$("totalDue").value = totalDue.toFixed(2);
		$("rate").disabled=true;
	} 
}
var clear_click = function () {
    $("overdue").value = "";
	 $("rate").value = "";
	  $("items").value = "";
	   $("totalDue").value = "";
	   $("rate").disabled=false;
	}
window.onload = function () {
    $("calculate").onclick = calculate_click;
    $("overdue").focus();
	$("clear").onclick = clear_click;
}
