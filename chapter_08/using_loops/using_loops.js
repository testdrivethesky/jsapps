var $ = function (id) {
    return document.getElementById(id);
}


var finding_average = function() {
	var total = 0, count = 0, number;
	alert("Enter the numbers to average. Enter any non-number to stop.");
	
//	 while ( !isNaN(number) ) {
//		total += number;
//		count++;
//		number = parseFloat( prompt("Enter another number") );
//	}
//	var average = total / count;
//	if ( isNaN(average) ) {
//		alert("You didn't enter any numbers.");
//	} else {
//		alert("The average is: " + average);
//	}
//}

	do { 
		number = parseFloat( prompt("Enter a number") );
		if ( !isNaN(number) ) {
			total += number;
			count++;
		}
	} while ( !isNaN(number) )
		
		var average = total / count;
		if ( isNaN(average) ) {	
			alert("You didn't enter any numbers.");
		} else {	
			alert("The average is: " + average);
		} 
}



var random_number = function ( min, max, digits ) {

    digits = isNaN(digits) ? 0 : parseInt(digits);

   
    if ( digits < 0 ) {
        digits = 0;
    } else if ( digits > 16 ) {
        digits = 16;
    }
    
    if ( digits == 0 ) {
        
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    } else {
       
        var rand = Math.random() * ( max - min ) + min;
        return parseFloat( rand.toFixed(digits) );
    }
}


var rolling_six = function() {
	var total = 0, max = -Infinity;
	var rolls;
	for ( var count = 1; count <= 10000; count++ ) {
		rolls = 1;
		while ( random_number(1, 6) != 6 ) {
			rolls++;
		}
		total += rolls;
		if ( rolls > max ) max = rolls;
	}
	var average = total / count;
	alert ("Average rolls: " + average +
	       "\nMax rolls: " + max);
}


var finding_primes = function() {
	var primeList = "The prime numbers from 1 through 100 are:\n";
	for ( var number = 1; number <= 100; number++ )
	{
		var prime = true;
	for ( var i = 2; i < number; i++ ) {
		if ( number % i == 0 ) {
		prime = false;
		break;
		} 
	}
	if (prime) {
		primeList += number;
		primeList += "  ";
	}
}
	alert (primeList);
}


var process_test_scores = function () {
	var testScore;
	var scoreCount = 0;
	var scoreTotal = 0; 
	var bestScore = -Infinity;
	var worstScore = +Infinity;
		do { 
		testScore = parseInt(prompt(
		"Enter a valid test score between 0 and 100.\n" + 
		"To end test score entry, enter 999.", 999));
		if ( !isNaN(testScore) && testScore >= 0 && testScore <=100) {
		$("lastScore").value = testScore;
		scoreCount++;
		$("scoreCount").value = scoreCount;
		scoreTotal += testScore;
		$("scoreTotal").value = scoreTotal;
		scoreAverage = (scoreTotal/scoreCount).toFixed();
		$("scoreAverage").value = scoreAverage;
		if (testScore < worstScore) worstScore = testScore;
		if (testScore > bestScore) bestScore = testScore;
		$("bestScore").value = bestScore;
		$("worstScore").value = worstScore;
		} 
	} //end 
	while ( testScore !== 999) ;
	
} 
window.onload = function () {
     finding_average();
	 rolling_six();
	 finding_primes();
	 process_test_scores();
}