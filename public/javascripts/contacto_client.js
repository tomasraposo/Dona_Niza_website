$(document).ready(function() {
    var err = "An error has occurred while loading the page. Please refresh your browser";
    $.getScript("/javascripts/index_client.js")
		.fail(function() {
	    	$("header").html(err);
	});
});	
