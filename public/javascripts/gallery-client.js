$(document).ready(function() {
    var endpoints = ["monte-do-lobo", "cova",
                    "linhas", "monte-do-pirolito",
                    "entrada", "monte-da-luz-bonita"];
    var img = document.getElementsByTagName("img")[3];
    var name = img.src.substring(img.src.lastIndexOf("/")+1, img.src.indexOf("."));            
    var index = Number(name.match(/\d+/))-1;
    document.getElementsByClassName("next-arrow")[0].getElementsByTagName("a")[0].addEventListener("click", function(e) {
        e.preventDefault();	
        index+=1;
        getImage(endpoints[index % endpoints.length]);
    });
    document.getElementsByClassName("prev-arrow")[0].getElementsByTagName("a")[0].addEventListener("click", function(e) {
        e.preventDefault();	
        index-=1;
        getImage(endpoints[index % endpoints.length]);
    });
    document.getElementsByClassName("close-button")[0].getElementsByTagName("a")[0].addEventListener("click", function(e) {
        e.preventDefault();
        self.location = this.href
    });
});

function getImage(image) {
    self.location = "/vinha/gallery/".concat(image);
}
