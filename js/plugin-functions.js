$(document).ready(function() {
	
	/* Desenhando tela */
	$('onload',function(completejson) {
		// JSON_TEST está no arquivo consts.js
		completejson = JSON_TEST;
		// Preenchendo o combobox de colunas baseados no json (dinamicamente)
		fillSelectColumnsWithJson(completejson);
	});

	/* Preenchendo o combobox de colunas baseados no json */ 
	function fillSelectColumnsWithJson(jsoncolumns){
		if(jsoncolumns != null){
			// Recuperando o atributo 'message' que possui todas as colunas
			var data = jsoncolumns.message;
			if(data.length > 0){
				// Recuperando todos os atributos filhos do atributo 'message'
				var columns = Object.keys(data[0]);
				var arrayoptions = new Array();
				var option;
				var validcolumn;
				// Laco para todas os atributos/colunas
				for(var i = 0; i < columns.length; i++){
					// Verificando se existe valor na coluna atual
					validcolumn = validatingTheColumnFieldHasValue(data, columns[i], 0);
					if(validcolumn.valid){
						option = createNewOption(columns[i], columns[i], validcolumn.type);
						arrayoptions.push(option);
					}
				}
				var select = document.getElementById(CONST_SELECT_COLUMN);
				for(var i = 0; i < arrayoptions.length; i++){
					// Adicionando todos os atributos/colunas ao combobox
					select.appendChild(arrayoptions[i]);
				}
			}
		}
	}

	/* Funcao recursiva para procurar valor na coluna para testar se e coluna válida */
	function validatingTheColumnFieldHasValue(data, column, position){
		var result = new Object();
		result.type = null;
		result.valid = false;
		if(position < data.length){
			var valuetype;
			// Recuperando o atributo 'message' atual
			var message = data[position];
			// Recuperando o valor da coluna 
			var valuecolumn = message[column];
			if(valuecolumn != null){
				// Testando o tipo de valor
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
				// Recursividade para o proximo atributo 'message'
				var valid = validatingTheColumnFieldHasValue(data, column, position+1);
				result = valid;
			}
		}
		return result;
	}

	/* --------------------------------------------------------------------------------------------------------- */

	/* --------------------------------------------- EVENTOS --------------------------------------------------- */
	
	/* Adicionando nova coluna */
	$('#add-column').on('click', function(){
		var column = document.getElementById(CONST_SELECT_COLUMN);
		var axis = document.getElementById(CONST_SELECT_AXIS);
		generateNewColumnWithFilters(column, axis);
	});

	/* Mudando o filtro de intervalo */
	function filterColumnChange(){
		configureScreenBySelectFilter(this);
	}

	/* Removendo coluna */
	$('body').on('click', 'a.remove-column', function() {
	    removeDivWithColumn(this.id);
	});

	/* Refazendo pesquisa */
	$('body').on('click', 'button.research', function() {
	    researchColumn(this.id);
	});

	/* --------------------------------------------------------------------------------------------------------- */

	/* -------------------------------------------- FUNÇÕES -------------------------------------------------- */
	
	/* Gerando nova coluna com os filtros */
	function generateNewColumnWithFilters(selectcolumn, selectaxis){
		
		// Coluna selecionada
		var option = selectcolumn.children[selectcolumn.selectedIndex];		
		// Tipo da coluna selecionada: (text, number ou date)
		var typecolumn = option.className.split('-')[0];
		var newid;
		// Verificando em qual eixo adicionar a coluna
		if(selectaxis.value == CONST_AXIS_Y){
			// Recuperando todas as colunas já existentes em Y
			var groupaxisy = document.getElementById(CONST_COLUMNS_GROUP_Y);		
			var lastchildren = groupaxisy.children[groupaxisy.children.length-1];
			// Gerando o novo id da coluna
			if(lastchildren != null){
				var idlastchildren = lastchildren.id;
				newid = parseInt(idlastchildren.split('-')[3]) + 1;
			} else {
				newid = 1;
			}
			createColumnWithFilter(newid, selectcolumn, groupaxisy, typecolumn, CONST_Y);
		} else {
			var groupaxisX = document.getElementById(CONST_COLUMNS_GROUP_X);
			// Removendo a coluna anterior no eixo X pois so e permitido uma coluna
			while (groupaxisX.firstChild) {
			    groupaxisX.removeChild(groupaxisX.firstChild);
			}
			newid = 1;
			createColumnWithFilter(newid, selectcolumn, groupaxisX, typecolumn, CONST_X);
		}
	}

	/* Criando o combobox com todos os filtros disponiveis */
	function createColumnWithFilter(newid, selectcolumn, groupcolumns, typecolumn, axis){
		
		// Div principal da coluna
		var iddivpanel = CONST_COLUMN+'-'+selectcolumn.value+'-'+axis+'-'+newid;
		var divpaneldefault = createNewDiv(iddivpanel, null, null, CONST_PANEL_PANEL_DEFAULT, null, null, null);	
		// Div que tera o titulo com o nome da coluna e a opcao de fechar
		var divpanelheading = createNewDiv(null, null, null, CONST_PANEL_HEADING, null, null, null);
		divpaneldefault.appendChild(divpanelheading);
		// Titulo do panel
		var h4 = createNewH4(CONST_PANEL_TITLE);
		var idpanelcollapse = CONST_COLLAPSE+'-'+iddivpanel;
		// Inserindo opcao de remover a coluna
		var adatatoggle = createNewA(null, null, null, CONST_COLLAPSE, idpanelcollapse, selectcolumn.value);
		var idaremove = CONST_REMOVE+'-'+iddivpanel
		var aremove = createNewA(idaremove, CONST_PULL_RIGHT_REMOVE_COLUMN, null, null, null, null);
		var img = createNewImg(null, CONST_IMG_CLOSE, null, null, CONST_REMOVE_COLUMN);
		aremove.appendChild(img);
		h4.appendChild(adatatoggle);
		h4.appendChild(aremove);
		divpanelheading.appendChild(h4);
		divpaneldefault.appendChild(divpanelheading);
		// Criando o collapse panel
		var divpanelcollapse = createNewDiv(idpanelcollapse, null, null, CONST_PANEL_COLLAPSE_COLLAPSE, null, null, null);
		// Div que contera os filtros da coluna
		var divfiltercolumn = createNewDiv(null, null, null, CONST_FILTER_COLUMN_Y, null, CONST_COLLAPSE, null);
		if(axis == CONST_Y){
			// Combobox com o tipo de grafico: (barra, linha)
			var rowgraphic = createRowGraphicType(iddivpanel);
			divfiltercolumn.appendChild(rowgraphic);
		}
		// Div que contera o combobox com os valores disponiveis
		var rowfilterwithvalues = createRowWithValues(iddivpanel, selectcolumn.value, typecolumn);
		divfiltercolumn.appendChild(rowfilterwithvalues);
		if(typecolumn == CONST_NUMBER || typecolumn == CONST_DATE){
			// Div com o combobox com o filtro de intervalo: (faixa, menor ou maior)
			var rowfilter = createRowFilter(iddivpanel, filterColumnChange);
			// Div com o filtro para o intervalo maior que
			var rowrangeinitial = createRowRange(iddivpanel, typecolumn, INITIAL, true);
			// Div com o filtro para o intervalor menor que
			var rowrangefinal = createRowRange(iddivpanel, typecolumn, FINAL, true);
			divfiltercolumn.appendChild(rowfilter);
			divfiltercolumn.appendChild(rowrangeinitial);
			divfiltercolumn.appendChild(rowrangefinal);
		} else if(typecolumn == CONST_TEXT && axis == CONST_X){
			// Div com o filtro para texto: (Igual, contem, diferente)
			var rowfilter = createRowFilterText(iddivpanel, typecolumn, null, null);
			divfiltercolumn.appendChild(rowfilter);
		}
		divpanelcollapse.appendChild(divfiltercolumn);
		if(axis == CONST_Y){
			// Div com o filtro de condicao
			var rowcondition = createRowCondition(iddivpanel, typecolumn);
			divpanelcollapse.appendChild(rowcondition);
		}
		// Div com o botao de pesquisar (refazer pesquisa)
		var rowresearch = createRowResearch(iddivpanel);
		divpanelcollapse.appendChild(rowresearch);			
		divpaneldefault.appendChild(divpanelcollapse);
		if(axis == CONST_X){
			var divrow = createNewDiv(null, null, null, CONST_ROW, null, null, null);
			var divcolxs3 = createNewDiv(null, null, null, CONST_COL_XS_3, null, null, null);
			divcolxs3.appendChild(divpaneldefault);
			divrow.appendChild(divcolxs3);
			groupcolumns.appendChild(divrow);
		} else {
			groupcolumns.appendChild(divpaneldefault);
		}
	}

	/* Criando o combobox com os tipos de grafico disponiveis */
	function createRowGraphicType(iddivpanel){

		// Div que contera o combobox com os tipos de graficos disponiveis
		var divrow = createNewDiv(null, null, null, CONST_ROW, null, null, null);
		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null, null);
		var label = createNewLabel(null, GRAPHIC, null, null, null, CONST_LABEL_COLUMNS_FILTERS);
		divcolxs4.appendChild(label);
		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null, null);
		var idselect = CONST_SELECT_GRAPHIC+'-'+iddivpanel;
		// Combobox com os tipos de grafico
		var select = createNewSelect(idselect, CONST_FORM_CONTROL);
		// Options de tipos de graficos
		var optionbar = createNewOption(CONST_BAR, BAR, null);
		var optionline = createNewOption(CONST_LINE, LINE, null);
		select.appendChild(optionbar);
		select.appendChild(optionline);
		divcolxs8.appendChild(select);
		divrow.appendChild(divcolxs4);
		divrow.appendChild(divcolxs8);
		return divrow;
	}

	/* Criando o combobox com todos os valores disponiveis da coluna */
	function createRowWithValues(iddivpanel, column, typecolumn){

		// Div que contera o combobox com os valores disponiveis da coluna
		var divrow = createNewDiv(null, null, null, CONST_ROW, null, null, null);
		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null, null);
		var label = createNewLabel(null, VALUES, null, null, null, null);
		divcolxs4.appendChild(label);
		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null, null);
		var idselect = CONST_SELECT_VALUE+'-'+typecolumn+'-'+iddivpanel;
		// Combobox com os valores disponiveis
		var select = createNewSelect(idselect, CONST_FORM_CONTROL);
		// Options de todos os valores disponiveis
		var all_options = getAllValueOfColumnInAJson(column);
		for(var i = 0; i < all_options.length; i++){
			select.appendChild(all_options[i]);
		}
		divcolxs8.appendChild(select);
		divrow.appendChild(divcolxs4);
		divrow.appendChild(divcolxs8);
		return divrow;	
	}

	/* Criando os filtros (faixa, menor ou maior) */
	function createRowFilter(iddivpanel, functionfiltercolumnchange){

		// Div que contera o combobox com os filtros de intervalo
		var divrow = createNewDiv(null, null, null, CONST_ROW, null, null, null);
		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null, null);
		var label = createNewLabel(null, FILTER, null, null, null, CONST_LABEL_COLUMNS_FILTERS);
		divcolxs4.appendChild(label);
		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null, null);
		var idselect = CONST_SELECT_FILTER+'-'+iddivpanel;
		// Combobox com os filtros de intervalo disponiveis
		var select = createNewSelect(idselect, CONST_FORM_CONTROL);
		if(functionfiltercolumnchange != null){
			select.onchange = functionfiltercolumnchange;
		}
		// Options de todos os tipos de filtros de intervalo disponiveis
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

	/* Criando o filtro de alcance (range) */
	function createRowRange(iddivpanel, inputtype, type, hidden){	

		// Validando qual tipo de intervalo (menor que ou maior que)
		var current;
		var currentlabel;
		if(type ==  INITIAL){
			current = CONST_INITIAL_INPUT;
			currentlabel = CONST_INITIAL;
		} else if(type == FINAL){
			current = CONST_FINAL_INPUT;
			currentlabel = CONST_FINAL;
		}
		// Div que contera o filtro de intervalo (menor que ou maior que)
		var divid = currentlabel+'-'+iddivpanel;
		var divrow = createNewDiv(divid, null, null, CONST_ROW, null, null, hidden);
		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null, false);
		var label = createNewLabel(null, type, false, null, null, CONST_LABEL_COLUMNS_FILTERS);
		divcolxs4.appendChild(label);
		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null, false);
		var idinput = current+'-'+iddivpanel; 
		// Input com o filtro de intervalo baseado no seu tipo (date ou number)
		var inputrange = createNewInput(idinput, inputtype, CONST_FORM_CONTROL, null, null);
		divcolxs8.appendChild(inputrange);
		divrow.appendChild(divcolxs4);
		divrow.appendChild(divcolxs8);
		return divrow;
	}

	/* Criando o filtro de condicao */
	function createRowCondition(iddivpanel, typecolumn){

		// Div que contera o combobox com os filtros de condicao
		var divrow = createNewDiv(null, null, null, CONST_ROW, null, null, null);
		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null, null);
		var label = createNewLabel(null, CONDITION, null, null, null, CONST_LABEL_COLUMNS_FILTERS);
		divcolxs4.appendChild(label);
		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null, null);
		var idselect = CONST_CONDITION+'-'+iddivpanel;
		// Combobox com os filtros de condicao disponiveis
		var select = createNewSelect(idselect, CONST_FORM_CONTROL);
		var optionselect = createNewOption(CONST_COUNT_ALL, COUNT_ALL, null);
		var optionrange = createNewOption(CONST_COUNT_IF, COUNT_IF, null);	
		select.appendChild(optionselect);
		select.appendChild(optionrange);
		if(typecolumn == CONST_NUMBER){
			// Para o caso de numero, acrescentar outras opcoes de condicao
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

	/* Criando a DIV com o botao de pesquisar */
	function createRowResearch(iddivpanel){

		// Div que contera o botao de pesquisar/refazer pesquisa
		var divrow = createNewDiv(null, null, null, CONST_ROW_REFRESH_COLUMNS_FILTERS, null, null, null);
		var divwithbutton = createNewDiv(null, null, null, CONST_COL_XS_12_PULL_RIGHT, null, null, null);
		var idbutton = CONST_RESEARCH+'-'+iddivpanel;
		// Botao pesquisar/refazer pesquisa
		var button = createNewButton(idbutton, CONST_BUTTON, CONST_BTN_BTN_PRIMARY_PULL_RIGHT_RESEARCH, RESEARCH);
		divwithbutton.appendChild(button);
		divrow.appendChild(divwithbutton);
		return divrow;
	}

	/* Criando o filtro de texto (Igual, contem, diferente) */
	function createRowFilterText(iddivpanel, inputtype, type, hidden){	

		// Div que contera o filtro de texto
		var divid = CONST_FILTER_TEXT+'-'+iddivpanel;
		var divrow = createNewDiv(divid, null, null, CONST_ROW, null, null, hidden);
		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null, false);
		var label = createNewLabel(null, FILTER, false, null, null, CONST_LABEL_COLUMNS_TEXT_FILTERS);
		divcolxs4.appendChild(label);
		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null, false);
		var idinput = CONST_FILTER_TEXT_INPUT+'-'+iddivpanel; 
		// Input para filtrar o texto
		var inputrange = createNewInput(idinput, inputtype, CONST_FORM_CONTROL, null, null);	
		divcolxs8.appendChild(inputrange);
		divrow.appendChild(divcolxs4);
		divrow.appendChild(divcolxs8);
		return divrow;
	}

	/* Configurando a tela apos o usuario selecionar filtro de intervalo */
	function configureScreenBySelectFilter(select){	
		var selectid = select.id;
		var id = selectid.replace(CONST_SELECT_FILTER, "");

		// Recuperando qual coluna foi alterada o filtro de intervalo
		var labelinitial = CONST_INITIAL+id;
		var labelfinal = CONST_FINAL+id;
		var initiallabel = document.getElementById(labelinitial);
		var finallabel = document.getElementById(labelfinal);

		// Apagando os valores inseridos anteriormente
		var initial_id = selectid.replace(CONST_SELECT_FILTER,CONST_INITIAL_INPUT);
		var final_id = selectid.replace(CONST_SELECT_FILTER,CONST_FINAL_INPUT);
		var initial_value = document.getElementById(initial_id);
		initial_value.value = '';
		var final_value = document.getElementById(final_id);
		final_value.value = '';

		var value = select.value;

		switch(value){
			case CONST_RANGE:
				initiallabel.hidden = false;
				finallabel.hidden = false;
				break;
			case CONST_BIGGER_THAN:
				initiallabel.hidden = false;
				finallabel.hidden = true;
				break;
			case CONST_LESS_THAN:
				initiallabel.hidden = true;
				finallabel.hidden = false;	
				break;
			default:
				initiallabel.hidden = true;
				finallabel.hidden = true;
				break;		
		}
	}

	/* Recuperando todos os valores disponiveis para a coluna baseado no json */
	function getAllValueOfColumnInAJson(column){
		var options = new Array();
		complete_json = JSON_TEST;
		if(complete_json != null) {
			var fieldsJson = complete_json.message;
			var exist_value = true;
			var options_temp = new Array();
			var option;
			var value;
			for(var i = 0; i < fieldsJson.length; i++){
				value = fieldsJson[i][column];
				exist_value = check_already_exist(fieldsJson[i][column], options_temp);
				if(!exist_value){
					options_temp.push(fieldsJson[i][column]);
				}
				exist_value = true;
			}
		}
		if(options_temp.length > 0){
			options_temp = sortArray(options_temp);
			for(var i = 0; i < options_temp.length; i++){
				option = createNewOption(options_temp[i], options_temp[i], null);
				options.push(option);
			}
		}
		return options;
	}

	/* Ordenando o array */ 
	function sortArray(array){
		var parsedDate = Date.parse(array[0]);
		if (isNaN(array[0]) && !isNaN(parsedDate)) {
		    array.sort(function(a,b){
		    	var datea = a.split('/');
		    	var dateb = b.split('/');
		    	var date_a = new Date(datea[2],datea[1],datea[0]);
		    	var date_b = new Date(dateb[2],dateb[1],dateb[0]);
		    	if(date_a > date_b){
		    		return 1;
		    	} else if(date_a < date_b){
		    		return -1
		    	}
		    	return 0;
			});
		} else {
			array.sort();
		}
		return array;
	}

	/* Verificando se o valor ja existe no array */
	function check_already_exist(value, array_options){
		for(var i = 0; i < array_options.length; i++){
			if(array_options[i] == value){
				return true
			}
		}
		return false;
	}

	/* Removendo coluna */
	function removeDivWithColumn(id){
		var divid = id.replace(CONST_REMOVE+'-','');
		var elem = document.getElementById(divid);
		elem.parentNode.removeChild(elem);
	}

	/* Refazendo pesquisa */
	function researchColumn(buttonid){
		var axis = buttonid.split('-')[3];
		var column_type = getTypeColumn(buttonid);
		if(axis == CONST_X){
			refreshValuesAxisX(buttonid, column_type, axis);
		} else if(axis == CONST_Y){

		}
	}

	function refreshValuesAxisX(buttonid, column_type, axis){
		var valid = true;
		var range_initial;
		var range_final;
		var filter_value;

		var column_name = buttonid.split('-')[2];
		
		if(column_type == CONST_DATE || column_type == CONST_NUMBER){
			// Recuperando filtro de intervalo da coluna, caso exista
			var select_id = buttonid.replace(CONST_RESEARCH,CONST_SELECT_FILTER);
			var initial_id = buttonid.replace(CONST_RESEARCH,CONST_INITIAL_INPUT);
			var final_id = buttonid.replace(CONST_RESEARCH,CONST_FINAL_INPUT);
			var select_range_value = document.getElementById(select_id).value;
			var initial_value = document.getElementById(initial_id).value;
			var final_value = document.getElementById(final_id).value;
			
			if(select_range_value != CONST_SELECT){
				// Somente se existir filtro de intervalo
				if(select_range_value == CONST_RANGE){
					range_initial = initial_value;
					range_final = final_value;
					if(range_initial == null || range_initial == '' || range_final == null || range_final == ''){
						valid = false;
					}
				} else if(select_range_value == CONST_BIGGER_THAN){
					range_initial = initial_value;
					if(range_initial == null || range_initial == ''){
						valid = false;
					}
				} else if(select_range_value == CONST_LESS_THAN){
					range_final = final_value;
					if(range_final == null || range_final == ''){
						valid = false;
					}
				}
			}
		} else if(column_type == CONST_TEXT && axis == CONST_X){
			// Caso a coluna seja no eixo X e seja do tipo texto
			var filter_id = buttonid.replace(CONST_RESEARCH,CONST_FILTER_TEXT_INPUT);
			filter_value = document.getElementById(filter_id).value;
			if(filter_value != null && filter_value != ''){
				var filter_split = filter_value.split('[');
				if(filter_split.length > 0){
					var operation = filter_split[0];
					if(operation != '=' && operation != '==' && operation != '<>'){
						valid = false;
					}
				} else {
					valid = false;
				}		
			}
		}
		if(valid){
			var values = getValuesFromFilter(column_name, range_initial, range_final, null, null, null, column_type, filter_value, axis);
			updateSelectWithNewValues(buttonid, values, column_type);
		}
	}

	/* Recuperando o tipo da coluna baseado no botao de refazer pesquisa */ 
	function getTypeColumn(buttonid){
		var select_id_number = buttonid.replace(CONST_RESEARCH,CONST_SELECT_VALUE+'-'+CONST_NUMBER);
		var select_number = document.getElementById(select_id_number);
	
		var select_id_text = buttonid.replace(CONST_RESEARCH,CONST_SELECT_VALUE+'-'+CONST_TEXT);
		var select_text = document.getElementById(select_id_text);

		var select_id_date = buttonid.replace(CONST_RESEARCH,CONST_SELECT_VALUE+'-'+CONST_DATE);
		var select_date = document.getElementById(select_id_date);

		if(select_number != null){
			return CONST_NUMBER;
		}
		if(select_text != null){
			return CONST_TEXT;
		}
		if(select_date != null){
			return CONST_DATE;
		}
		return '';
	}

	/* Atualizando combobox com novos valores */
	function updateSelectWithNewValues(buttonid, values, column_type){
		var select_id = buttonid.replace(CONST_RESEARCH,CONST_SELECT_VALUE+'-'+column_type);
		var select_values = document.getElementById(select_id);
		// Apagando todos os options antigos
		select_values.options.length = 0;
		var option;
		if(values.length == 0){
			// Caso nao tenha nenhum valor para ser inserido
			option = createNewOption(CONST_NO_DATA, NO_DATA, column_type);
			select_values.appendChild(option);
		} else {
			for(var i = 0; i < values.length; i++){
				option = createNewOption(values[i], values[i], column_type);
				select_values.appendChild(option);
			}
		}
	}

	/* --------------------------------------------------------------------------------------------------------- */

	/* change graphic to a bar graphic */
	function setBarGraphic(){
		$('#chart').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Situated'
	        }
	    });
	}

});