var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");
var {Dom} = require("./dom");
var {Table} = require("./table");

var resFilePath = path.join(process.cwd(), "vinhos.html");
var jsonFilePath = path.join(process.cwd(), "json/technical_sheet.json");

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

// create table of contents and write it to response file dom
var tableDomLocation = "";
var jsonFilePath = path.join(process.cwd(), "json", "technical_sheet.json");

// asynchronous data reading from images directory
function readDataFromFile(dir, resDom, callbackFn) { 
    fs.readFile(dir, function(err, data) {
	if (err) throw err;
    else callbackFn(resDom, data);
    
	/* GET 'vinhos' page */
	router.get("/", function(req, res) {
	    res.header('Content-type', 'text/html');
	    res.end(resDom.toString());
	});
    });
}

function parseJSONFile(resDom, data) {
    var jsonObj = JSON.parse(data);
    const tableData = [jsonObj.Crato[0], jsonObj.Arinto[0]];

    // initialise array of table objects associated to response file dom
    var tablesArray = [new Table(tableData[0], resDom, "bottle-mockup",0, "crato"),
        		       new Table(tableData[1], resDom, "bottle-mockup",1, "arinto")];	

    tablesArray.forEach(table => table.fillTable());
    var styleObj = {
        'background' : 'url(/images/crato_colour.svg) 50% 50% no-repeat',
        'width' : '30px',
        'position' : 'absolute',
        'right' : '0',
        'top' : '0',
        'bottom' : '0'
    };
    var element = "figure";
    var cellValue = "Branco palha";
    tablesArray[0].insertElementInCell(cellValue, element, styleObj);
}

readDataFromFile(jsonFilePath, resDom, parseJSONFile);

module.exports = router;
