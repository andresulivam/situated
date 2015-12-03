$(document).ready(function() {

 	/** Check all plots */
	$('#check-all-plots').on('change', function(){
		
		var stateCheckAll = $('#check-all-plots').is(':checked');
		var plots = $('#checkbox-plot-group');
		var checkboxes = plots.children('div');
		var divcheckbox;
		var checkbox;

		if(checkboxes.length > 0){
			for( var i = 0; i < checkboxes.length; i++){
			    divcheckbox = checkboxes[i];
			    checkbox = divcheckbox.children[0].children[0];
			    checkbox.checked = stateCheckAll;
			}		
		}
	});

	/** Close/remove panel column */
	$('.close-panel-column').on('click', function(){
		var idGroup = 'group-column-';
		var id = this.id;
		var atts = id.split("-");
		
		idGroup += atts[3];
		idGroup += '-';
		idGroup += atts[4];
		var elem = document.getElementById(idGroup);
		elem.parentNode.removeChild(elem);
	});


});
