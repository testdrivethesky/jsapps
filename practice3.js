var age = prompt("Please enter your age.");
if (age == null) {
	alert ("You clicked cancel.");
	} 
	else {
		age = parseInt(age);
		if ( isNaN(age) ) {
			alert("Invalid age.");
			}
		else if (age >= 18) {
			alert("You can vote.");
			}
		else {
			alert("You cannot vote.");
			}
			}
var response = confirm("Would you like \nto continue?");
if (response) {
	alert("Thank you.");
	}
	else {
		alert("You may not continue.");
		}
	