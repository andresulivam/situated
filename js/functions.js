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

});
