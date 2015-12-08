$(document).ready(function() {

	/* ---------------------------------- IDS OF ELEMENTS --------------------------------------- */
	
	/* DATE COLUMNS */
	var dateidgroupdivscolumnsfilters = 'date-group-filters-columns';

	var dategroupfilter_default = 'group-filter-date-';
	var dateselectformtype_default = 'date-select-form-type-';

	var datelabelinitial_default = 'date-label-initial-';
	var datelabelfinal_default = 'date-label-final-';

	var datepickerinitial_default = 'date-picker-initial-';
	var datepickerfinal_default = 'date-picker-final-';

	var datelabelpersonalise_default = 'date-label-personalise-';
	var datepersonalise_default = 'date-personalise-';

	var datecountselect_default = 'date-count-select-';

	var datelabelconditions_default = 'date-label-conditions-';
	var dateconditions_default = 'date-conditions-';
	/*-----------------*/

	/* NUMBER COLUMNS */
	var numberidgroupdivscolumnsfilters = 'number-group-filters-columns';

	var numbergroupfilter_default = 'group-filter-number-';
	var numberselectformtype_default = 'number-select-form-type-';

	var numberlabelinitial_default = 'number-label-initial-';
	var numberlabelfinal_default = 'number-label-final-';

	var numberinitial_default = 'number-initial-';
	var numberfinal_default = 'number-final-';

	var numberlabelpersonalise_default = 'number-label-personalise-';
	var numberpersonalise_default = 'number-personalise-';

	var numbercountselect_default = 'number-count-select-';

	var numberlabelconditions_default = 'number-label-conditions-';
	var numberconditions_default = 'number-conditions-';
	/*-----------------*/

	/* TEXT COLUMNS */
	var textidgroupdivscolumnsfilters = 'text-group-filters-columns';

	var textgroupfilter_default = 'group-filter-text-';
	var textselectformtype_default = 'text-select-form-type-';

	var textlabelpersonalise_default = 'text-label-personalise-';
	var textpersonalise_default = 'text-personalise-';

	var textcountselect_default = 'text-count-select-';

	var textlabelconditions_default = 'text-label-conditions-';
	var textconditions_default = 'text-conditions-';
	/*-----------------*/

	/* -------------------------------------------------------------------------------------------------- */

	$('loadColumnsAttributtes',function() {
	  loadColumns(null);
	  setEventsDragAndDrop();
	});

	function setEventsDragAndDrop(){
		var dropcolumny = document.getElementById('drop-column-y');
		dropcolumny.ondrop = drop;
		dropcolumny.ondragover = allowDrop;

		var dropcolumnx = document.getElementById('drop-column-x');
		dropcolumnx.ondrop = drop;
		dropcolumnx.ondragover = allowDrop;
	}

	/* Generate columns filters by JSON */
	function loadColumns(jsonColumns){
		// only to test
		jsonColumns = jQuery.parseJSON('{"columns":[{"name":"Data Nascimento", "type":"date"},{"name":"Idade", "type":"number"},{"name":"Nome", "type":"text"}]}');
		
		// all columns/attributes
		var columns = jsonColumns.columns;
		// loop with the all columns/attributes that need to create a filter
		for(var i = 0; i < columns.length; i++){
			switch(columns[i].type){
				case 'date':
					createNewFiltersDate(columns[i]);
					break;
				case 'number':
					createNewFiltersNumber(columns[i]);
					break;
				case 'text':
					createNewFiltersText(columns[i]);
					break;
				default:
					break;		
			}
		}
	}

	/* -------------------------------------------------------------------------------------------------- */
	
	/* -------------------------------- GENERATA COLUMN FILTER TYPE DATE -------------------------------- */
	function createNewFiltersDate(datecolumn){
		// getting the group with the columns filters already on div
		var dategroupfilters = document.getElementById(dateidgroupdivscolumnsfilters);

		// getting all date filters already on div
		var dateFilters = dategroupfilters.children;

		// setting the new id to new date filter
		var datenewidfilter = dateFilters.length + 1;

		// creating new div with the filters 
		var newdiv = document.createElement('div');
		newdiv.draggable = true;
		newdiv.ondragstart = drag;

		// setting the div id 
		newdiv.id = dategroupfilter_default+datenewidfilter;

		// label with attribute name
		var namecolumn = document.createElement('label');
		namecolumn.innerHTML = 'Coluna: '+datecolumn.name;
		newdiv.appendChild(namecolumn);

		// creating the select option id
		var idselect = dateselectformtype_default+datenewidfilter;

		var arrayoptions = optionsIntervals('date');

		// creating the select options to dates
		var select = createSelectWithOptions(idselect, arrayoptions);
		select.onchange = dateSelectIntervalDateChange;
		newdiv.appendChild(select);

		// creating the date filters to use after the select change
		var dateinitial = document.createElement('input');
		dateinitial.id = datepickerinitial_default+datenewidfilter;
		dateinitial.type = 'date';
		dateinitial.className = 'date-picker';
		dateinitial.hidden = true;

		// label to initial date
		var labelinitial = document.createElement('label');
		labelinitial.id = datelabelinitial_default+datenewidfilter;
		labelinitial.innerHTML = 'Data inicial';
		labelinitial.hidden = true;

		newdiv.appendChild(labelinitial);
		newdiv.appendChild(dateinitial);

		// creating the date filters to use after the select change
		var datefinal = document.createElement('input');
		datefinal.id = datepickerfinal_default+datenewidfilter;
		datefinal.type = 'date';
		datefinal.className = 'date-picker';
		datefinal.hidden = true;

		// label to final date
		var labelfinal = document.createElement('label');
		labelfinal.id = datelabelfinal_default+datenewidfilter;
		labelfinal.innerHTML = 'Data final';
		labelfinal.hidden = true;

		newdiv.appendChild(labelfinal);
		newdiv.appendChild(datefinal);

		// text field to personalise the filter
		var personalise = document.createElement('input');
		personalise.id = datepersonalise_default+datenewidfilter;
		personalise.type = 'text';
		personalise.hidden = true;

		// label to personalise filters
		var labelpersonalise = document.createElement('label');
		labelpersonalise.id = datelabelpersonalise_default+datenewidfilter;
		labelpersonalise.innerHTML = 'Personalizado';
		labelpersonalise.hidden = true;

		newdiv.appendChild(labelpersonalise);
		newdiv.appendChild(personalise);

		var arrayoptionscount = optionsCounter('date');

		// creating the select options to counter
		var selectCount = createSelectWithOptions(datecountselect_default+datenewidfilter, arrayoptionscount);
		selectCount.onchange = dateSelectCountChange;
		newdiv.appendChild(selectCount);

		// text field to personalise the filter
		var conditions = document.createElement('input');
		conditions.id = dateconditions_default+datenewidfilter;
		conditions.type = 'text';
		conditions.hidden = true;

		// label to personalise filters
		var labelconditions = document.createElement('label');
		labelconditions.id = datelabelconditions_default+datenewidfilter;
		labelconditions.innerHTML = 'Condição';
		labelconditions.hidden = true;

		newdiv.appendChild(labelconditions);
		newdiv.appendChild(conditions);
		
		dategroupfilters.appendChild(newdiv);

		var hr = document.createElement('hr');
		dategroupfilters.appendChild(hr);
	}


	/* change selected interval option by user */
	function dateSelectIntervalDateChange(){
		// complete id
		var idElem = this.id;

		// getting the id number
		var id = idElem.split('-')[4];

		var optionSelected = this.value;
		dateConfigureDatePickers(optionSelected, id);
	}

	/* function to configure the date pickers of interval based on selected option by user */
	function dateConfigureDatePickers(optionSelected, id){

		var dateinitial, datefinal, labelinitial, labelfinal, personalise, labelpersonalise;

		dateinitial = document.getElementById(datepickerinitial_default+id);
		datefinal = document.getElementById(datepickerfinal_default+id);
		labelinitial = document.getElementById(datelabelinitial_default+id);
		labelfinal = document.getElementById(datelabelfinal_default+id);
		personalise = document.getElementById(datepersonalise_default+id);
		labelpersonalise = document.getElementById(datelabelpersonalise_default+id);

		switch(optionSelected){
			case 'range':
				dateinitial.hidden = false;
				labelinitial.hidden = false;
				datefinal.hidden = false;
				labelfinal.hidden = false;
				personalise.hidden = true;
				labelpersonalise.hidden = true;
				break;
			case 'biggerthan':
				dateinitial.hidden = false;
				labelinitial.hidden = false;
				datefinal.hidden = true;
				labelfinal.hidden = true;
				personalise.hidden = true;
				labelpersonalise.hidden = true;
				break;
			case 'lessthan':
				datefinal.hidden = false;
				labelfinal.hidden = false;
				dateinitial.hidden = true;
				labelinitial.hidden = true;
				personalise.hidden = true;
				labelpersonalise.hidden = true;
				break;
			case 'personalise':
				dateinitial.hidden = true;
				datefinal.hidden = true;
				labelinitial.hidden = true;
				labelfinal.hidden = true;
				personalise.hidden = false;
				labelpersonalise.hidden = false;
				break;
			default:
				dateinitial.hidden = true;
				datefinal.hidden = true;
				labelinitial.hidden = true;
				labelfinal.hidden = true;
				personalise.hidden = true;
				labelpersonalise.hidden = true;
				break;		
		}
	}

	/* function to configure the date pickers of interval based on selected option by user */
	function dateSelectCountChange(){
		// complete id
		var idElem = this.id;

		// getting the id number
		var id = idElem.split('-')[3];

		var optionSelected = this.value;
		
		var dateconditions = document.getElementById(dateconditions_default+id);
		var datelabelconditions = document.getElementById(datelabelconditions_default+id);

		if(optionSelected == 'countif'){
			dateconditions.hidden = false;
			datelabelconditions.hidden = false;
		} else {
			dateconditions.hidden = true;
			datelabelconditions.hidden = true;
		}
	}
	/* --------------------------------------------------------------------------------------------------------------------- */

	/* -------------------------------- GENERATA COLUMN FILTER TYPE NUMBER -------------------------------- */
	function createNewFiltersNumber(numbercolumn){
		// getting the group with the columns filters already on div
		var groupnumberfilters = document.getElementById(numberidgroupdivscolumnsfilters);

		// getting all numbers filters already on div
		var numberfilters = groupnumberfilters.children;

		// setting the new id to new number filter
		var numbernewidfilter = numberfilters.length + 1;

		// creating new div with the filters 
		var newdiv = document.createElement('div');
		newdiv.draggable = true;
		newdiv.ondragstart = drag;

		// setting the div id 
		newdiv.id = numbergroupfilter_default+numbernewidfilter;

		// label with attribute name
		var namecolumn = document.createElement('label');
		namecolumn.innerHTML = 'Coluna: '+numbercolumn.name;
		newdiv.appendChild(namecolumn);

		// creating the select option id
		var idselect = numberselectformtype_default+numbernewidfilter;

		var arrayoptions = optionsIntervals('number');

		// creating the select options to numbers
		var select = createSelectWithOptions(idselect, arrayoptions);
		select.onchange = numberSelectIntervalNumberChange;
		newdiv.appendChild(select);

		// creating the number filters to use after the select change
		var numberinitial = document.createElement('input');
		numberinitial.id = numberinitial_default+numbernewidfilter;
		numberinitial.type = 'number';
		numberinitial.hidden = true;

		// label to initial number
		var labelinitial = document.createElement('label');
		labelinitial.id = numberlabelinitial_default+numbernewidfilter;
		labelinitial.innerHTML = 'Valor inicial';
		labelinitial.hidden = true;

		newdiv.appendChild(labelinitial);
		newdiv.appendChild(numberinitial);

		// creating the number filters to use after the select change
		var numberfinal = document.createElement('input');
		numberfinal.id = numberfinal_default+numbernewidfilter;
		numberfinal.type = 'number';
		numberfinal.hidden = true;

		// label to final number
		var labelfinal = document.createElement('label');
		labelfinal.id = numberlabelfinal_default+numbernewidfilter;
		labelfinal.innerHTML = 'Valor final';
		labelfinal.hidden = true;

		newdiv.appendChild(labelfinal);
		newdiv.appendChild(numberfinal);

		// text field to personalise the filter
		var personalise = document.createElement('input');
		personalise.id = numberpersonalise_default+numbernewidfilter;
		personalise.type = 'text';
		personalise.hidden = true;

		// label to personalise filters
		var labelpersonalise = document.createElement('label');
		labelpersonalise.id = numberlabelpersonalise_default+numbernewidfilter;
		labelpersonalise.innerHTML = 'Personalizado';
		labelpersonalise.hidden = true;

		newdiv.appendChild(labelpersonalise);
		newdiv.appendChild(personalise);

		var arrayoptionscount = optionsCounter('number');

		// creating the select options to counter
		var selectcount = createSelectWithOptions(numbercountselect_default+numbernewidfilter, arrayoptionscount);
		selectcount.onchange = numberSelectCountChange;
		newdiv.appendChild(selectcount);

		// text field to personalise the filter
		var conditions = document.createElement('input');
		conditions.id = numberconditions_default+numbernewidfilter;
		conditions.type = 'text';
		conditions.hidden = true;

		// label to personalise filters
		var labelconditions = document.createElement('label');
		labelconditions.id = numberlabelconditions_default+numbernewidfilter;
		labelconditions.innerHTML = 'Condição';
		labelconditions.hidden = true;

		newdiv.appendChild(labelconditions);
		newdiv.appendChild(conditions);
		
		groupnumberfilters.appendChild(newdiv);

		var hr = document.createElement('hr');
		groupnumberfilters.appendChild(hr);
	}


	/* change selected interval option by user */
	function numberSelectIntervalNumberChange(){
		// complete id
		var idElem = this.id;

		// getting the id number
		var id = idElem.split('-')[4];

		var optionSelected = this.value;
		numberConfigureNumberInterval(optionSelected, id);
	}

	/* function to configure the date pickers of interval based on selected option by user */
	function numberConfigureNumberInterval(optionSelected, id){

		var numberinitial, numberfinal, labelinitial, labelfinal, personalise, labelpersonalise;

		numberinitial = document.getElementById(numberinitial_default+id);
		numberfinal = document.getElementById(numberfinal_default+id);
		labelinitial = document.getElementById(numberlabelinitial_default+id);
		labelfinal = document.getElementById(numberlabelfinal_default+id);
		personalise = document.getElementById(numberpersonalise_default+id);
		labelpersonalise = document.getElementById(numberlabelpersonalise_default+id);

		switch(optionSelected){
			case 'range':
				numberinitial.hidden = false;
				labelinitial.hidden = false;
				numberfinal.hidden = false;
				labelfinal.hidden = false;
				personalise.hidden = true;
				labelpersonalise.hidden = true;
				break;
			case 'biggerthan':
				numberinitial.hidden = false;
				labelinitial.hidden = false;
				numberfinal.hidden = true;
				labelfinal.hidden = true;
				personalise.hidden = true;
				labelpersonalise.hidden = true;
				break;
			case 'lessthan':
				numberfinal.hidden = false;
				labelfinal.hidden = false;
				numberinitial.hidden = true;
				labelinitial.hidden = true;
				personalise.hidden = true;
				labelpersonalise.hidden = true;
				break;
			case 'personalise':
				numberinitial.hidden = true;
				numberfinal.hidden = true;
				labelinitial.hidden = true;
				labelfinal.hidden = true;
				personalise.hidden = false;
				labelpersonalise.hidden = false;
				break;
			default:
				numberinitial.hidden = true;
				numberfinal.hidden = true;
				labelinitial.hidden = true;
				labelfinal.hidden = true;
				personalise.hidden = true;
				labelpersonalise.hidden = true;
				break;		
		}
	}

	/* function to configure the date pickers of interval based on selected option by user */
	function numberSelectCountChange(){
		// complete id
		var idElem = this.id;

		// getting the id number
		var id = idElem.split('-')[3];

		var optionSelected = this.value;
		
		var numberconditions = document.getElementById(numberconditions_default+id);
		var numberlabelconditions = document.getElementById(numberlabelconditions_default+id);

		if(optionSelected == 'countif' || optionSelected == 'sumif'){
			numberconditions.hidden = false;
			numberlabelconditions.hidden = false;
		} else {
			numberconditions.hidden = true;
			numberlabelconditions.hidden = true;
		}
	}
	/* --------------------------------------------------------------------------------------------------------------------- */

	/* -------------------------------- GENERATA COLUMN FILTER TYPE TEXT -------------------------------- */
	function createNewFiltersText(textcolumn){
		// getting the group with the columns filters already on div
		var grouptextfilters = document.getElementById(textidgroupdivscolumnsfilters);

		// getting all text filters already on div
		var textfilters = grouptextfilters.children;

		// setting the new id to new text filter
		var textnewidfilter = textfilters.length + 1;

		// creating new div with the filters 
		var newdiv = document.createElement('div');
		newdiv.draggable = true;
		newdiv.ondragstart = drag;

		// setting the div id 
		newdiv.id = textgroupfilter_default+textnewidfilter;

		// label with attribute name
		var namecolumn = document.createElement('label');
		namecolumn.innerHTML = 'Coluna: '+textcolumn.name;
		newdiv.appendChild(namecolumn);

		// creating the select option id
		var idselect = textselectformtype_default+textnewidfilter;

		var arrayoptions = optionsIntervals('text');

		// creating the select options to text
		var select = createSelectWithOptions(idselect, arrayoptions);
		select.onchange = textSelectIntervalTextChange;
		newdiv.appendChild(select);

		// text field to personalise the filter
		var personalise = document.createElement('input');
		personalise.id = textpersonalise_default+textnewidfilter;
		personalise.type = 'text';
		personalise.hidden = true;

		// label to personalise filters
		var labelpersonalise = document.createElement('label');
		labelpersonalise.id = textlabelpersonalise_default+textnewidfilter;
		labelpersonalise.innerHTML = 'Personalizado';
		labelpersonalise.hidden = true;

		newdiv.appendChild(labelpersonalise);
		newdiv.appendChild(personalise);

		var arrayoptionscount = optionsCounter('text');

		// creating the select options to counter
		var selectcount = createSelectWithOptions(textcountselect_default+textnewidfilter, arrayoptionscount);
		selectcount.onchange = textSelectCountChange;
		newdiv.appendChild(selectcount);

		// text field to personalise the filter
		var conditions = document.createElement('input');
		conditions.id = textconditions_default+textnewidfilter;
		conditions.type = 'text';
		conditions.hidden = true;

		// label to personalise filters
		var labelconditions = document.createElement('label');
		labelconditions.id = textlabelconditions_default+textnewidfilter;
		labelconditions.innerHTML = 'Condição';
		labelconditions.hidden = true;

		newdiv.appendChild(labelconditions);
		newdiv.appendChild(conditions);
		
		grouptextfilters.appendChild(newdiv);

		var hr = document.createElement('hr');
		grouptextfilters.appendChild(hr);
	}


	/* change selected interval option by user */
	function textSelectIntervalTextChange(){
		// complete id
		var idElem = this.id;

		// getting the id number
		var id = idElem.split('-')[4];

		var optionSelected = this.value;
		textConfigureTextInterval(optionSelected, id);
	}

	/* function to configure the date pickers of interval based on selected option by user */
	function textConfigureTextInterval(optionSelected, id){

		var personalise, labelpersonalise;

		personalise = document.getElementById(textpersonalise_default+id);
		labelpersonalise = document.getElementById(textlabelpersonalise_default+id);

		switch(optionSelected){
			case 'personalise':
				personalise.hidden = false;
				labelpersonalise.hidden = false;
				break;
			default:
				personalise.hidden = true;
				labelpersonalise.hidden = true;
				break;		
		}
	}

	/* function to configure the date pickers of interval based on selected option by user */
	function textSelectCountChange(){
		// complete id
		var idElem = this.id;

		// getting the id number
		var id = idElem.split('-')[3];

		var optionSelected = this.value;
		
		var textconditions = document.getElementById(textconditions_default+id);
		var textlabelconditions = document.getElementById(textlabelconditions_default+id);

		if(optionSelected == 'countif' || optionSelected == 'sumif'){
			textconditions.hidden = false;
			textlabelconditions.hidden = false;
		} else {
			textconditions.hidden = true;
			textlabelconditions.hidden = true;
		}
	}
	/* --------------------------------------------------------------------------------------------------------------------- */

	/* -------------------------------- FUNCTIONS USED BY MORE ONE COLUMN TYPE --------------------------------------------- */

	/* Creating the select options  
		@param type (example: 'select-form-date-type-')
		@param id (example: 1)
		@param array (example: 
						array[
							[value: 1, text 1],
							[value: 2, text 2],
							[value: 3, text 3],
							[value: 4, text 4]
						])
	*/
	function createSelectWithOptions(id, arrayoptions){
		var select = document.createElement('select');
		select.className = 'form-control';
		select.id = id;

		var option;

		for(var i=0; i < arrayoptions.length; i++){
			option =  document.createElement('option');
			option.value = arrayoptions[i].value;
			option.text = arrayoptions[i].text;
			select.appendChild(option);
		}
		return select;
	}

	/* function that return the options of select interval */
	function optionsIntervals(type){
		// generating the options to interval
		var arrayoptions = new Array();
		var option0 = {value:"select", text: 'Selecione'};
		arrayoptions.push(option0);
		if(type != 'text') {
			var option1 = {value:"range", text:"Faixa"};
			var option2 = {value:"biggerthan", text:"Maior que"};
			var option3 = {value:"lessthan", text:"Menor que"};
			arrayoptions.push(option0, option1, option2, option3);
		}
		var option4 = {value:"personalise", text:"Personalizado"};
		arrayoptions.push(option4);
	
		return arrayoptions;
	}

	/* function that return the options of count filter */
	function optionsCounter(type){
		// generating the options to countAll or count if
		var option0 = {value:"select", text:"Selecione"};
		var option1 = {value:"countall", text:"Contar todos"};
		var option2 = {value:"countif", text:"Contar se"};

		// creating array with the options
		var arrayoptionscount = new Array(option0, option1, option2);

		if(type == 'number'){
			var option3 = {value:"sum", text:"Somar"};
			var option4 = {value:"sumif", text:"Somar se"};
			var option5 = {value:"average", text:"Média"};

			arrayoptionscount.push(option3, option4, option5);
		}

		return arrayoptionscount;
	}

	/* --------------------------------------------------------------------------------------------------------------------- */
	
	/* ------------------------------------------ FUNCTIONS TO MANIPULATE SCREEN ------------------------------------------- */

 	/* Check all plots */
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

	/* Close/remove panel column */
	function closeDivColumn(){
		var divid = this.id.replace("del-", "");
		var elem = document.getElementById(divid);
		elem.parentNode.removeChild(elem);
	}

	/* Remove plot */
	$('.a-img-trash-plot').on('click', function(){
		var idGroup = 'checkbox-plot-group-';
		var id = this.id;
		var atts = id.split("-");
		
		idGroup += atts[3];
		var elem = document.getElementById(idGroup);
		elem.parentNode.removeChild(elem);
	});

	/* ------------- FUNCTIONS DRAG AND DROP -------------------- */
	function allowDrop(ev) {
	    ev.preventDefault();
	}

	function drag(ev) {
	    ev.dataTransfer.setData("id-div", ev.target.id);
	}

	function drop(ev) {
	    ev.preventDefault();
	    
	    var column = ev.target.id.split('-')[2];
	    var iddiv = ev.dataTransfer.getData("id-div");
	    var type = iddiv.split('-')[2];
	    
	    createNewColumnOnChart(column, iddiv, type);
	}
	/* -------------------------------------------------------- */

	/* function to create a panel with new column */
	function createNewColumnOnChart(column, iddiv, type){

		var divcolumns;

		if(column == 'x') {
			divcolumns = document.getElementById('columns-group-x');
		} else {
			divcolumns = document.getElementById('columns-group-y');
		}

		var columnid = (divcolumns.children.length+1);

		var firstdiv = document.createElement('div');
		firstdiv.className = 'form-group panel-columns-x panel-columns';
		firstdiv.id = 'group-column-x-'+columnid;

		var seconddiv = document.createElement('div');
		seconddiv.className = 'panel panel-default';

		var a = document.createElement('a');
		a.className = 'img-rounded pull-right close-panel-column';
		a.id = 'group-column-x-del-'+columnid;
		a.onclick = closeDivColumn;

		var img = document.createElement('img');
		img.src = 'img/close.png';
		img.alt = 'Excluir';

		var thirddiv = document.createElement('div');
		thirddiv.className = 'panel-body';
		thirddiv.innerHTML = 'Coluna: '+columnid;

		a.appendChild(img);
		seconddiv.appendChild(a);
		seconddiv.appendChild(thirddiv);
		firstdiv.appendChild(seconddiv);

		divcolumns.appendChild(firstdiv);
	}

	/* --------------------------------------------------------------------------------------------------------------------- */

});
