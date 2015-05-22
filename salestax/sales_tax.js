var $ = function (id) {
    return document.getElementById(id); 
}
var calculate_click = function () {
	//alert ("This is the calculate_click event handler.");
	var subtotal = parseFloat( $("subtotal").value );
	var taxRate = parseFloat ( $("taxRate").value );
	if ( isNaN(subtotal) || isNaN(taxRate) ) {
		alert("Please check your statements for validity.");
		}
	else {
	// calculate results
	var salesTax = subtotal + (taxRate / 100);
	salesTax = parseFloat ( salesTax.toFixed(2) );
	var total = subtotal + salesTax;
	// display results
	$("salesTax").value = salesTax;
	$("total").value = total.toFixed(2);
	}
	}
window.onload = function () {
	//alert ("This is the window.onload event handler.");
	$("calculate").onclick = calculate_click;
	}
