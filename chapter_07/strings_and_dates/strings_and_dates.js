var $ = function (id) {
    return document.getElementById(id); 
}

	var email_click = function () {
	var emailAddress = $("email").value;
	var atLocale = emailAddress.indexOf("@");
	var dotLocale = emailAddress.indexOf(".");
	if (atLocale == -1) {
		alert ( "A valid email address must include an @ sign." );
		} 
	else if ( dotLocale < atLocale ) {
		alert ( "A valid email address must include a period after the @ sign." );
		}
	else {
		postDot = emailAddress.substring(atLocale);
		alert ( postDot );
		}
} 

	var date_click = function () {
		var dateEntry = $("date").value;
		var firstSlash = dateEntry.indexOf("/");
		var secondSlash = dateEntry.indexOf("/", firstSlash + 1);
		if ( firstSlash != 2  || secondSlash != 5) {
			alert ( "A valid date must be in this format: mm/dd/yyyy." )
		}
		else {
			var date = new Date(dateEntry);
			var year = date.getFullYear();
			var startDate = new Date(year - 1, 11, 31);
			var dayOfYear = parseInt((date.getTime() - startDate.getTime()) / 86400000);
			alert ("This is day " + dayOfYear + " in the year " + year + ".");
			}
} 

window.onload = function () {
    $("processEmail").onclick = email_click;
	$("processDate").onclick = date_click;
}