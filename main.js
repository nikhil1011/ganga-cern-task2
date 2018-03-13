// file my_extension/main.js
define([
    'base/js/namespace', 'jquery', 'notebook/js/textcell', 'base/js/events'
], function(
    Jupyter, $, textcell, events
) {
    function load_ipython_extension() {
        var currentCells = Jupyter.notebook.get_cells();
        var ncells = Jupyter.notebook.ncells();
        var imageLocation = '/nbextensions/Task2/logo_swan_cloudhisto.png';
        for (var i = 0; i < ncells; i++) {
            var currentCell = currentCells[i];
            if ((currentCell instanceof textcell.TextCell) && (currentCell.rendered)) {
				replaceSwanWithImage(currentCell);
            }
        }

        //non Jupyter notebook way to achieving the same.
        /*$(".text_cell.rendered").html(function (_, html) {
                 return html.replace(/SWAN/g,"<img src='/nbextensions/Task2/logo_swan_cloudhisto.png' style='width:20px;height:20px;display:inline'/>")
        });*/
        events.on("rendered.MarkdownCell", function (event, data) {
				var currentCell = data.cell;
				replaceSwanWithImage(currentCell);
        });
    }
	
	function replaceSwanWithImage(currentCell){
		var parsedHTML = jQuery.parseHTML(currentCell.element[0].children[1].innerHTML);
		var innerParsedHTML = jQuery(parsedHTML[2].innerHTML)
		var textOfThisCell = innerParsedHTML[0].childNodes[0].textContent;
		if (textOfThisCell.includes("SWAN")) {
			var idOfThisCell = textOfThisCell.split(' ').join('-');
			var textHere = $("#" + idOfThisCell).html();
			textHere = textHere.replace(/SWAN/g, "<img src='/nbextensions/Task2/logo_swan_cloudhisto.png' style='width:20px;height:20px;display:inline'/>");
			$("#" + idOfThisCell).html(textHere);
		}
	}

    return {
        load_ipython_extension: load_ipython_extension
    };
});