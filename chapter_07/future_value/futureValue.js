var $ = function (id) {
    return document.getElementById(id);
}

var random_number = function ( min, max, digits ) {
    // If digits is not a number, set it to zero
    // Otherwise, make it a whole number
    digits = isNaN(digits) ? 0 : parseInt(digits);

    // Make sure digits is between 0 and 16
    if ( digits < 0 ) {
        digits = 0;
    } else if ( digits > 16 ) {
        digits = 16;
    }
    
    if ( digits == 0 ) {
        // Return an integer
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    } else {
        // Return a decimal with the specified number of digits
        var rand = Math.random() * ( max - min ) + min;
        return parseFloat( rand.toFixed(digits) );
    }
}

var calculate_click = function () {
    var investment = parseFloat( $("investment").value );
    var annualRate = parseFloat( $("rate").value );
    var years = parseInt( $("years").value );
	//random?
	var investment = random_number (1000, 5000);
		$("investment").value = investment;
	var annualRate = random_number (3.5, 12);
		annualRate = annualRate.toFixed(2);
		$("rate").value = annualRate;
	var years = random_number (1, 50);
		$("years").value = years;
	$("futureValue").value = "";
	
	if (isNaN(investment) || investment <= 0) {
		alert("Investment must be a valid number\nand greater than zero.");
	} else if(isNaN(annualRate) || annualRate <= 0) {
		alert("Annual rate must be a valid number\nand greater than zero.");
	} else if(isNaN(years) || years <= 0) {
		alert("Years must be a valid number\nand greater than zero.");
	} else {
		annualRate = annualRate / 100;
		var futureValue = investment;

		for ( i = 1; i <= years; i++ ) {
			futureValue = futureValue * (1 + annualRate);
				if ( futureValue == Infinity ) {
					alert ( "Future Value equals infinity.  " + "i=" + i );
					i = years;
				alert ( "The maximum value in JavaScript is" + Number.MAX_VALUE.toPrecision(3) + "." ); 
				}
		}
		futureValue = futureValue.toFixed(2);
		var deciPlace = futureValue.indexOf(".");
		var cents = futureValue.substring(deciPlace + 1, deciPlace + 3);
		var hundreds = futureValue.substring(deciPlace - 3, deciPlace);
		var thousands = "";
		var millions = "";
		if (deciPlace < 6) {
			thousands = futureValue.substring(0, deciPlace -3);
			millions = "";
		}//??correct?
		else {
			thousands = futureValue.substring(deciPlace - 6, deciPlace - 3);
			millions = futureValue.substring(0, deciPlace - 6);
		}
		var futureValueFormatted = "";
		if (deciPlace >= 7) {
			futureValueFormatted = "$" + millions + "," + thousands + "," + hundreds + "." + cents;
		} else {
			futureValueFormatted = "$" + thousands + "," + hundreds + "." + cents;
		}
		$("futureValue").value = futureValueFormatted;
		
	}
}

window.onload = function () {
    $("calculate").onclick = calculate_click;
    $("investment").focus();
}
