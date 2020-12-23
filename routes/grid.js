var path = require("path");

class Grid {
    constructor(data, dom, itemsNameId, gridDomLocation) {
		this.dom = dom;
		this.data = data;
		this.itemsNameId = itemsNameId;
		this.gridDomLocation = gridDomLocation;
    }
    fillGrid() {
		var itemsNum = this.data.length;
		var rowsNum = 2, colsNum = 4
		var row, col; row = col = 1;	
		for (var i=0; i<itemsNum; ++i) {
			if (i==4) {row++; col=1;}
			var item = this.data[i];
			var div = this.dom.document.createElement("div");
			var img = this.dom.document.createElement("img");
			var a = this.dom.document.createElement("a");
			this.dom.$(div).attr("class", `item${i+1}`);
			this.dom.$(img).attr("src", path.join("/images/", item));
			this.dom.$(img).attr("class", `image${i+1}`);
			this.dom.$(a).attr("href", "");
			a.appendChild(img);
			div.appendChild(a);
			var location = this.dom.document.getElementsByClassName(this.gridDomLocation)[0];
			location.appendChild(div);
			col++;
		}
    }
    insertItemIn(row, col, item) {
		var styleObj = {"grid-row" : row.toString(),
		     			"grid-column" : col.toString()};
		this.dom.$(item).css(styleObj);
    }
}

module.exports = {Grid};
