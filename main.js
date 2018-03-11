// file my_extension/main.js

define([
    'base/js/namespace','jquery','notebook/js/textcell'
], function(
    Jupyter,$,textcell
) {
    function load_ipython_extension() {

	var currentCells = Jupyter.notebook.get_cells();
	var ncells = Jupyter.notebook.ncells();
	for(var i = 0; i<ncells; i++){
		var currentCell = currentCells[i];
		if((currentCell instanceof textcell.TextCell)){
			currentCell.element[0].innerHTML = currentCell.element[0].innerHTML.replace(/heading/g,"<img src='/nbextensions/Task2/logo_swan_cloudhisto.png' style='width:25px;height:25px;display:inline'/>");
		}
	}
	//non Jupyter notebook way to achieving the same.
	/*$(".text_cell.rendered").html(function (_, html) {
     		return html.replace(/heading/g,"<img src='/nbextensions/Task2/logo_swan_cloudhisto.png' style='width:20px;height:20px;display:inline'/>")
	});*/
    }

    return {
        load_ipython_extension: load_ipython_extension
    };
});
