$(document).ready(function() {
    var menuItems = [ ... document.getElementsByTagName("li")];
    menuItems.forEach(function(val, index) {
        val.addEventListener("click", function(e) {
            e.preventDefault();
            var id = val.id;
            var a = val.getElementsByTagName("a")[0];
            if (id==="vinhos") self.location = a.href;
            else if (id==="vinha") self.location = a.href;
            else if (id==="contacto") self.location = a.href;
        });
    });
});