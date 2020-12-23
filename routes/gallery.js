var express = require('express');
var router = express.Router({mergeParams: true});
var path = require("path");
var fs = require("fs");
var {Dom} = require("./dom");

var resFilePath = path.join(process.cwd(), "gallery.html");

var resDom = new Dom(resFilePath);

var itemsDir = "images";
var itemsNameId = "vinha";
var itemsDirPath = path.join("public/", itemsDir);
var imageLocation = "selected-image";
var captionLocation = "caption";

var endpoints = {parameters : ["monte-do-lobo", "cova",
                               "linhas", "monte-do-pirolito",
                               "entrada", "monte-da-luz-bonita"]};


// asynchronous data reading from images directory
function readDataFromDir(dir, resDom, imgsNameId) { 
    var data = new Array();
    fs.readdir(dir, function(err, files) {
	if (err) throw err;
	else files.forEach(file => {
	    if (file.includes(imgsNameId)) {
            data.push(file);
        }
	});
    var img = resDom.createElement("img");
    var p = resDom.createElement("p");

    /* GET 'gallery' page */
	router.get("/:imageName", function(req, res) {
        endpoints.parameters.forEach(function(endpoint) {
                 if (req.params.imageName == endpoint) {
                    img.src = `/images/${data[endpoints.parameters.indexOf(endpoint)]}`;
                    var caption = endpoint.replace(/-/g, " ");
                    p.innerHTML = capitalizeWord(caption);
                    resDom.insertElementIn(imageLocation, img);
                    resDom.insertElementIn(captionLocation, p);
                 }
            });    
        res.header('Content-type', 'text/html');
	    res.end(resDom.toString());
	    });
    });
}

function capitalizeWord(str) {
    var arr = str.split(' ');   
    arr = arr.map(function(word) {
        var ch = word.charAt(0);
        return word.replace(ch, ch.toUpperCase());
    });
    return arr.join(' '); 
}

readDataFromDir(itemsDirPath, resDom, itemsNameId);

module.exports = router;
