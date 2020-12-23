var express = require('express');
var router = express.Router({mergeParams: true});
var path = require("path");
var fs = require("fs");
var {Dom} = require("./dom");
var {Grid} = require("./grid");
var galleryRouter = require("./gallery");

var resFilePath = path.join(process.cwd(), "vinha.html");

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
var itemsNameId = "vinha";
var itemsDirPath = path.join("public/", itemsDir);
var gridDomLocation = "btm_row";

router.use('/gallery/', galleryRouter);

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

		var anchors = resDom.getElementsByTagName("a");
		var hrefs = ["monte-do-lobo", "cova",
					 "linhas", "monte-do-pirolito",
					 "entrada", "monte-da-luz-bonita"];
		var i=0;
		var arr = [... anchors];
		arr.forEach(elem => {
			if (arr.indexOf(elem)==0) return;
			while (i<hrefs.length) {
				elem.href = hrefs[i++];
				break;
			}
		});

		/* GET 'vinha' page */
		router.get("/", function(req, res) {
			res.header('Content-type', 'text/html');
			res.end(resDom.toString());
		});
	});
}

readDataFromDir(itemsDirPath, resDom, itemsNameId);

module.exports = router;
