$(document).ready(function() {

	// test save plots
	var arrayjsonplots = new Array();

	// ids temp plots
	var idplot = 0;

	/* ---------------------------------- IDS OF ELEMENTS --------------------------------------- */

	var iddatalists = 'datalists-personalised-';
	
	/* DATE COLUMNS */
	var dateidgroupdivscolumnsfilters = 'date-group-filters-columns';

	var dategroupfilter_default = 'group-filter-date-';
	var dateselectformtype_default = 'date-select-form-type-';

	var datelabelinitial_default = 'date-label-initial-';
	var datelabelfinal_default = 'date-label-final-';

	var datepickerinitial_default = 'date-picker-initial-';
	var datepickerfinal_default = 'date-picker-final-';

	var datelabelpersonalised_default = 'date-label-personalised-';
	var datepersonalised_default = 'date-personalised-';

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

	var numberlabelpersonalised_default = 'number-label-personalised-';
	var numberpersonalised_default = 'number-personalised-';

	var numbercountselect_default = 'number-count-select-';

	var numberlabelconditions_default = 'number-label-conditions-';
	var numberconditions_default = 'number-conditions-';
	/*-----------------*/

	/* TEXT COLUMNS */
	var textidgroupdivscolumnsfilters = 'text-group-filters-columns';

	var textgroupfilter_default = 'group-filter-text-';
	var textselectformtype_default = 'text-select-form-type-';

	var textlabelpersonalised_default = 'text-label-personalised-';
	var textpersonalised_default = 'text-personalised-';

	var textcountselect_default = 'text-count-select-';

	var textlabelconditions_default = 'text-label-conditions-';
	var textconditions_default = 'text-conditions-';
	/*-----------------*/

	/* -------------------------------------------------------------------------------------------------- */

	$('onload',function(completejson) {
		// JUST FOR TEST
		var completejson = loadjsontest();

		// filling the select with the columns options
		fillSelectColumnsWithJson(completejson);

		// initializing the graphic with a bar graphic
		setBarGraphic();

		// setting event to drag and drop
		setEventsDragAndDrop();
	});

	/* JUST FOR TEST */
	function loadjsontest() {
	    var client = " { "
			  +"\"status\": 200,"
			  +"\"message\": ["
			   +" {"
			     +" \"index\": 1232,"
			     +" \"parent\": null,"
			     +" \"name\": \"DIRETORIA OPERACIONAL S11D\","
			     +" \"post\": \"Diretor\","
			     +" \"funct\": \"DIRETOR GERAL S11D\","
			     +" \"sim\": 3,"
			     +" \"org_template\": \"headTemplate\","
			     +" \"type\": 0,"
			     +" \"zone\": \"DI\","
			     +" \"shift\": \"ADM\","
			     +" \"struct\": \"1AQH\","
			     +" \"std_as\": \"AS\","
			     +" \"std_as_time\": \"Dir\","
			     +" \"std_ms\": \"AS\","
			     +" \"std_ms_time\": \"ADM\","
			     +" \"std_bs\": \"AS\","
			     +" \"std_bs_time\": \"ADM\","
			     +" \"tranning_time\": -320,"
			     +" \"necessity_date\": \"01/10/2014\","
			     +" \"parent_name\": \"Sem Superior\","
			     +" \"workgroup_name\": \"DIRETORIA OPERACIONAL S11D\","
			     +" \"spv\": null,"
			     +" \"gg\": \"DIRETORIA DE OPERAÇÃO FERROSOS SERRA SUL\","
			     +" \"ga\": \"Diretor\","
			     +" \"sp\": \"Gabinete\" },"
			     +" {"
			     +" \"index\": 1233,"
			     +" \"parent\": null,"
			     +" \"name\": \"DIRETORIA OPERACIONAL S11D\","
			     +" \"post\": \"Diretor\","
			     +" \"funct\": \"DIRETOR GERAL S11D\","
			     +" \"sim\": 3,"
			     +" \"org_template\": \"headTemplate\","
			     +" \"type\": 0,"
			     +" \"zone\": \"DI\","
			     +" \"shift\": \"ADM\","
			     +" \"struct\": \"1AQH\","
			     +" \"std_as\": \"AS\","
			     +" \"std_as_time\": \"Dir\","
			     +" \"std_ms\": \"AS\","
			     +" \"std_ms_time\": \"ADM\","
			     +" \"std_bs\": \"AS\","
			     +" \"std_bs_time\": \"ADM\","
			     +" \"tranning_time\": -320,"
			     +" \"necessity_date\": \"01/10/2014\","
			     +" \"parent_name\": \"Sem Superior\","
			     +" \"workgroup_name\": \"DIRETORIA OPERACIONAL S11D\","
			     +" \"spv\": null,"
			     +" \"gg\": \"DIRETORIA DE OPERAÇÃO FERROSOS SERRA SUL\","
			     +" \"ga\": \"Diretor\","
			     +" \"sp\": \"Gabinete\" },"
			     +" {"
			     +" \"index\": 1234,"
			     +" \"parent\": 1232,"
			     +" \"name\": \"DIRETORIA OPERACIONAL S11D\","
			     +" \"post\": \"Diretor\","
			     +" \"funct\": \"DIRETOR GERAL S11D\","
			     +" \"sim\": 3,"
			     +" \"org_template\": \"headTemplate\","
			     +" \"type\": 0,"
			     +" \"zone\": \"DI\","
			     +" \"shift\": \"ADM\","
			     +" \"struct\": \"1AQH\","
			     +" \"std_as\": \"AS\","
			     +" \"std_as_time\": \"Dir\","
			     +" \"std_ms\": \"AS\","
			     +" \"std_ms_time\": \"ADM\","
			     +" \"std_bs\": \"AS\","
			     +" \"std_bs_time\": \"ADM\","
			     +" \"tranning_time\": -320,"
			     +" \"necessity_date\": \"01/10/2014\","
			     +" \"parent_name\": \"Sem Superior\","
			     +" \"workgroup_name\": \"DIRETORIA OPERACIONAL S11D\","
			     +" \"spv\": null,"
			     +" \"gg\": \"DIRETORIA DE OPERAÇÃO FERROSOS SERRA SUL\","
			     +" \"ga\": \"Diretor\","
			     +" \"sp\": \"Gabinete\" }"
			   +"]"
			+"}"; 
			return jQuery.parseJSON(client);
	}

	/* Filling the columns options based on json */ 
	function fillSelectColumnsWithJson(jsoncolumns){
		if(jsoncolumns != null){
			// getting the field message
			var messages = jsoncolumns.message;
			if(messages.length > 0){
				// getting the all properties of message on position 0
				var columns = Object.keys(messages[0]);
				var arrayoptions = new Array();
				var option;
				var validcolumn;
				// loop to all properties/columns
				for(var i = 0; i < columns.length; i++){
					// checking the value of column
					validcolumn = validatingTheColumnFieldHasValue(messages, columns[i], 0);
					if(validcolumn.valid){
						option = createOptionToSelectColumns(columns[i], validcolumn.type);
						arrayoptions.push(option);
					}
				}
				var select = document.getElementById('select-column');
				for(var i = 0; i < arrayoptions.length; i++){
					// adding the all properties/columns on the select
					select.appendChild(arrayoptions[i]);
				}
			}
		}
	}

	/* Recursive function to find value of column for test if is a valid column */
	function validatingTheColumnFieldHasValue(jsonmessages, column, position){
		var result = new Object();
		if(position < jsonmessages.length){
			var valuetype;
			// getting the message in a position
			var message = jsonmessages[position];
			// getting the value of a column 
			var valuecolumn = message[column];
			if(valuecolumn != null){
				if($.isNumeric(valuecolumn)){
					valuetype = 'number-type';
				} else {
					var parsedDate = Date.parse(valuecolumn);
					if (isNaN(valuecolumn) && !isNaN(parsedDate)) {
					    valuetype = 'date-type';
					} else {
						valuetype = 'text-type';
					}
				}
				result.type = valuetype;
				result.valid = true;
				return result;
			} else {
				// recursive to a next message
				var valid = validatingTheColumnFieldHasValue(jsonmessages, column, position+1);
				result = valid;
			}
		}
		return result;
	}

	/* Creating the new option column to select */
	function createOptionToSelectColumns(column, type){
		if(column != null){
			var option =  document.createElement('option');
			option.value = column;
			option.text = column;
			option.className = type;
			return option;			
		}
	}

	function setEventsDragAndDrop(){
		var chart = document.getElementById('chart');
		chart.ondrop = dropPlot;
		chart.ondragover = allowDrop;
	}

	/* Generate columns filters by JSON */
	function loadColumns(jsonColumns){
		
		// removing columns to add new without repeat
		clearAllColumnsFilters();
	
		// all columns/attributes
		// var columns = jsonColumns.columns;
		// // loop with the all columns/attributes that need to create a filter
		// for(var i = 0; i < columns.length; i++){
		// 	switch(columns[i].type){
		// 		case 'date':
		// 			createNewFiltersDate(columns[i]);
		// 			break;
		// 		case 'number':
		// 			createNewFiltersNumber(columns[i]);
		// 			break;
		// 		case 'text':
		// 			createNewFiltersText(columns[i]);
		// 			break;
		// 		default:
		// 			break;		
		// 	}
		// }
	}

	/* -------------------------------------------------------------------------------------------------- */


	function createNewColumnFilter(column){

		var typecolumn = column.type;

		var groupfilters;
		if(type == 'date'){
			groupfilters = document.getElementById(dateidgroupdivscolumnsfilters);
		} else if(type == 'number'){
			groupfilters = document.getElementById(numberidgroupdivscolumnsfilters);
		} else if(type == 'text'){
			groupfilters = document.getElementById(textidgroupdivscolumnsfilters);
		}

		// getting all filters already on div
		var filters = groupfilters.children;
		// setting the new id to new filter
		var newidfilter = filters.length + 1;

		var newdivid;
		if(type == 'date'){
			newdivid = dategroupfilter_default+newidfilter;
		} else if(type == 'number'){
			newdivid = numbergroupfilter_default+newidfilter;
		} else if(type == 'text'){
			newdivid = textgroupfilter_default+newidfilter;
		}

		// creating new div with the filters
		var newdiv = createNewDiv(newdivid, null, null, null, null);


	}
	
	/* -------------------------------- GENERATA COLUMN FILTER TYPE DATE -------------------------------- */
	function createNewFiltersDate(datecolumn){
		// getting the group with the columns filters already on div
		var dategroupfilters = document.getElementById(dateidgroupdivscolumnsfilters);

		// getting all date filters already on div
		var dateFilters = dategroupfilters.children;

		// setting the new id to new date filter
		var datenewidfilter = dateFilters.length + 1;

		// creating new div with the filters
		var newdivid = dategroupfilter_default+datenewidfilter;
		var newdiv = createNewDiv(newdivid, null, null, null, null);

		// label with attribute name
		var namecolumntext = 'Coluna: '+datecolumn.name;
		var namecolumn = createNewLabel(null, namecolumntext, false, false, null);

		newdiv.appendChild(namecolumn);

		// creating the select option id
		var idselect = dateselectformtype_default+datenewidfilter;

		var arrayoptions = optionsIntervals('date');

		// creating the select options to dates
		var select = createSelectWithOptions(idselect, arrayoptions);
		select.onchange = dateSelectIntervalDateChange;

		newdiv.appendChild(select);

		// creating the date filters to use after the select change
		var dateinitialid = datepickerinitial_default+datenewidfilter;
		var dateinitial = createNewInput(dateinitialid, 'date', 'date-picker', true, null);

		// label to initial date
		var labelinitialid = datelabelinitial_default+datenewidfilter;
		var labelinitial = createNewLabel(labelinitialid, 'Data inicial', true, false, null);

		newdiv.appendChild(labelinitial);
		newdiv.appendChild(dateinitial);

		// creating the date filters to use after the select change
		var datefinalid = datepickerfinal_default+datenewidfilter;
		var datefinal = createNewInput(datefinalid, 'date', 'date-picker', true, null);

		// label to final date
		var labelfinalid = datelabelfinal_default+datenewidfilter;
		var labelfinal = createNewLabel(labelfinalid, 'Data final', true, false, null);

		newdiv.appendChild(labelfinal);
		newdiv.appendChild(datefinal);

		// text field to personalised the filter
		// var personalisedid = datepersonalised_default+datenewidfilter;
		// var personalised = createNewInput(personalisedid, 'text', null, true, validateTextPersonalised);
		// createDivWithDatalistsToColumn(personalisedid);

		// // label to personalised filters
		// var labelpersonalised = createNewLabel(datelabelpersonalised_default+datenewidfilter, 'Personalizado', true, false, null);

		// newdiv.appendChild(labelpersonalised);
		// newdiv.appendChild(personalised);

		var arrayoptionscount = optionsCounter('date');

		// creating the select options to counter
		var selectcountid = datecountselect_default+datenewidfilter;
		var selectcount = createSelectWithOptions(selectcountid, arrayoptionscount);
		selectcount.onchange = dateSelectCountChange;
		newdiv.appendChild(selectcount);

		// text field to conditions filter
		var conditionsid = dateconditions_default+datenewidfilter;
		var conditions = createNewInput(conditionsid, 'text', null, true, null);

		// label to conditions filters
		var labelconditionsid = datelabelconditions_default+datenewidfilter;
		var labelconditions = createNewLabel(labelconditionsid, 'Condição', true, false, null);

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

		var dateinitial, datefinal, labelinitial, labelfinal, personalise, labelpersonalised;

		dateinitial = document.getElementById(datepickerinitial_default+id);
		datefinal = document.getElementById(datepickerfinal_default+id);
		labelinitial = document.getElementById(datelabelinitial_default+id);
		labelfinal = document.getElementById(datelabelfinal_default+id);
		personalised = document.getElementById(datepersonalised_default+id);
		labelpersonalised = document.getElementById(datelabelpersonalised_default+id);

		switch(optionSelected){
			case 'range':
				dateinitial.hidden = false;
				labelinitial.hidden = false;
				datefinal.hidden = false;
				labelfinal.hidden = false;
				personalised.hidden = true;
				labelpersonalised.hidden = true;
				break;
			case 'biggerthan':
				dateinitial.hidden = false;
				labelinitial.hidden = false;
				datefinal.hidden = true;
				labelfinal.hidden = true;
				personalised.hidden = true;
				labelpersonalised.hidden = true;
				break;
			case 'lessthan':
				datefinal.hidden = false;
				labelfinal.hidden = false;
				dateinitial.hidden = true;
				labelinitial.hidden = true;
				personalised.hidden = true;
				labelpersonalised.hidden = true;
				break;
			case 'personalised':
				dateinitial.hidden = true;
				datefinal.hidden = true;
				labelinitial.hidden = true;
				labelfinal.hidden = true;
				personalised.hidden = false;
				labelpersonalised.hidden = false;
				break;
			default:
				dateinitial.hidden = true;
				datefinal.hidden = true;
				labelinitial.hidden = true;
				labelfinal.hidden = true;
				personalised.hidden = true;
				labelpersonalised.hidden = true;
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
		var newdivid = numbergroupfilter_default+numbernewidfilter;
		var newdiv = createNewDiv(newdivid, null, null, null, null);

		// label with attribute name
		var namecolumntext = 'Coluna: '+numbercolumn.name;
		var namecolumn = createNewLabel(null, namecolumntext, false, false, null);
		
		newdiv.appendChild(namecolumn);

		// creating the select option id
		var idselect = numberselectformtype_default+numbernewidfilter;

		var arrayoptions = optionsIntervals('number');

		// creating the select options to numbers
		var select = createSelectWithOptions(idselect, arrayoptions);
		select.onchange = numberSelectIntervalNumberChange;
		newdiv.appendChild(select);

		// creating the number filters to use after the select change
		var numberinitial = createNewInput(numberinitial_default+numbernewidfilter, 'number', null, true, null);

		// label to initial number
		var labelinitial = createNewLabel(numberlabelinitial_default+numbernewidfilter, 'Valor inicial', true, false, null);

		newdiv.appendChild(labelinitial);
		newdiv.appendChild(numberinitial);

		// creating the number filters to use after the select change
		var numberfinal = createNewInput(numberfinal_default+numbernewidfilter, 'number', null, true, null);

		// label to final number
		var labelfinal = createNewLabel(numberlabelfinal_default+numbernewidfilter, 'Valor final', true, false, null);

		newdiv.appendChild(labelfinal);
		newdiv.appendChild(numberfinal);

		// text field to personalised filter
		var idpersonalised = numberpersonalised_default+numbernewidfilter;
		var personalised = createNewInput(idpersonalised, 'text', null, true, validateTextPersonalised);
		createDivWithDatalistsToColumn(idpersonalised);

		// label to personalise filters
		var labelpersonalised = createNewLabel(numberlabelpersonalised_default+numbernewidfilter, 'Personalizado', true, false, null);

		newdiv.appendChild(labelpersonalised);
		newdiv.appendChild(personalised);

		var arrayoptionscount = optionsCounter('number');

		// creating the select options to counter
		var selectcount = createSelectWithOptions(numbercountselect_default+numbernewidfilter, arrayoptionscount);
		selectcount.onchange = numberSelectCountChange;
		newdiv.appendChild(selectcount);

		// text field to conditions filter
		var conditions = createNewInput(numberconditions_default+numbernewidfilter, 'text', null, true, null);

		// label to conditions filters
		var labelconditions = createNewLabel(numberlabelconditions_default+numbernewidfilter, 'Condição', true, false, null);

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
		personalised = document.getElementById(numberpersonalised_default+id);
		labelpersonalised = document.getElementById(numberlabelpersonalised_default+id);

		switch(optionSelected){
			case 'range':
				numberinitial.hidden = false;
				labelinitial.hidden = false;
				numberfinal.hidden = false;
				labelfinal.hidden = false;
				personalised.hidden = true;
				labelpersonalised.hidden = true;
				break;
			case 'biggerthan':
				numberinitial.hidden = false;
				labelinitial.hidden = false;
				numberfinal.hidden = true;
				labelfinal.hidden = true;
				personalised.hidden = true;
				labelpersonalised.hidden = true;
				break;
			case 'lessthan':
				numberfinal.hidden = false;
				labelfinal.hidden = false;
				numberinitial.hidden = true;
				labelinitial.hidden = true;
				personalised.hidden = true;
				labelpersonalised.hidden = true;
				break;
			case 'personalised':
				numberinitial.hidden = true;
				numberfinal.hidden = true;
				labelinitial.hidden = true;
				labelfinal.hidden = true;
				personalised.hidden = false;
				labelpersonalised.hidden = false;
				break;
			default:
				numberinitial.hidden = true;
				numberfinal.hidden = true;
				labelinitial.hidden = true;
				labelfinal.hidden = true;
				personalised.hidden = true;
				labelpersonalised.hidden = true;
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

	/* -------------------------------- GENERATE COLUMN FILTER TYPE TEXT -------------------------------- */
	function createNewFiltersText(textcolumn){
		// getting the group with the columns filters already on div
		var grouptextfilters = document.getElementById(textidgroupdivscolumnsfilters);

		// getting all text filters already on div
		var textfilters = grouptextfilters.children;

		// setting the new id to new text filter
		var textnewidfilter = textfilters.length + 1;

		// creating new div with the filters 
		var newdiv = createNewDiv(textgroupfilter_default+textnewidfilter, true, dragColumn, null, null);

		// label with attribute name
		var namecolumn = createNewLabel(null, 'Coluna: '+textcolumn.name, false, false, null);

		newdiv.appendChild(namecolumn);

		// creating the select option id
		var idselect = textselectformtype_default+textnewidfilter;

		var arrayoptions = optionsIntervals('text');

		// creating the select options to text
		var select = createSelectWithOptions(idselect, arrayoptions);
		select.onchange = textSelectIntervalTextChange;
		newdiv.appendChild(select);

		// text field to personalise the filter
		var idpersonalised = textpersonalised_default+textnewidfilter;
		var personalised = createNewInput(idpersonalised, 'text', null, true, validateTextPersonalised);
		createDivWithDatalistsToColumn(idpersonalised);

		// label to personalise filters
		var labelpersonalised = createNewLabel(textlabelpersonalised_default+textnewidfilter, 'Personalizado', true, false, null);

		newdiv.appendChild(labelpersonalised);
		newdiv.appendChild(personalised);

		var arrayoptionscount = optionsCounter('text');

		// creating the select options to counter
		var selectcount = createSelectWithOptions(textcountselect_default+textnewidfilter, arrayoptionscount);
		selectcount.onchange = textSelectCountChange;
		newdiv.appendChild(selectcount);

		// text field to conditions filter
		var conditions = createNewInput(textconditions_default+textnewidfilter, 'text', null, true, null);

		// label to conditions filters
		var labelconditions = createNewLabel(textlabelconditions_default+textnewidfilter, 'Condição', true, false, null);

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

		personalised = document.getElementById(textpersonalised_default+id);
		labelpersonalised = document.getElementById(textlabelpersonalised_default+id);

		switch(optionSelected){
			case 'personalised':
				personalised.hidden = false;
				labelpersonalised.hidden = false;
				break;
			default:
				personalised.hidden = true;
				labelpersonalised.hidden = true;
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

	/* --------- CREATING NEW ELEMENTS ------- */

	/* creating new div */
	function createNewDiv(iddiv, draggable, ondragstart, classname, innerhtml){
		var newdiv = document.createElement('div');
		if(iddiv != null){
			newdiv.id = iddiv;
		}
		if(draggable != null){
			newdiv.draggable = draggable;
		}
		if(ondragstart != null){
			newdiv.ondragstart = ondragstart;
		}
		if(classname != null){
			newdiv.className = classname;
		}
		if(innerhtml != null){
			newdiv.innerHTML = innerhtml;
		}
		return newdiv;
	}

	/* creating new label */
	function createNewLabel(id, innerhtml, hidden, draggable, ondragstart){
		var newlabel = document.createElement('label');
		if(innerhtml != null){
			newlabel.innerHTML = innerhtml;
		}
		if(id != null){
			newlabel.id = id;
		}
		if(draggable != null){
			newlabel.draggable = draggable;
		}
		if(ondragstart != null){
			newlabel.ondragstart = ondragstart;
		}
		if(hidden != null){
			newlabel.hidden = hidden;
		}
		return newlabel;
	}

	/* creating new input */
	function createNewInput(id, type, classname, hidden, oninput){
		var newinput = document.createElement('input');
		if(id != null){
			newinput.id = id;
		}
		if(type != null){
			newinput.type = type;
		}
		if(hidden != null){
			newinput.hidden = hidden;
		}
		if(classname != null){
			newinput.className = classname;
		}
		if(oninput != null){
			newinput.oninput = oninput;
		}
		return newinput;
	}

	/* creating new a */
	function createNewA(id, classname, onclick){
		var newa = document.createElement('a');
		if(id != null){
			newa.id = id;
		}
		if(classname != null){
			newa.className = classname;
		}
		if(onclick != null){
			newa.onclick = onclick;
		}
		return newa;
	}

	/* creating new img */
	function createNewImg(id, src, alt, title){
		var newimg = document.createElement('img');
		if(id != null){
			newimg.id = id;
		}
		if(src != null){
			newimg.src = src;
		}
		if(alt != null){
			newimg.alt = alt;
		}
		if(title != null){
			newimg.title = title;
		}
		return newimg;
	}


	/* --------------------------------------- */

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
			arrayoptions.push(option1, option2, option3);
		}
		var option4 = {value:"personalised", text:"Personalizado"};
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

	/* Creating the new div to datalists to a new column created */
	function createDivWithDatalistsToColumn(idtextfield){
		var type = idtextfield.split('-')[0];
		var iddivdatalists = iddatalists+type;
		var divdatalists = document.getElementById(iddivdatalists);

		var idnewdatalist = iddivdatalists+'-'+idtextfield.split('-')[2];

		var newdiv = createNewDiv(idnewdatalist, null, null, null, null);
		divdatalists.appendChild(newdiv);
	}

	/* --------------------------------------------------------------------------------------------------------------------- */
	
	/* ------------------------------------------ FUNCTIONS TO MANIPULATE SCREEN ------------------------------------------- */

	/* function to remove all columns filters */
	function clearAllColumnsFilters(){
		var groupdatefilters = document.getElementById(dateidgroupdivscolumnsfilters);
		if(groupdatefilters != null){
			while (groupdatefilters.firstChild) {
			    groupdatefilters.removeChild(groupdatefilters.firstChild);
			}
		}
		var groupnumberfilters = document.getElementById(numberidgroupdivscolumnsfilters);
		if(groupnumberfilters != null){
			while (groupnumberfilters.firstChild) {
			    groupnumberfilters.removeChild(groupnumberfilters.firstChild);
			}
		}
		var grouptextfilters = document.getElementById(textidgroupdivscolumnsfilters);
		if(grouptextfilters != null){
			while (grouptextfilters.firstChild) {
			    grouptextfilters.removeChild(grouptextfilters.firstChild);
			}
		}
	}

	function clearTitleAndDescriptionPlot(){
		var titleplot = document.getElementById('title-plot');
		titleplot.value = '';
		var descriptionplot = document.getElementById('description-plot');
		descriptionplot.value = '';
	}

	function clearColumns(eixo){
		var columns = document.getElementById('columns-group-'+eixo);
		while (columns.firstChild) {
		    columns.removeChild(columns.firstChild);
		}
	}

	/* Enable button save */
	$('#generate-new').on('click', function(){
		clearAllColumnsFilters();
		clearTitleAndDescriptionPlot();
		clearColumns('x');
		clearColumns('y');
		loadColumns(null);
		var idplot = document.getElementById('id-plot');
		idplot.textContent = '';
	});

 	/* Enable button save */
	$('#title-plot').on('input', function(){
		var buttonsave = document.getElementById('button-save');
		if(this.value.length>0){
			buttonsave.removeAttribute('disabled');
		} else {
			buttonsave.setAttribute('disabled', 'disabled');
		}
	});

	/* Enable the select different graphic of graphic default */
	$('#select-default-graphic').on('change', function(){
		enableButtonSecondaryGraphic(this);
		changeGraphicDefault(this);
	});

	/* Enable the select different graphic of graphic default */
	$('#select-secundary-graphic').on('change', function(){
		var graphic = this.value;

		switch(graphic){
			case 'bar':
				setBarGraphic();
			break;
			case 'line':
				setLineGraphic();
			break;
			default:
			break;
		}
	});

	function enableButtonSecondaryGraphic(selectdefaultgraphic){
		var graphicsecondary = document.getElementById('select-secundary-graphic');
		if(selectdefaultgraphic.value != 'pizza' && selectdefaultgraphic.value != 'table'){
			graphicsecondary.removeAttribute('disabled');
			graphicsecondary.value = selectdefaultgraphic.value;
		} else {
			graphicsecondary.setAttribute('disabled', 'disabled');
		}
	}

	function changeGraphicDefault(selectdefaultgraphic){
		var graphic = selectdefaultgraphic.value;

		switch(graphic){
			case 'bar':
				setBarGraphic();
			break;
			case 'line':
				setLineGraphic();
			break;
			case 'pizza':
				setPizzaGraphic();
			break;
			case 'table':
				setTableGraphic();
			break;
			default:
			break;
		}
	}

 	/* Check all plots */
	$('#check-all-plots').on('change', function(){
		var stateCheckAll = $('#check-all-plots').is(':checked');
		var plots = $('#checkbox-plots-group');
		var checkboxes = plots.children('div');
		var checkbox;

		if(checkboxes.length > 0){
			for( var i = 0; i < checkboxes.length; i++){
			    checkbox = checkboxes[i].children[0];
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
	function removePlot(){
		var divid = this.id.replace("del-", "");
		var elem = document.getElementById(divid);
		elem.parentNode.removeChild(elem);
	}

	/* ------------- FUNCTIONS DRAG AND DROP -------------------- */

	/* allowing drop in elements */
	function allowDrop(ev) {
	    ev.preventDefault();
	}

	/* drag column with filters */
	function dragColumn(ev) {
		// setting data in event to capture on drop event
	    ev.dataTransfer.setData("id-div", ev.target.id);
	    var namecolumn = ev.target.children[0].innerHTML.split(':')[1];
	    ev.dataTransfer.setData("name-column", namecolumn);
	}

	/* drop column with filters */
	function dropColumn(ev) {
	    ev.preventDefault();
	    // getting the data setted on the drag event
	    var column = ev.target.id.split('-')[2];
	    var iddiv = ev.dataTransfer.getData("id-div");
	    var namecolumn = ev.dataTransfer.getData("name-column");
	    var type = iddiv.split('-')[2];
	    generateNewColumnOnGraphic(column, null, type, namecolumn);
	}

	/* drag plot to open graphic */
	function dragPlot(ev){
		var title = ev.target.textContent;
		ev.dataTransfer.setData("title-plot", title);
	}

	/* drop plot to open graphic */
	function dropPlot(ev){
		ev.preventDefault();
		var title = ev.dataTransfer.getData("title-plot");
		updateGraphicWithPlotDropped(title);
	}
	/* -------------------------------------------------------- */

	function updateGraphicWithPlotDropped(titleplot){
		clearColumns('x');
		clearColumns('y');
		var jsonplot;
		for(var i = 0; i < arrayjsonplots.length; i++){
			jsonplot = jQuery.parseJSON(arrayjsonplots[i]);
			if(jsonplot.title == titleplot){
				generateColumnsByDroppedPlot(jsonplot);
				var titleplot = document.getElementById('title-plot');
				titleplot.value = jsonplot.title;
				var descriptionplot = document.getElementById('description-plot');
				descriptionplot.value = jsonplot.description;
				var graphicdefault = document.getElementById('select-default-graphic');
				graphicdefault.value = jsonplot.graphicdefault;
				var graphicsecondary = document.getElementById('select-secundary-graphic');
				graphicsecondary.value = jsonplot.graphicsecondary;
				changeGraphicDefault(graphicdefault);
				var plotid = document.getElementById('id-plot');
				plotid.textContent = jsonplot.id;
			}
		}
	}

	function generateColumnsByDroppedPlot(jsonplot){
		var columnsx = jsonplot.columnsx;
		var columnsy = jsonplot.columnsy;
		for(var i = 0; i < columnsx.length; i++){
			generateNewColumnOnGraphic('x', columnsx[i].id, null, columnsx[i].name);
		}
		for(var i = 0; i < columnsy.length; i++){
			generateNewColumnOnGraphic('y', columnsy[i].id, null, columnsy[i].name);
		}
	}

	/* function to create a panel with new column */
	function generateNewColumnOnGraphic(column, iddiv, type, namecolumn){

		var divcolumns;

		divcolumns = document.getElementById('columns-group-'+column);

		var columnid;

		if(iddiv == null || iddiv == ''){
			var childrens = divcolumns.children;
			var childrenslength = childrens.length;
			if(childrenslength > 0){
				var lastcolumnid = childrens[childrenslength-1].id;
				var lastcolumnidnumber = lastcolumnid.split('-')[3];
				columnid = parseInt(lastcolumnidnumber)+1;
			} else {
				columnid = 1;
			}
		} else {
			columnid = iddiv;
		}


		var idfirstdiv = 'group-column-'+column+'-'+columnid;
		var classnamefirstdiv = 'form-group panel-columns-'+column+' panel-columns';

		var firstdiv = createNewDiv(idfirstdiv, null, null, classnamefirstdiv, null);

		var classnameseconddiv = 'panel panel-default';
		var seconddiv = createNewDiv(null, null, null, classnameseconddiv, null);

		var aid = 'group-column-'+column+'-del-'+columnid;
		var classnamea = 'img-rounded pull-right close-panel-column';
		var a = createNewA(aid, classnamea, closeDivColumn);

		var imgsrc = 'img/close.png';
		var imgalt = 'Excluir';
		var img = createNewImg(null, imgsrc, imgalt, null);

		var classnamethirddiv = 'panel-body';
		var thirddiv = createNewDiv(null, null, null, classnamethirddiv, namecolumn);

		a.appendChild(img);
		seconddiv.appendChild(a);
		seconddiv.appendChild(thirddiv);
		firstdiv.appendChild(seconddiv);

		divcolumns.appendChild(firstdiv);
	}

	/* Save configuration graphic in a new plot */
	$('#button-save').on('click', function(){
		var titleplot = document.getElementById('title-plot');
		var descriptionplot = document.getElementById('description-plot');
		var graphicdefault = document.getElementById('select-default-graphic');
		var graphicsecondary = document.getElementById('select-secundary-graphic');

		var olderplotid = document.getElementById('id-plot');
		if(olderplotid.textContent == null || olderplotid.textContent == ''){
			idplot = idplot+1;
			olderplotid.textContent = idplot;
		} else {
			idplot = olderplotid.textContent;
		}

		generateJsonWithColumnsGraphic(idplot, titleplot.value, descriptionplot.value, graphicdefault.value, graphicsecondary.value);	
		generateNewPlot(idplot, titleplot.value);
	});	

	/* when save a new plot, generate a json with the columns */
	function generateJsonWithColumnsGraphic(idplot, titleplot, descriptionplot, graphicdefault, graphicsecondary){
		var columnsx = document.getElementById('columns-group-x');
		var columnsy = document.getElementById('columns-group-y');
		var newplot = new Object();
		newplot.id = idplot;
		newplot.title = titleplot;
		newplot.description = descriptionplot;
		newplot.graphicdefault = graphicdefault;
		newplot.graphicsecondary = graphicsecondary;

		var columnsarrayx = generateArrayColumns(columnsx);
		var columnsarrayy = generateArrayColumns(columnsy);

		newplot.columnsx = columnsarrayx;
		newplot.columnsy = columnsarrayy;

		removingOlderPlot(idplot, arrayjsonplots);
		arrayjsonplots.push(JSON.stringify(newplot));
		console.log(JSON.stringify(newplot));
	}

	function removingOlderPlot(idplot, arrayjsonplots){
		for(var i = 0; i < arrayjsonplots.length; i++){
			var json = jQuery.parseJSON(arrayjsonplots[i]);
			if(json.id == idplot){
				arrayjsonplots.splice(i,1);
				break;
			}
		}
	}

	/* generate array columns of div */
	function generateArrayColumns(columnsdiv){
		var columnsarray = new Array();

		var columns = columnsdiv.children;
		var column;
		for(var i = 0; i < columns.length; i++){
			column = new Object();
			column.id = columns[i].id;
			var namecolumn = columns[i].children[0].children[1].innerHTML;
			column.name = namecolumn;
			columnsarray.push(column);
		}
		return columnsarray;
	}

	/* function to create a new plot */
	function generateNewPlot(idplot, titleplot){

		var divplots = document.getElementById('checkbox-plots-group');

		var olderdiv = document.getElementById('checkbox-plot-'+idplot);

		if(olderdiv != null){
			var label = olderdiv.children[1];
			label.textContent = titleplot;
		} else {
			var divid = 'checkbox-plot-'+idplot;
			var divclassname = 'checkbox';
			var div = createNewDiv(divid, null, null, divclassname, null);

			var label = createNewLabel(null, titleplot, null, true, dragPlot);

			var input = createNewInput(null, 'checkbox', null, null, null);

			var aid = 'checkbox-plot-del-'+idplot;
			var classnamea = 'a-img-trash-plot';
			var a = createNewA(aid, classnamea, removePlot);

			var imgsrc = 'img/trash.png';
			var imgalt = 'Excluir';
			var imgtitle = 'Excluir';
			var img = createNewImg(null, imgsrc, imgalt, imgtitle)

			div.appendChild(input);
			div.appendChild(label);
			a.appendChild(img);
			div.appendChild(a);

			divplots.appendChild(div);
		}
	}

	/* Array datalist with functions */
	function arrayDataListFunctions(text){
		// generating the options to functions
		var option0 = {value:text+"sum("};
		var option1 = {value:text+"avg("};

		// creating array with the options
		var arrayoptions = new Array(option0, option1);

		return arrayoptions;
	}

	/* Array datalist with functions and name of columns */
	function arrayDataListFunctionsAndColumns(text){
		// creating array with the options
		var arrayoptions = $.merge(arrayDataListFunctions(text),arrayDataListColumns(text));
		return arrayoptions;
	}

	/* Array datalist with the simbols */
	function arrayDataListSimbols(text, parenteses){
		// generating the options to functions
		var arrayoptions = new Array();

		if(!parenteses) {
			var option0 = {value:text+")"};
			arrayoptions.push(option0);
		}

		var option1 = {value:text+"+"};
		var option2 = {value:text+"-"};
		var option3 = {value:text+"*"};
		var option4 = {value:text+"/"};
		arrayoptions.push(option1, option2, option3, option4);

		return arrayoptions;
	}

	/* Array datalist with name of columns */
	function arrayDataListColumns(text){
		// generating the columns options 
		var option0 = {value:text+"salario"};
		var option1 = {value:text+"idade"};
		var option2 = {value:text+"peso"};
		var option3 = {value:text+"altura"};

		// creating array with the options
		var arrayoptions = new Array(option0, option1, option2, option3);

		return arrayoptions;
	}

	/* validating the text inputted on the personalised field */
	function validateTextPersonalised(){
		var value = this.value;
		var idtextfield = this.id;
		var arrayoptions;
		var datalist;
		var typedatalists = idtextfield.split('-')[0];
		var iddatalists = idtextfield.split('-')[2];

		// getting the div based on column
		var iddatalistspersonalised = 'datalists-personalised-'+typedatalists+'-'+iddatalists;
		var datalistspersonalised = document.getElementById(iddatalistspersonalised);
	
		// removing all the datalists to create a new valid datalist
		while (datalistspersonalised.firstChild) {
		    datalistspersonalised.removeChild(datalistspersonalised.firstChild);
		}
		if(value.length > 0){
			// checking the first value inputted
			if(value[0] == 's' || value[0] == 'a'){ 
				if(validateInitialPersonalised(value, this)){
					// validating the initial word 
					arrayoptions = arrayDataListFunctions('');
					datalist = createDataList(arrayoptions);
				} else if(validateFunctionPersonalised(value, this)){
					// after initial word with the formula, insert the name of columns
					arrayoptions = arrayDataListColumns(value);
					datalist = createDataList(arrayoptions);
				} else if(validateSignalPersonalised(value, this)){
					// after the columns, insert the signal or close the formula
					arrayoptions = arrayDataListFunctionsAndColumns(value);
					datalist = createDataList(arrayoptions);
				} else if(validadeColumnSelected(value, this)){
					// in another cases
					var parenteses = value[value.length-1] == ')';
					arrayoptions = arrayDataListSimbols(value,parenteses);
					datalist = createDataList(arrayoptions);
				} else {
					// in another cases
					var parenteses = value[value.length-1] == ')';
					arrayoptions = arrayDataListSimbols(value,parenteses);
					datalist = createDataList(arrayoptions);
				}
			} else {
				// case the first value inputted is not 's' or 'a'
				this.value = '';
				arrayoptions = arrayDataListFunctions('');
				datalist = createDataList(arrayoptions);
			}
		} else {
			// if value is length
			arrayoptions = arrayDataListFunctions('');
			datalist = createDataList(arrayoptions);
		}
		// creating the id of the datalists to personalised field
		datalist.id = 'datalistoptions-'+typedatalists+'-'+iddatalists;;
		datalistspersonalised.appendChild(datalist);
		this.setAttribute('list', datalist.id);		
	}

	/* validating the text of personalised on the initials inputs */
	function validateInitialPersonalised(text, textfield){
		if(text == 's' || text == 'su' || text == 'sum' || text == 'a' || text == 'av' || text == 'avg'){
			setClassNameToADatalist(textfield, null);
			return true;
		}
		setClassNameToADatalist(textfield, 'input-personalised');
		return false;
	}

	/* validating the text of personalised if is 'sum(' or 'avg('  */
	function validateFunctionPersonalised(text, textfield){
		if(text.length > 4){
			text = text.substring((text.length-4), (text.length));
		} 
		if(text == 'sum(' || text == 'avg('){
			setClassNameToADatalist(textfield, null);
			return true;
		} 	
		setClassNameToADatalist(textfield, 'input-personalised');	
		return false;
	}

	/* validating the text of personalised if is a signal */
	function validateSignalPersonalised(text, textfield){
		if(text.length > 0){
			var lastword = text[text.length-1];
			if(lastword == '+' || lastword == '-' || lastword == '/' || lastword == '*'){
				setClassNameToADatalist(textfield, null);
				return true;
			} 
		}
		setClassNameToADatalist(textfield, 'input-personalised');
		return false;
	}

	/* validating if the text insered is a name of an column */
	function validadeColumnSelected(text, textfield){
		if(text.length>0){
			var values = text.split('(');
			var value = values[values.length-1];
			if(isAColumnInsered(value)){
				setClassNameToADatalist(textfield, null);
				return true;
			}
		}
		setClassNameToADatalist(textfield, 'input-personalised');
		return false;
	}

	function isAColumnInsered(value){
		var arraycolums = arrayDataListColumns('');
		var namecolumn = '';
		for(var i=0; i < arraycolums.length; i++){
			namecolumn = arraycolums[i].value;
			if(value == namecolumn || value == namecolumn+')'){
				return true;
			}
		}
		return false;
	}

	/* create new element datalist based on arrayoptions */
	function createDataList(arrayoptions){
		var datalist = document.createElement('datalist');
		var option;
		for(var i=0; i < arrayoptions.length; i++){
			option =  document.createElement('option');
			option.value = arrayoptions[i].value;
			datalist.appendChild(option);
		}
		return datalist;
	}

	/* setting classname to a datalist */
	function setClassNameToADatalist(datalist, classname){
		if(datalist != null){
			datalist.className = classname;
		}
	}

	/* change graphic to a bar graphic */
	function setBarGraphic(){
		$('#chart').highcharts({
	        chart: {
	            type: 'bar'
	        },
	        title: {
	            text: 'Historic World Population by Region'
	        },
	        subtitle: {
	            text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
	        },
	        xAxis: {
	            categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
	            title: {
	                text: null
	            }
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Population (millions)',
	                align: 'high'
	            },
	            labels: {
	                overflow: 'justify'
	            }
	        },
	        tooltip: {
	            valueSuffix: ' millions'
	        },
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: true
	                }
	            }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'top',
	            x: -40,
	            y: 80,
	            floating: true,
	            borderWidth: 1,
	            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
	            shadow: true
	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	            name: 'Year 1800',
	            data: [107, 31, 635, 203, 2]
	        }, {
	            name: 'Year 1900',
	            data: [133, 156, 947, 408, 6]
	        }, {
	            name: 'Year 2012',
	            data: [1052, 954, 4250, 740, 38]
	        }]
	    });
	}

	/* change graphic to a line graphic */
	function setLineGraphic(){
		$('#chart').highcharts({
	        title: {
	            text: 'Monthly Average Temperature',
	            x: -20 //center
	        },
	        subtitle: {
	            text: 'Source: WorldClimate.com',
	            x: -20
	        },
	        xAxis: {
	            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	        },
	        yAxis: {
	            title: {
	                text: 'Temperature (°C)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: '°C'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{
	            name: 'Tokyo',
	            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
	        }, {
	            name: 'New York',
	            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
	        }, {
	            name: 'Berlin',
	            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
	        }, {
	            name: 'London',
	            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
	        }]
		});
	}

	/* change graphic to a pizza graphic */
	function setPizzaGraphic(){
		$('#chart').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	            text: 'Browser market shares January, 2015 to May, 2015'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: "Brands",
	            colorByPoint: true,
	            data: [{
	                name: "Microsoft Internet Explorer",
	                y: 56.33
	            }, {
	                name: "Chrome",
	                y: 24.03,
	                sliced: true,
	                selected: true
	            }, {
	                name: "Firefox",
	                y: 10.38
	            }, {
	                name: "Safari",
	                y: 4.77
	            }, {
	                name: "Opera",
	                y: 0.91
	            }, {
	                name: "Proprietary or Undetectable",
	                y: 0.2
	            }]
	        }]
	    });
	}

	function setTableGraphic(){
		
	}

	/* --------------------------------------------------------------------------------------------------------------------- */

});
