$(document).ready(function() {
    var err = "An error has occurred while loading the page. Please refresh your browser";
    $.getScript("/javascripts/index_client.js")
		.fail(function() {
			$("header").html(err);
		});
	var styleObj = {"width" : "auto"};
	$(".logo").css(styleObj);
	var images = $("div[class^=item]");
	for (var img of images) {
		img.addEventListener("mouseover", function(e) {
			e.preventDefault();	
			dimImages(images, this);
			this.addEventListener("mouseout", function(e) {
					restoreImagesOpacity(images);
				}, false);
			this.addEventListener("click", function(e) {
				var href = this.getElementsByTagName("a")[0].getAttribute("href");
				var section = "/vinha/gallery/";
				window.location.replace(section.concat(href));
			}, false);
		}, false);
	}
});

function dimImages(images, image) {
	for (var img of images) {	
		if (Object.is(img, image)) continue;
		else img.style.opacity = "70%";
	}
}

function restoreImagesOpacity(images) {
	for (var img of images) 
		img.style.opacity = "100%";
}