const fs = require("fs");
const {JSDOM} = require("jsdom");
const jquery = global.jQuery = require("jquery");

class Dom {
    // initialise DOM
    constructor(filePath) {
		if (typeof filePath === "string")
			this.data = fs.readFileSync(filePath, {encoding: "utf-8"}).toString();
		else this.data = "";
		this.filePath = filePath;
		this.jsdom = new JSDOM(this.data, {QuerySelector: true});
		this.window = this.jsdom.window;
		this.document = this.window.document;
		this.$ = jquery(this.window)
	}
	createElement(tag) {
		if (this.isValidHTMLElement(tag)) 
			return this.document.createElement(tag);
		else throw new Error(`Couldn't create ${tag} element. ${tag} is not valid HTML.`);
	}
	getElementsByClassName(className) {
		return this.document.getElementsByClassName(className)[0];
	}
	getElementsByTagName(tag) {
		return this.document.getElementsByTagName(tag);
	}
	insertElementIn(location, element) {
		if (element instanceof this.window.HTMLElement) {
			var elem = this.document.getElementsByClassName(location)[0];
			elem.append(element);
		} else throw new Error(`Couldn't insert ${element} element in ${location}.`);
	}
    // get inner HTML of a given element
    getElementInnerHTML(element) {
		if (this.isValidHTMLElement(element) &&
			this.document.getElementsByTagName(element)) 
			return this.document.querySelector("header").innerHTML;
		else throw new Error(`HTML ${element} not found.`);
    }
    // check if given element is valid HTML
    isValidHTMLElement(tag) {
		if (typeof tag === "string")
			return this.document.createElement(tag) instanceof this.window.HTMLElement;
    }
    // return string representation of DOM contents
    toString() {
		return this.document.documentElement.innerHTML;
    }
};

module.exports = {Dom};
