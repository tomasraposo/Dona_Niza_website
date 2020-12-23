$(document).ready(function() {
    var err = "An error has occurred while loading the page. Please refresh your browser";
	$.getScript("/javascripts/index_client.js")
		.fail(function() {
	    	$("header").html(err);
		});
	document.getElementsByClassName("more-icon").src = "/images/more-icon-green.svg";
	$(window).on("resize", function() {
		$("table").css("width", $(".container").width());
		responsiveResizingRowHeight();
	});
	
	$(".read-more-clickable").on("click", function(e) {
		e.preventDefault();
		var readMoreId = $(this).attr("id");
		var buttonsIds = document.getElementsByClassName("read-more-button");
		var buttonId="";
		if (readMoreId==="C") buttonId=buttonsIds[0].id;
		else buttonId=buttonsIds[1].id;
		var tableAttr = $("table").css("display");
		displayTableOnClick(tableAttr, buttonId);
    });
});

function responsiveResizingRowHeight() {
	var tables = document.getElementsByTagName("table");
	new Array().forEach(tables => (table) => {
   		var cellsNum = $(table+"td").length;   
		for (var i=0; i<cellsNum; i++) {
			var cell = $(table).find("td:eq("+i.toString()+")");
			var cellVal = cell.text();
			canvas = document.createElement("canvas");
			context = canvas.getContext("2d");
			context.font = $(table).css("font-size")+$("body").css("font-family");
			width = context.measureText(cellVal).width;
			formattedWidth = Math.ceil(width);
			if (formattedWidth > (($(".container").width()/2)+20)) cell.css("height", "66px");
			else cell.css("height", "33px");
		}
	});
}

function displayTableOnClick(tableAttr, buttonId) {
	var width = window.matchMedia('(max-width: 640px)');
	var tableC = $("table.crato").css("display");
	var tableA = $("table.arinto").css("display");
	var bottleA = document.getElementsByClassName("bottle-mockup")[1];
	var infoA = document.getElementsByClassName("info")[1];
	$(".container").css("grid-template-rows", "auto")
	if (buttonId=="C" && tableC=="none") {
		$("#C.read-more-arrow").css("transform",  "scaleY(-1)");
		if (width.matches) {
			$("table.crato").css({'display' : 'table', 'grid-row' : '3', 'height' : '100%'});
			$(bottleA).css({"grid-row" : "4","margin-top" : "0px"});
			$(infoA).css("grid-row", "5");
			if (tableA=="table") $("table.arinto").css("grid-row", "6");	
		} else {
			$("table.crato").css({'display' : 'table','grid-column' : 'span 2','height' : '100%'});
			$(bottleA).css({"grid-row" : "3","margin-top" : "0px"});
			$(infoA).css("grid-row", "3");
			if (tableA=="table") $("table.arinto").css("grid-row", "4");	
		}
		$("#C.read-more-button").val("Fechar");
	} else if (buttonId=="C" && tableC=="table") {
		$("table.crato").css("display", "none");
		if (width.matches) {
			$(bottleA).css("grid-row", "3");
			$(infoA).css("grid-row", "4");	
			if (tableA=="table") $("table.arinto").css("grid-area", "5 / auto / auto / auto");				
		} else {
			$(bottleA).css("grid-row", "2");
			$(infoA).css("grid-row", "2");
			if (tableA=="table") $("table.arinto").css("grid-area", "3 / span 2 / auto / auto");				
		}
		$(".read-more-button").val("Ler mais");
		$(".read-more-arrow").css("transform","scaleY(1)");
		$(".container").css("grid-template-rows", "auto");
    } else if (buttonId=="A" && tableA=="none") {
		$("#A.read-more-arrow").css("transform", "scaleY(-1)");
		if (width.matches) {
			$("table.arinto").css({'display' : 'table', 'height' : '100%'});		
			if (tableC=="none") $("table.arinto").css("grid-row","5");
			else $("table.arinto").css("grid-row","6");	
		} else {
			$("table.arinto").css({'display' : 'table','grid-column' : 'span 2','height' : '100%'});		
			if (tableC=="none") $("table.arinto").css("grid-row","3");
			else $("table.arinto").css("grid-row","4");	
			$(".container").css("grid-template-rows", "1fr");
		}
		$("#A.read-more-button").val("Fechar");
		$(bottleA).css("margin-top", "0px");
    } else if (buttonId=="A" && tableA=="table") {
		$("#A.read-more-arrow").css("transform","scaleY(1)");
		$("table.arinto").css("display", "none");
		$("#A.read-more-button").val("Ler mais");
		$(infoA).css("margin-top", "0px");
	}
	responsiveResizingRowHeight();
}