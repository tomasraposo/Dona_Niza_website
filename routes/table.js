class Table {
    constructor(data, dom, tableDomLocation, index, className) {
	this.data = data;
	this.dom = dom;
	this.tableDomLocation = tableDomLocation;
	this.index = index;
	this.className = className;
	this.table = this.dom.document.createElement("table");
	this.table.className = this.className;
    }
    fillTable() {
		var tableData="";
		Object.keys(this.data).forEach(key => {
	    	var row = "<tr class='row_border'>";
	    	var colKey = "<td class='lalign'>";
	    	var colVal = "<td class='ralign'>";
	    	colKey+=key+"</td>";
	    	colVal+=this.data[key]+"</td>";
	    	row+=colKey+colVal+"</tr>";
	    	tableData+=row;
		});
		this.table.innerHTML = tableData;
		var elem = this.dom.document.getElementsByClassName(this.tableDomLocation)[this.index];
		elem.insertAdjacentElement('afterend', this.table);
    }
    insertElementInCell(cellValue, element, styleObj) {
		var cellElem = this.hasCell(cellValue);
		if (typeof cellElem != undefined) {
			var elem = this.dom.document.createElement(element);
			this.dom.$(elem).css(styleObj);
		   	cellElem.append(elem);    
		}		
	}
    hasCell(value) {
		var tableElem = this.dom.document.getElementsByClassName(this.className)[0];
		var cellsNum = 0;
		for (var row of tableElem.rows) cellsNum+=row.cells.length;
		for (var row of tableElem.rows)
			for (var i=0; i<row.cells.length; i++) {
				var cellVal = row.cells[i].innerHTML;
				if (cellVal===value) {
					return row.cells[i];
				}
			}
		return undefined;
    }
}

module.exports = {Table};
