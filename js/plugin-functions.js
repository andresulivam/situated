$(document).ready(function() {
	
	/* Desenhando tela */
	$('onload',function(completejson) {
		// JSON_TEST está no arquivo consts.js
		completejson = JSON_TEST;
		// Preenchendo o combobox de colunas baseados no json (dinamicamente)
		fillSelectColumnsWithJson(completejson);

		initializeChart(CONST_CHART);
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
						option = createNewOption(columns[i], columns[i], validcolumn.type, null);
						arrayoptions.push(option);
					}
				}
				var select = document.getElementById(CONST_SELECT_COLUMN);
				for(var i = 0; i < arrayoptions.length; i++){
					// Adicionando todos os atributos/colunas ao combobox
					select.appendChild(arrayoptions[i]);
				}
			}
			var select_columns = document.getElementById(CONST_SELECT_COLUMN);
			var options_columns = select_columns.options;

			var array_options_datalist = arrayDataListColumns(':', options_columns);
			var data_list = createNewDataList(array_options_datalist, CONST_DATALIST_COLUMNS);

			var datalists = document.getElementById(CONST_DATALISTS);
			datalists.appendChild(data_list);
		}
	}

	/* Criando o datalist com os valores das colunas disponiveis para o filtro de condicao */
	function arrayDataListColumns(text, options_columns){
		var arrayOptions = new Array();
		var option;
		for(var i = 0; i < options_columns.length; i++){
			option = {value: text+options_columns[i].value}
			arrayOptions.push(option);
		}
		return arrayOptions;
	}

	/* Recuperando qual a coluna presente no eixo X */
	function getTypeAxisX(){
		var column = null;
		var column_element = document.getElementById(CONST_COLUMNS_GROUP_X).getElementsByClassName(CONST_PANEL_PANEL_DEFAULT)[0];
		if(column_element != null){
			column = column_element.id.split('-')[1];
		}
		return column;
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
					valuetype = CONST_NUMBER_TYPE;
				} else {
					var parsedDate = Date.parse(valuecolumn);
					if (isNaN(valuecolumn) && !isNaN(parsedDate)) {
					    valuetype = CONST_DATE_TYPE;
					} else {
						valuetype = CONST_TEXT_TYPE;
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

	/* Mudando a condicao */
	function conditionChange(){
		configureScreenByCondition(this);
	}

	/* Mudando a ordenacao */
	function orderChange(){
		configureValuesByOrder(this);
	}

	/* Removendo coluna */
	$('body').on('click', 'a.remove-column', function() {
	    removeDivWithColumn(this.id);
	});

	/* Refazendo pesquisa */
	$('body').on('click', 'button.research', function() {
	    researchGraphic(this.id);
	});

	/* Filtrando dados */
	$('body').on('click', 'button.filter', function() {
	    filterValuesColumn(this.id);
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
		var iddivpanel;
		var selectcolumnvalue = String(selectcolumn.value);
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
			iddivpanel = CONST_COLUMN+'-'+selectcolumnvalue+'-'+CONST_Y+'-'+newid;
			createColumnWithFilter(iddivpanel, newid, selectcolumn, groupaxisy, typecolumn, CONST_Y);
		} else {
			var groupaxisX = document.getElementById(CONST_COLUMNS_GROUP_X);
			// Removendo a coluna anterior no eixo X pois so e permitido uma coluna
			while (groupaxisX.firstChild) {
			    groupaxisX.removeChild(groupaxisX.firstChild);
			}
			newid = 1;
			iddivpanel = CONST_COLUMN+'-'+selectcolumnvalue+'-'+CONST_X+'-'+newid;
			createColumnWithFilter(iddivpanel, newid, selectcolumn, groupaxisX, typecolumn, CONST_X);

			// Forcando atualizar categories do grafico
			var button_research_id = CONST_RESEARCH+'-'+iddivpanel;
			researchGraphic(button_research_id);
		}
	}

	/* Criando o combobox com todos os filtros disponiveis */
	function createColumnWithFilter(iddivpanel, newid, selectcolumn, groupcolumns, typecolumn, axis){
		
		// Div principal da coluna
		var divpaneldefault = createNewDiv(iddivpanel, null, null, CONST_PANEL_PANEL_DEFAULT, null, null, null);	
		// Div que tera o titulo com o nome da coluna e a opcao de fechar
		var divpanelheading = createNewDiv(null, null, null, CONST_PANEL_HEADING, null, null, null);
		divpaneldefault.appendChild(divpanelheading);
		// Titulo do panel
		var h4 = createNewH4(CONST_PANEL_TITLE);
		var idpanelcollapse = CONST_COLLAPSE+'-'+iddivpanel;
		var title = '';
		if(axis == CONST_Y){
			title = selectcolumn.value+'-'+newid;
		} else {
			title = selectcolumn.value;
		}
		// Inserindo opcao de remover a coluna
		var adatatoggle = createNewA(null, null, null, CONST_COLLAPSE, idpanelcollapse, title);
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
		// Div com as opcoes de ordenacao
		var rowwithsortingoptions = createRowWithSorting(iddivpanel, orderChange);
		divfiltercolumn.appendChild(rowwithsortingoptions);
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
			var rowfilter = createRowFilterText(iddivpanel, typecolumn, null);
			divfiltercolumn.appendChild(rowfilter);
		}
		divpanelcollapse.appendChild(divfiltercolumn);
		if(axis == CONST_Y){
			// Div com o filtro de condicao
			var rowcondition = createRowCondition(iddivpanel, typecolumn, conditionChange);
			var inputconditioncountif = createRowConditionInputText(iddivpanel, CONST_TEXT, CONST_COUNT_IF, true);
			divpanelcollapse.appendChild(rowcondition);
			divpanelcollapse.appendChild(inputconditioncountif);
			if(typecolumn == CONST_NUMBER){
				var inputconditionsumif = createRowConditionInputText(iddivpanel, CONST_TEXT, CONST_SUM_IF, true);
				divpanelcollapse.appendChild(inputconditionsumif);
			}
		}
		// Div com o botao de pesquisar (refazer pesquisa)
		var rowresearch = createRowFilterAndResearch(iddivpanel);
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
		var optionbar = createNewOption(CONST_COLUMN, BAR, null, null);
		var optionline = createNewOption(CONST_SPLINE, LINE, null, null);
		select.appendChild(optionbar);
		select.appendChild(optionline);
		divcolxs8.appendChild(select);
		divrow.appendChild(divcolxs4);
		divrow.appendChild(divcolxs8);
		return divrow;
	}

	/* Criando o combobox com opcoes de ordenacao */
	function createRowWithSorting(iddivpanel, functionorderChange){
		// Div que contera o combobox com os valores disponiveis da coluna
		var divrow = createNewDiv(null, null, null, CONST_ROW, null, null, null);
		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null, null);
		var label = createNewLabel(null, TO_ORDER, null, null, null, null);
		divcolxs4.appendChild(label);
		// Div com o botao para ordenar os dados (Crescente, Decrescente)
		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null, null);
		var idselectorder = CONST_SELECT_ORDER+'-'+iddivpanel;
		// Combobox com os valores disponiveis
		var selectorder = createNewSelect(idselectorder, CONST_FORM_CONTROL);
		if(functionorderChange != null){
			selectorder.onchange = functionorderChange;
		}
		// Options de ordenacao
		var optionasc = createNewOption(CONST_ASCENDANT, ASCENDANT, null, null);
		var optiondesc = createNewOption(CONST_DESCENDANT, DESCENDANT, null, null);
		selectorder.appendChild(optionasc);
		selectorder.appendChild(optiondesc);
		divcolxs8.appendChild(selectorder);
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
		var optionselect = createNewOption(CONST_SELECT, SELECT, null, null);
		var optionrange = createNewOption(CONST_RANGE, RANGE, null, null);
		var optionbiggerthan = createNewOption(CONST_BIGGER_THAN, BIGGER_THAN, null, null);
		var optionlessthan = createNewOption(CONST_LESS_THAN, LESS_THAN, null, null);
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
	function createRowCondition(iddivpanel, typecolumn, functionconditionchange){

		// Div que contera o combobox com os filtros de condicao
		var divrow = createNewDiv(null, null, null, CONST_ROW, null, null, null);
		var divcolxs4 = createNewDiv(null, null, null, CONST_COL_XS_4, null, null, null);
		var label = createNewLabel(null, CONDITION, null, null, null, CONST_LABEL_COLUMNS_FILTERS);
		divcolxs4.appendChild(label);
		var divcolxs8 = createNewDiv(null, null, null, CONST_COL_XS_8, null, null, null);
		var idselect = CONST_CONDITION+'-'+iddivpanel;
		// Combobox com os filtros de condicao disponiveis
		var select = createNewSelect(idselect, CONST_FORM_CONTROL);
		var optioncountall = createNewOption(CONST_COUNT_ALL, COUNT_ALL, null, null);
		var optioncountif = createNewOption(CONST_COUNT_IF, COUNT_IF, null, null);	
		select.appendChild(optioncountall);
		select.appendChild(optioncountif);
		if(typecolumn == CONST_NUMBER){
			// Para o caso de numero, acrescentar outras opcoes de condicao
			var optionsum = createNewOption(CONST_SUM, SUM, null, null);
			var optionsumif = createNewOption(CONST_SUM_IF, SUM_IF, null, null);
			var optionaverage = createNewOption(CONST_AVERAGE, AVERAGE, null, null);
			select.appendChild(optionsum);
			select.appendChild(optionsumif);
			select.appendChild(optionaverage);
		}
		if(functionconditionchange != null){
			select.onchange = functionconditionchange;
		}
		divcolxs8.appendChild(select);
		divrow.appendChild(divcolxs4);
		divrow.appendChild(divcolxs8);
		return divrow;
	}

	/* Criando a DIV com o botao de pesquisar */
	function createRowFilterAndResearch(iddivpanel){

		// Div que contera o botao de pesquisar/refazer pesquisa
		var divrow = createNewDiv(null, null, null, CONST_ROW_REFRESH_COLUMNS_FILTERS, null, null, null);
		var divwithbutton = createNewDiv(null, null, null, CONST_COL_XS_12_PULL_RIGHT, null, null, null);
		
		var idbuttonfilter = CONST_FILTER+'-'+iddivpanel;
		// Botao pesquisar/refazer pesquisa
		var button_filter = createNewButton(idbuttonfilter, CONST_BUTTON, CONST_BTN_BTN_PRIMARY_PULL_LEFT_FILTER, TO_FILTER);
		
		var idbuttonresearch = CONST_RESEARCH+'-'+iddivpanel;
		// Botao pesquisar/refazer pesquisa
		var button_research = createNewButton(idbuttonresearch, CONST_BUTTON, CONST_BTN_BTN_PRIMARY_PULL_RIGHT_RESEARCH, RESEARCH);
		divwithbutton.appendChild(button_filter);
		divwithbutton.appendChild(button_research);
		divrow.appendChild(divwithbutton);
		return divrow;
	}

	/* Criando o filtro de texto (Igual, contem, diferente) */
	function createRowFilterText(iddivpanel, inputtype, hidden){	

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

	/* Criando o filtro de texto (Igual, contem, diferente) */
	function createRowConditionInputText(iddivpanel, inputtype, type, hidden){	

		var current;
		if(type == CONST_COUNT_IF){
			current = CONST_CONDITION_COUNT_IF_INPUT;
		} else if(type == CONST_SUM_IF){
			current = CONST_CONDITION_SUM_IF_INPUT;
		}
		// Div que contera a condicao
		var divid = type+'-'+iddivpanel;
		var divrow = createNewDiv(divid, null, null, CONST_ROW, null, null, hidden);
		var divcolxs12 = createNewDiv(null, null, null, CONST_COL_XS_12, null, null, false);
		var idinput = current+'-'+iddivpanel; 
		// Input para a condicao
		var inputcondition = createNewInput(idinput, inputtype, CONST_FORM_CONTROL, null, null);
		inputcondition.setAttribute(CONST_LIST, CONST_DATALIST_COLUMNS);
		divcolxs12.appendChild(inputcondition);
		divrow.appendChild(divcolxs12);
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

	/* Configurando a tela apos o usuario mudar a condicao */
	function configureScreenByCondition(select){	
		var selectid = select.id;
		var id = selectid.replace(CONST_CONDITION, "");

		var value = select.value;

		// Recuperando qual coluna foi alterada a condicao
		var labelconditioncountif = CONST_COUNT_IF+id;
		var labelconditionsumif = CONST_SUM_IF+id;
		var conditionlabelcountif = document.getElementById(labelconditioncountif);
		var conditionlabelsumif = document.getElementById(labelconditionsumif);

		// Apagando os valores inseridos anteriormente
		var condition_count_if_id = selectid.replace(CONST_CONDITION, CONST_CONDITION_COUNT_IF_INPUT);
		var condition_sum_if_id = selectid.replace(CONST_CONDITION, CONST_CONDITION_SUM_IF_INPUT);
		var condition_value_count_if = document.getElementById(condition_count_if_id);
		var condition_value_sum_if = document.getElementById(condition_sum_if_id);

		if(condition_value_count_if != null){
			condition_value_count_if.value = '';
		}
		if(condition_value_sum_if){
			condition_value_sum_if.value = '';
		}

		switch(value){
			case CONST_COUNT_IF:
				conditionlabelcountif.hidden = false;
				if(conditionlabelsumif != null){
					conditionlabelsumif.hidden = true;
				}
				break;
			case CONST_SUM_IF:
				conditionlabelsumif.hidden = false;
				if(conditionlabelcountif != null){
					conditionlabelcountif.hidden = true;
				}
				break;
			default:
				if(conditionlabelcountif != null){
					conditionlabelcountif.hidden = true;
				}
				if(conditionlabelsumif != null){
					conditionlabelsumif.hidden = true;
				}
				break;		
		}
	}

	/* Ordenando valores baseados na escolha do usuario */
	function configureValuesByOrder(select){
		var selectid = select.id;
		var column_type = getTypeColumn(selectid, CONST_SELECT_ORDER);
		// Recuperando os valores em Y
		var selected_values_y_id = selectid.replace(CONST_SELECT_ORDER,CONST_SELECT_VALUE+'-'+column_type);
		var select_values = document.getElementById(selected_values_y_id);
		var options_selected = select_values.options;
		
		var options = new Array();
		for(var i = 1; i < options_selected.length; i++){
			options.push(options_selected[i]);
		}
		// ordenando asc
		options.sort(function(a,b) {
		    if (a.text > b.text) return 1;
		    else if (a.text < b.text) return -1;
		    else return 0
		})
		// ordenando desc
		if(select.value == CONST_DESCENDANT){
			options.reverse();
		}
		// apagando antigos options
		select_values.options.length = 0;
		var option;
		if(options.length == 0){
			// Caso nao tenha nenhum valor para ser inserido
			option = createNewOption(CONST_NO_DATA, NO_DATA, column_type, CONST_SELECTED);
			select_values.appendChild(option);
		} else {
			option = createNewOption(CONST_ALL_VALUES, ALL_VALUES, null, null);
			select_values.appendChild(option);
			for(var i = 0; i < options.length; i++){			
				option = createNewOption(options[i].value, options[i].text, null, null);
				select_values.appendChild(option);	
			}
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
			option = createNewOption(CONST_ALL_VALUES, ALL_VALUES, null, null);
			options.push(option);
			for(var i = 0; i < options_temp.length; i++){
				option = createNewOption(options_temp[i], options_temp[i], null, null);
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

		var axis = id.split('-')[3];
		if(axis == CONST_Y){
			removeSerieAfterCloseColumn(id);
		} else if(axis == CONST_X){
			removeCategoriesByChart(CONST_CHART);
		}	
	}

	/* Removendo grafico */
	function removeSerieAfterCloseColumn(id){
		var id_split = id.split('-');
		var serie_name = id_split[2]+'-'+id_split[4];
		removeSerieByName(CONST_CHART, serie_name);
	}

	/* Filtrando dados */
	function filterValuesColumn(buttonid){
		var axis = buttonid.split('-')[3];
		var column_type = getTypeColumn(buttonid, CONST_FILTER);
		filterValuesColumnByFilters(buttonid, column_type, axis);
	}

	/* Refazendo pesquisa */
	function researchGraphic(buttonid){
		var axis = buttonid.split('-')[3];
		var column_type = getTypeColumn(buttonid, CONST_RESEARCH);
		if(axis == CONST_X){
			researchValuesGraphicAxisX(buttonid, column_type, axis);
		} else if(axis == CONST_Y){
			researchValuesGraphicAxisY(buttonid, column_type, axis);
		}
	}

	/* Filtrando os valores possiveis para a coluna baseado nos filtros do usuario */
	function filterValuesColumnByFilters(buttonid, column_type, axis){
		var valid = true;
		var range_initial;
		var range_final;
		var filter_value;
		var column_name = buttonid.split('-')[2];
		/* Se a coluna for de data ou numero, é possivel filtrar por intervalo */
		if(column_type == CONST_DATE || column_type == CONST_NUMBER){
			// Recuperando filtro de intervalo da coluna, caso exista
			var select_id = buttonid.replace(CONST_FILTER,CONST_SELECT_FILTER);
			var initial_id = buttonid.replace(CONST_FILTER,CONST_INITIAL_INPUT);
			var final_id = buttonid.replace(CONST_FILTER,CONST_FINAL_INPUT);
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
			// Caso a coluna seja no eixo X e seja do tipo texto é possivel filtrar por texto
			var filter_id = buttonid.replace(CONST_FILTER,CONST_FILTER_TEXT_INPUT);
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
			var values = getValuesFromFilter(column_name, range_initial, range_final, column_type, filter_value);
			updateSelectWithNewValues(buttonid, values, column_type);
			// Selecionando ordenacao como asc
			var select_order_id = buttonid.replace(CONST_FILTER,CONST_SELECT_ORDER);
			var select_order = document.getElementById(select_order_id);
			select_order.selectedIndex = 0;
		} else {
			alert(MESSAGE_INVALID_FILTERS);
		}
	}

	/* Refazendo pesquisa para a coluna do eixo X */
	function researchValuesGraphicAxisX(buttonid, column_type, axis){
		var selected_values_x_id = buttonid.replace(CONST_RESEARCH,CONST_SELECT_VALUE+'-'+column_type);
		var select_values = document.getElementById(selected_values_x_id);
		var selected_value = select_values.value;
		var categories = new Array();
		if(selected_value != CONST_ALL_VALUES){
			categories.push(selected_value);
		} else {
			var options = select_values.options;
			for(var i = 1; i < options.length; i++){
				categories.push(options[i].value);
			}
		}
		setCategoriesByChart(CONST_CHART, categories);

		// refazendo pesquisa para as colunas inseridas no eixo Y
		var coluns_y = getAllButtonResearchIdsColumnsY();
		if(coluns_y != null && coluns_y.length > 0){
			var column_type;
			for(var i = 0; i < coluns_y.length; i++){
				column_type = getTypeColumn(coluns_y[i], CONST_RESEARCH);
				researchValuesGraphicAxisY(coluns_y[i], column_type, CONST_Y);
			}
		}
	}

	/* Refazendo pesquisa para a coluna do eixo Y */
	function researchValuesGraphicAxisY(buttonid, column_type, axis){
		var valid = true;
		var column_name = buttonid.split('-')[2];
		var column_name_x;
		var condition_selected;
		var condition_value;
		
		var categories = getCategoriesByChart(CONST_CHART);

		if(categories != null && categories.length > 0){
			column_name_x = getNameColumnOnAxisX();

			// Recuperando os valores em Y
			var selected_values_y_id = buttonid.replace(CONST_RESEARCH,CONST_SELECT_VALUE+'-'+column_type);
			var select_values = document.getElementById(selected_values_y_id);
			selected_value = select_values.value;
			var values_y = new Array();
			if(selected_value != CONST_ALL_VALUES){
			values_y.push(selected_value);
			} else {
				var options = select_values.options;
				for(var i = 1; i < options.length; i++){
					values_y.push(options[i].value);
				}
			}
			
			// Recuperando a condicao
			var condition_id = buttonid.replace(CONST_RESEARCH,CONST_CONDITION);
			condition_selected = document.getElementById(condition_id).value;
			if(condition_selected == CONST_COUNT_IF || condition_selected == CONST_SUM_IF){
				var id_input;
				if(condition_selected == CONST_COUNT_IF){
					id_input = buttonid.replace(CONST_RESEARCH,CONST_CONDITION_COUNT_IF_INPUT);
				} else if(condition_selected == CONST_SUM_IF){
					id_input = buttonid.replace(CONST_RESEARCH,CONST_CONDITION_SUM_IF_INPUT);
				}
				condition_value = document.getElementById(id_input).value; 
			}

			var column_type_y = getColumnTypeByName(column_name)
			var series = new Array();
			var serie_total;
			var serie_temp;
			// Buscando valores para cada coluna em X
			for(var i = 0; i < categories.length; i++){
				for(var j = 0; j < values_y.length; j++){
					serie_temp = getValuesToSeries(column_name, column_name_x, values_y[j], categories[i], condition_selected, condition_value);
					if(j == 0){
						serie_total = serie_temp;
					} else {
						serie_total = updateValuesSeries(serie_total, serie_temp, column_type_y);
					}
				}
				series.push(serie_total);
			}
			var button_split = buttonid.split('-');
			var column_name_y = button_split[2]+'-'+button_split[4];

			var id_select_graphic_type = buttonid.replace(CONST_RESEARCH,CONST_SELECT_GRAPHIC);
			var column_type = document.getElementById(id_select_graphic_type).value;

			formatSeriesToGraphic(CONST_CHART, series, column_name_y, column_type, condition_selected);
		} else {
			alert(MESSAGE_NOT_VALUES_ON_AXIS_X);
		}
	}

	/* Atualizando valor da serie para se plotar no grafico */
	function updateValuesSeries(serie_total, serie_temp, column_type_y){
		if(serie_total != null && serie_temp != null){
			var object_total = serie_total[2];
			var object_temp = serie_temp[2];
			var count = parseInt(object_total.count) + parseInt(object_temp.count);
			object_total.count = count;
			if(column_type_y == CONST_NUMBER_TYPE){
				object_total.sum = parseInt(object_total.sum) + parseInt(object_temp.sum);
				object_total.average = parseInt(object_total.average) + parseInt(object_temp.average);
			}
		}
		return serie_total;
	}

	/* Recuperando o nome da coluna atual no eixo X */
	function getNameColumnOnAxisX(){
		var name = null;
		var groupaxisx = document.getElementById(CONST_COLUMNS_GROUP_X);
		if(groupaxisx != null){
			var div = groupaxisx.getElementsByClassName(CONST_PANEL_PANEL_DEFAULT)[0];
			if(div != null){
				name = div.id.split('-')[1];
			}
		}
		return name;
	}

	/* Recuperando o id de todos os botoes de refazer pesquisa das colunas em Y */
	function getAllButtonResearchIdsColumnsY(){
		var ids = new Array();
		var groupaxisy = document.getElementById(CONST_COLUMNS_GROUP_Y);
		if(groupaxisy != null){
			var buttons_research = groupaxisy.getElementsByClassName(CONST_BTN_BTN_PRIMARY_PULL_RIGHT_RESEARCH);
			for(var i = 0; i < buttons_research.length; i++){
				ids.push(buttons_research[i].id);
			}
		}
		return ids;
	}

	/* Recuperando o tipo da coluna baseado no botao de filtrar valores */ 
	function getTypeColumn(elementid, type){
		var select_id_number = elementid.replace(type,CONST_SELECT_VALUE+'-'+CONST_NUMBER);
		var select_number = document.getElementById(select_id_number);
	
		var select_id_text = elementid.replace(type,CONST_SELECT_VALUE+'-'+CONST_TEXT);
		var select_text = document.getElementById(select_id_text);

		var select_id_date = elementid.replace(type,CONST_SELECT_VALUE+'-'+CONST_DATE);
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
	function updateSelectWithNewValues(elementid, values, column_type){
		var select_id = elementid.replace(CONST_FILTER,CONST_SELECT_VALUE+'-'+column_type);
		var select_values = document.getElementById(select_id);
		// Apagando todos os options antigos
		select_values.options.length = 0;
		var option;
		if(values.length == 0){
			// Caso nao tenha nenhum valor para ser inserido
			option = createNewOption(CONST_NO_DATA, NO_DATA, column_type, CONST_SELECTED);
			select_values.appendChild(option);
		} else {
			option = createNewOption(CONST_ALL_VALUES, ALL_VALUES, null, null);
			select_values.appendChild(option);
			for(var i = 0; i < values.length; i++){
				option = createNewOption(values[i], values[i], column_type, null);
				select_values.appendChild(option);
			}
		}
	}

	/* --------------------------------------------------------------------------------------------------------- */
});