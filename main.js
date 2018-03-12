// file my_extension/main.js

define([
    'base/js/namespace','jquery','notebook/js/textcell','base/js/events'
], function(
    Jupyter,$,textcell,events
) {
    function load_ipython_extension() {
        var currentCells = Jupyter.notebook.get_cells();
        var ncells = Jupyter.notebook.ncells();
        var imageLocation = '/nbextensions/Task2/logo_swan_cloudhisto.png';
        for(var i = 0; i<ncells; i++){
            var currentCell = currentCells[i];
            if((currentCell instanceof textcell.TextCell) && (currentCell.rendered)){
                currentCell.element[0].innerHTML = currentCell.element[0].innerHTML.replace(/SWAN/g,"<img src='/nbextensions/Task2/logo_swan_cloudhisto.png' style='width:30px;height:30px;display:inline'/>");
            }
        }
        
        //non Jupyter notebook way to achieving the same.
        /*$(".text_cell.rendered").html(function (_, html) {
                 return html.replace(/SWAN/g,"<img src='/nbextensions/Task2/logo_swan_cloudhisto.png' style='width:20px;height:20px;display:inline'/>")
        });*/
        events.on("rendered.MarkdownCell", function (event, data) {        
            var cellContent = data.cell.element.find('div.text_cell_render')[0];
            cellContent.innerHTML = cellContent.innerHTML.replace(/SWAN/g,"<img src='/nbextensions/Task2/logo_swan_cloudhisto.png' style='width:30px;height:30px;display:inline'/>");
            console.log(data.cell);
        });   
    }
    
    
    return {
        load_ipython_extension: load_ipython_extension
    };
});