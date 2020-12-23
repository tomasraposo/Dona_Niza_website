var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");
var {Dom} = require("./dom");
var {Grid} = require("./grid");

const resFilePath = path.join(process.cwd(), "contacto.html");

// response file dom
var resDom = new Dom(resFilePath);

var line = resDom.createElement("div");
line.setAttribute("class", "line-separator");
var anchor = resDom.createElement("a"); 
anchor.setAttribute("href",'/');	
var img = resDom.createElement("img"); 
img.setAttribute("class","logo");
img.setAttribute("src", "/images/DN_green_logo.svg");
anchor.appendChild(img);

var nav = resDom.createElement("nav"); 
nav.setAttribute("class", "navbar"); 
nav.setAttribute("role", "navigation");

resDom.insertElementIn("header", nav);
resDom.insertElementIn("navbar", anchor);
resDom.insertElementIn("navbar", line);

// create grid of contents and write it to response file's dom
var itemsDir = "images";
var itemsNameId = "ig";
var itemsDirPath = path.join("public/", itemsDir);
var gridDomLocation = "grid-container";

// asynchronous data reading from images directory
function readDataFromDir(dir, resDom, imgsNameId) { 
    var data = new Array();
    fs.readdir(dir, function(err, files) {
	if (err) throw err;
	else files.forEach(file => {
	    if (file.includes(imgsNameId)) 
		data.push(file);
	});
	// initialise grid object associated to response file's dom
	const gridResDom = new Grid(data, resDom, itemsNameId, gridDomLocation);
    gridResDom.fillGrid();
    /* GET 'contact' page */
    router.get("/", function(req, res) {
	    res.header('Content-type', 'text/html');
	    res.end(resDom.toString());
    	});
    });
}

readDataFromDir(itemsDirPath, resDom, itemsNameId);

module.exports = router;
