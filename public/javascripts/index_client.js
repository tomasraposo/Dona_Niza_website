$(document).ready(function init(){
	var width = window.matchMedia("(max-width: 640px)");
	if (width.matches) {
		var enclosingDiv = document.createElement("div");
		var moreIcon = document.createElement("img");
		$(moreIcon).attr("class", "more-icon");
		moreIcon.alt="";
		var styleObj = {
			"width" : "30px",
			"position" : "absolute",
			"top" : "20px",
			"right" : "20px",
			"z-index" : "100"
		};
		$(moreIcon).css(styleObj);
		enclosingDiv.append(moreIcon);	
		var nav = document.getElementsByTagName("nav")[0];	
		nav.appendChild(enclosingDiv);
		$(".centered-logo").css({"width" : "150px"});
		document.getElementsByClassName("more-icon")[0].addEventListener("click", function() {
			self.location = "/menu";
		});
	} else {
		var ul = document.createElement("ul");
		ul.className = "navbar";	
		for (var i=0; i<3; i++) {
			var li = document.createElement("li");	
			var a = document.createElement("a");	
			if (i==0) {
				$(a).attr({class : "vinhos", href : "/vinhos"});	
				$(a).html("VINHOS");
			} else if (i==1) {
				$(a).attr({class : "vinha", href : "/vinha"});	
				$(a).html("VINHA");
			} else {
				$(a).attr({class : "contacto", href : "/contacto"});	
				$(a).html("CONTACTO");
			}	
			li.appendChild(a);
			ul.appendChild(li);
		}
		var nav = document.getElementsByTagName("nav")[0];
		nav.appendChild(ul);
		$("a").hover(function() {
			$(this).css("text-decoration", "underline");
		}, function() {
			$(this).css("text-decoration", "none");    
		});
		var anchorLinks = [ ... $("a")];
		anchorLinks.forEach(function(val, index) {
			val.addEventListener("click", function(e) {
				e.preventDefault();
				self.location = val.href;
			});
		});
	}	
});
