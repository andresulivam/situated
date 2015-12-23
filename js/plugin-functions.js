$(document).ready(function() {

	/* -------------------------------------------- INITIAL ---------------------------------------------------- */
	
	/* Function onload to draw screen */
	$('onload',function(completejson) {
		// JSON_TEST IS ON THE CONSTS.JS
		completejson = JSON_TEST;
		// filling the select with the columns options
		fillSelectColumnsWithJson(completejson);
		// initializing the graphic with a bar graphic
		setBarGraphic();
	});

	/* Filling the columns options based on json */ 
	function fillSelectColumnsWithJson(jsoncolumns){
		if(jsoncolumns != null){
			// getting the field message
			var data = jsoncolumns.message;
			if(data.length > 0){
				// getting the all properties of message on position 0
				var columns = Object.keys(data[0]);
				var arrayoptions = new Array();
				var option;
				var validcolumn;
				// loop to all properties/columns
				for(var i = 0; i < columns.length; i++){
					// checking the value of column
					validcolumn = validatingTheColumnFieldHasValue(data, columns[i], 0);
					if(validcolumn.valid){
						option = createNewOption(columns[i], columns[i], validcolumn.type);
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
	function validatingTheColumnFieldHasValue(data, column, position){
		var result = new Object();
		result.type = null;
		result.valid = false;
		if(position < data.length){
			var valuetype;
			// getting the message in a position
			var message = data[position];
			// getting the value of a column 
			var valuecolumn = message[column];
			if(valuecolumn != null){
				// testing the type of value
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
			} else {
				// recursive to a next message
				var valid = validatingTheColumnFieldHasValue(data, column, position+1);
				result = valid;
			}
		}
		return result;
	}

	/* --------------------------------------------------------------------------------------------------------- */

	/* --------------------------------------- CREATING ELEMENTS ----------------------------------------------- */

	/* creating new div */
	function createNewDiv(iddiv, draggable, ondragstart, classname, innerhtml, datatoggle){
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
		if(datatoggle != null){
			newdiv.setAttribute('data-toggle', datatoggle);
		}
		return newdiv;
	}

	/* creating new label */
	function createNewLabel(id, innerhtml, hidden, draggable, ondragstart, classname){
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
		if(classname != null){
			newlabel.className = classname;
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
		if(classname != null){
			newinput.className = classname;
		}
		if(oninput != null){
			newinput.oninput = oninput;
		}
		if(hidden != null){
			newinput.hidden = true;
		}
		return newinput;
	}

	/* creating new a */
	function createNewA(id, classname, onclick, datatoggle, href, textcontent){
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
		if(datatoggle != null){
			newa.setAttribute('data-toggle', datatoggle);
		}
		if(href != null){
			newa.href = '#'+href;
		}
		if(textcontent != null){
			newa.textContent = textcontent;
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

	/* creating new option */
	function createNewOption(value, text, classname){
		var option = document.createElement('option');
		if(value != null){
			option.value = value;
		}
		if(text != null){
			option.text = text;
		}
		if(classname != null){
			option.className = classname;
		}
		return option;			
	}

	/* creating new h4 */
	function createNewH4(classname){
		var h4 = document.createElement('h4');
		if(classname != null){
			h4.className = classname;
		}
		return h4;			
	}

	/* creating new h4 */
	function createNewScript(textcontent){
		var script = document.createElement('script');
		if(textcontent != null){
			script.text = textcontent;
		}
		return script;			
	}

	/* creating new select */
	function createNewSelect(id, classname){
		var select = document.createElement('select');
		if(id != null){
			select.id = id;
		}
		if(classname != null){
			select.className = classname;
		}
		return select;			
	}

	/* creating new button */
	function createNewButton(id, type, classname, innerhtml){
		var button = document.createElement('button');
		if(id != null){
			button.id = id;
		}
		if(type != null){
			button.type = type;
		}
		if(classname != null){
			button.className = classname;
		}
		if(innerhtml != null){
			button.innerHTML = innerhtml;
		}
		return button;			
	}


	/* --------------------------------------------------------------------------------------------------------- */

	/* --------------------------------------------- EVENTS ---------------------------------------------------- */

	/* Click to add a new column */
	$('#add-column').on('click', function(){
		var column = document.getElementById(CONST_SELECT_COLUMN);
		var axis = document.getElementById(CONST_SELECT_AXIS);

		generateNewColumnWithFilters(column, axis);
	});

	/* When change the filter of interval */
	function filterColumnChange(){
		configureScreenBySelectFilter(this);
	}

	/* --------------------------------------------------------------------------------------------------------- */

	/* -------------------------------------------- FUNCTIONS -------------------------------------------------- */
	
	/* Generating the new column with filters */
	function generateNewColumnWithFilters(selectcolumn, selectaxis){
		
		var option = selectcolumn.children[selectcolumn.selectedIndex];
		// type of column (text, number or date)
		var typecolumn = option.className.split('-')[0];

		var newid;

		// checking where add the new column
		if(selectaxis.value == CONST_AXIS_Y){
			// getting all columns already on the axis y
			var groupaxisy = document.getElementById(CONST_COLUMNS_GROUP_Y);		
			var lastchildren = groupaxisy.children[groupaxisy.children.length-1];
			if(lastchildren != null){
				var idlastchildren = lastchildren.id;
				newid = parseInt(idlastchildren.split('-')[3]) + 1;
			} else {
				newid = 1;
			}
			createColumnWithFilter(newid, selectcolumn, groupaxisy, typecolumn, CONST_Y);
		} else {
			var groupaxisX = document.getElementById(CONST_COLUMNS_GROUP_X);
			while (groupaxisX.firstChild) {
			    groupaxisX.removeChild(groupaxisX.firstChild);
			}
			newid = 1;
			createColumnWithFilter(newid, selectcolumn, groupaxisX, typecolumn, CONST_X);
		}
	}


	function createColumnWithFilter(newid, selectcolumn, groupcolumns, typecolumn, axis){
		
		// div parent of column
		var iddivpanel = CONST_COLUMN+'-'+selectcolumn.value+'-'+axis+'-'+newid;
		var divpaneldefault = createNewDiv(iddivpanel, null, null, CONST_PANEL_PANEL_DEFAULT, null, null);
		
		// panel children of divpaneldefault
		var divpanelheading = createNewDiv(null, null, null, CONST_PANEL_HEADING, null, null);

		divpaneldefault.appendChild(divpanelheading);

		// title of panel
		var h4 = createNewH4(CONST_PANEL_TITLE);

		var idpanelcollapse = CONST_COLLAPSE+'-'+iddivpanel;

		// remove column
		var adatatoggle = createNewA(null, null, null, CONST_COLLAPSE, idpanelcollapse, selectcolumn.value);
		var idaremove = CONST_REMOVE+'-'+iddivpanel
		var aremove = createNewA(idaremove, CONST_PULL_RIGHT_REMOVE_COLUMN, null, null, null, null);
		var img = createNewImg(null, CONST_IMG_CLOSE, null, null);
		aremove.appendChild(img);

		h4.appendChild(adatatoggle);
		h4.appendChild(aremove);

		divpanelheading.appendChild(h4);

		divpaneldefault.appendChild(divpanelheading);

		// panel collapse
		var divpanelcollapse = createNewDiv(idpanelcollapse, null, null, CONST_PANEL_COLLAPSE_COLLAPSE, null, null);

		// div filter column
		var divfiltercolumn = createNewDiv(null, null, null, CONST_FILTER_COLUMN_Y, null, CONST_COLLAPSE);

		if(axis == CONST_Y){
			// row with type of graphic
			var rowgraphic = createRowGraphicType(iddivpanel);

			divfiltercolumn.appendChild(rowgraphic);
		}

		if(typecolumn == CONST_NUMBER || typecolumn == CONST_DATE){
			// row with filter (range, less or big)
			var rowfilter = createRowFilter(iddivpanel, filterColumnChange);

			// initial filter
			var rowrangeinitial = createRowRange(iddivpanel, typecolumn, INITIAL, true);

			// final filter
			var rowrangefinal = createRowRange(iddivpanel, typecolumn, FINAL, true);
	
			divfiltercolumn.appendChild(rowfilter);
			divfiltercolumn.appendChild(rowrangeinitial);
			divfiltercolumn.appendChild(rowrangefinal);
		}

		divpanelcollapse.appendChild(divfiltercolumn);

		if(axis == CONST_Y){
			// row condition
			var rowcondition = createRowCondition(iddivpanel, typecolumn);
			divpanelcollapse.appendChild(rowcondition);
		}

		// row research
		var rowresearch = createRowResearch(iddivpanel);

		divpanelcollapse.appendChild(rowresearch);
			
		divpaneldefault.appendChild(divpanelcollapse);

		if(axis == CONST_X){
			var divrow = createNewDiv(null, null, null, CONST_ROW, null, null);
			var divcolxs3 = createNewDiv(null, null, null, CONST_COL_XS_3, null, null);
			divcolxs3.appendChild(divpaneldefault);
			divrow.appendChild(divcolxs3);
			groupcolumns.appendChild(divrow);
		} else {
			groupcolumns.appendChild(divpaneldefault);
		}
	}

	/* Creating the row graphic type */
	function createRowGraphicType(iddivpanel){

		// principal row
		var divrow = createNewDiv(null, null, null, CONST_ROW, null, null);

		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null);

		var label = createNewLabel(null, GRAPHIC, null, null, null, CONST_LABEL_COLUMNS_FILTERS);

		divcolxs4.appendChild(label);

		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null);

		var idselect = CONST_SELECT_GRAPHIC+'-'+iddivpanel;
		var select = createNewSelect(idselect, CONST_FORM_CONTROL);

		var optionbar = createNewOption(CONST_BAR, BAR, null);
		var optionline = createNewOption(CONST_LINE, LINE, null);
		
		select.appendChild(optionbar);
		select.appendChild(optionline);

		divcolxs8.appendChild(select);

		divrow.appendChild(divcolxs4);
		divrow.appendChild(divcolxs8);

		return divrow;
	}

	/* Creating the row with filter */
	function createRowFilter(iddivpanel, functionfiltercolumnchange){

		// principal row
		var divrow = createNewDiv(null, null, null, CONST_ROW, null, null);

		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null);

		var label = createNewLabel(null, FILTER, null, null, null, CONST_LABEL_COLUMNS_FILTERS);

		divcolxs4.appendChild(label);

		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null);

		var idselect = CONST_SELECT_FILTER+'-'+iddivpanel;
		var select = createNewSelect(idselect, CONST_FORM_CONTROL);
		if(functionfiltercolumnchange != null){
			select.onchange = functionfiltercolumnchange;
		}
		var optionselect = createNewOption(CONST_SELECT, SELECT, null);
		var optionrange = createNewOption(CONST_RANGE, RANGE, null);
		var optionbiggerthan = createNewOption(CONST_BIGGER_THAN, BIGGER_THAN, null);
		var optionlessthan = createNewOption(CONST_LESS_THAN, LESS_THAN, null);
		
		select.appendChild(optionselect);
		select.appendChild(optionrange);
		select.appendChild(optionbiggerthan);
		select.appendChild(optionlessthan);

		divcolxs8.appendChild(select);

		divrow.appendChild(divcolxs4);
		divrow.appendChild(divcolxs8);

		return divrow;
	}

	/* Creating the row with filter */
	function createRowRange(iddivpanel, inputtype, type, hidden){	

		var current;
		var currentlabel;
		if(type ==  INITIAL){
			current = CONST_INITIAL;
			currentlabel = CONST_INITIAL_LABEL;
		} else if(type == FINAL){
			current = CONST_FINAL;
			currentlabel = CONST_FINAL_LABEL;
		}
		// principal row
		var divrow = createNewDiv(null, null, null, CONST_ROW, null, null);

		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null);

		var labelid = currentlabel+'-'+iddivpanel;
		var label = createNewLabel(labelid, type, hidden, null, null, CONST_LABEL_COLUMNS_FILTERS);

		divcolxs4.appendChild(label);

		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null);

		var idinput = current+'-'+iddivpanel; 
		var inputrange = createNewInput(idinput, inputtype, CONST_FORM_CONTROL, true, null);
		
		divcolxs8.appendChild(inputrange);

		divrow.appendChild(divcolxs4);
		divrow.appendChild(divcolxs8);

		return divrow;
	}

	/* Creating the row with filter */
	function createRowCondition(iddivpanel, typecolumn){

		// principal row
		var divrow = createNewDiv(null, null, null, CONST_ROW, null, null);

		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null);

		var label = createNewLabel(null, CONDITION, null, null, null, CONST_LABEL_COLUMNS_FILTERS);

		divcolxs4.appendChild(label);

		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null);

		var idselect = CONST_CONDITION+'-'+iddivpanel;
		var select = createNewSelect(idselect, CONST_FORM_CONTROL);

		var optionselect = createNewOption(CONST_COUNT_ALL, COUNT_ALL, null);
		var optionrange = createNewOption(CONST_COUNT_IF, COUNT_IF, null);	
		select.appendChild(optionselect);
		select.appendChild(optionrange);

		if(typecolumn == CONST_NUMBER){
			var optionsum = createNewOption(CONST_SUM, SUM, null);
			var optionsumif = createNewOption(CONST_SUM_IF, SUM_IF, null);
			var optionaverage = createNewOption(CONST_AVERAGE, AVERAGE, null);

			select.appendChild(optionsum);
			select.appendChild(optionsumif);
			select.appendChild(optionaverage);
		}

		divcolxs8.appendChild(select);

		divrow.appendChild(divcolxs4);
		divrow.appendChild(divcolxs8);

		return divrow;
	}

	/* Creating the row with the research button */
	function createRowResearch(iddivpanel){

		// principal row
		var divrow = createNewDiv(null, null, null, CONST_ROW_REFRESH_COLUMNS_FILTERS, null, null);

		var divwithbutton = createNewDiv(null, null, null, CONST_COL_XS_12_PULL_RIGHT, null, null);

		var idbutton = CONST_RESEARCH+'-'+iddivpanel;
		var button = createNewButton(idbutton, CONST_BUTTON, CONST_BTN_BTN_PRIMARY_PULL_RIGHT, RESEARCH);

		divwithbutton.appendChild(button);
		divrow.appendChild(divwithbutton);

		return divrow;
	}

	/* Configuring screen by user select filter (range, less or big) */
	function configureScreenBySelectFilter(select){	
		var selectid = select.id;
		var id = selectid.replace(CONST_SELECT_FILTER, "");
		var idinitial = CONST_INITIAL+id;
		var idfinal = CONST_FINAL+id;
		var labelinitial = CONST_INITIAL_LABEL+id;
		var labelfinal = CONST_FINAL_LABEL+id;

		var initialinput = document.getElementById(idinitial);
		var finalinput = document.getElementById(idfinal);
		var initiallabel = document.getElementById(labelinitial);
		var finallabel = document.getElementById(labelfinal);

		var value = select.value;

		switch(value){
			case CONST_RANGE:
				initialinput.hidden = false;
				initiallabel.hidden = false;
				finalinput.hidden = false;
				finallabel.hidden = false;
				break;
			case CONST_BIGGER_THAN:
				initialinput.hidden = false;
				initiallabel.hidden = false;
				finalinput.hidden = true;
				finallabel.hidden = true;
				break;
			case CONST_LESS_THAN:
				initialinput.hidden = true;
				initiallabel.hidden = true;
				finalinput.hidden = false;
				finallabel.hidden = false;	
				break;
			default:
				initialinput.hidden = true;
				finalinput.hidden = true;
				initiallabel.hidden = true;
				finallabel.hidden = true;
				break;		
		}
	}
	/* --------------------------------------------------------------------------------------------------------- */

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

});