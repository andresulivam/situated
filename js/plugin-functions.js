$(document).ready(function() {
	
	/* Desenhando tela */
	$('onload',function() {	
		// Requisicao ao banco (Arquivo database-functions.js)
		onLoadPlugin(callbackfunctionOnLoad);
		// Inicializando o grafico
		initializeChart(CONST_CHART);
		// Inicializando o grafico de pizza
		initializeChart(CONST_CHART_PIE);
		// Inicializando textedits com xeditable
		initializeXEditable();
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
				// ordenando ordem alfabetica
				arrayoptions.sort(function(a,b) {
				    if (a.text > b.text) return 1;
				    else if (a.text < b.text) return -1;
				    else return 0
				})
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

	function initializeXEditable(){
		$('.edit').editable({
			emptytext: NO_VALUE,
			showbuttons: true,
			onblur: 'submit'
		})
	}

	/* --------------------------------------------------------------------------------------------------------- */

	/* --------------------------------------------- CALLBACK FUNCTIONS ---------------------------------------- */
	
	/* Callback para iniciar plugin */
	function callbackfunctionOnLoad(success, json_with_data, json_charts_configurations){
		if(success){
			// Variavel global usada pelo sistema quando necessita verificar as colunas
			JSON_WITH_DATA = json_with_data;
			// Preenchendo o combobox de colunas baseados no json (dinamicamente)
			fillSelectColumnsWithJson(json_with_data);
		}
	}

	/* Callback apos salvar configuracao */
	function callbackfunctionOnSave(success, chart_configuration){
		if(success){
			var idplot = document.getElementById(CONST_ID_PLOT);
			if(idplot.value == null || idplot.value == ''){
				var chart_configuration_object = JSON.parse(chart_configuration);
				idplot.value = chart_configuration_object.id;
				generateNewPlotByChartConfiguration(chart_configuration);
			}				
		}
	}

	/* Callback apos remover configuracao */
	function callbackfunctionOnRemove(success, chart_configuration){
		if(success){
			removeDivWithPlotDeleted(chart_configuration);
		}
	}

	/* --------------------------------------------------------------------------------------------------------- */

	/* --------------------------------------------- EVENTOS --------------------------------------------------- */
	
	/* Criando novo grafico */
	$('#generate-new').on('click', function(){
		newChartConfiguration();
	});

	/* Adicionando nova coluna */
	$('#add-column').on('click', function(){
		var column = document.getElementById(CONST_SELECT_COLUMN);
		var axis = document.getElementById(CONST_SELECT_AXIS);
		generateNewColumnWithFilters(column, axis);
	});

	/* Mudando grafico padrao */
	$('#select-default-graphic').on('change', function(){
		configureScreenByDefaultGraphic(this);
	});

	/* Mudando grafico padrao */
	$('#save-chart-configuration').on('click', function(){
		saveChartConfiguration();
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

	function onClickRemovePlot(){
		confirmDeletePlot(this);
	}

	/* Removendo coluna */
	$('body').on('click', 'a.remove-column', function() {
	    removeDivWithColumn(this.id);
	});

	/* Refazendo pesquisa */
	$('body').on('click', 'button.research', function() {
	    researchGraphic(this.id, null, null);
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
		var axis = null;
		var column_type = null;
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

			// Valores para atualizar o grafico baseado no eixo Y
			axis = CONST_Y;
			column_type = getColumnTypeByName(selectcolumnvalue).replace('-'+CONST_TYPE,'');
		} else {
			var groupaxisX = document.getElementById(CONST_COLUMNS_GROUP_X);
			// Removendo a coluna anterior no eixo X pois so e permitido uma coluna
			while (groupaxisX.firstChild) {
			    groupaxisX.removeChild(groupaxisX.firstChild);
			}
			newid = 1;
			iddivpanel = CONST_COLUMN+'-'+selectcolumnvalue+'-'+CONST_X+'-'+newid;
			createColumnWithFilter(iddivpanel, newid, selectcolumn, groupaxisX, typecolumn, CONST_X);		
		}
		var button_research_id = CONST_RESEARCH+'-'+iddivpanel;
		// Atualizando grafico
		researchGraphic(button_research_id, axis, column_type);
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
		var adatatoggle = createNewA(null, CONST_A_TITLE_REMOVE, null, CONST_COLLAPSE, idpanelcollapse, title);
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
			generateTableWithGraphicData();
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
		var select = createNewSelect(idselect, CONST_FORM_CONTROL_SELECT_GRAPHIC_TYPE);
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
		var selectorder = createNewSelect(idselectorder, CONST_FORM_CONTROL_SELECT_ORDER);
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
		var select = createNewSelect(idselect, CONST_FORM_CONTROL_SELECT_VALUE);
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
		var select = createNewSelect(idselect, CONST_FORM_CONTROL_SELECT_FILTER);
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
		var classname;
		if(type ==  INITIAL){
			current = CONST_INITIAL_INPUT;
			currentlabel = CONST_INITIAL;
			classname = CONST_FORM_CONTROL_INITIAL_INPUT;
		} else if(type == FINAL){
			current = CONST_FINAL_INPUT;
			currentlabel = CONST_FINAL;
			classname = CONST_FORM_CONTROL_FINAL_INPUT;
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
		var inputrange = createNewInput(idinput, inputtype, classname, null, null);
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
		var select = createNewSelect(idselect, CONST_FORM_CONTROL_SELECT_CONDITION);
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
		var inputrange = createNewInput(idinput, inputtype, CONST_FORM_CONTROL_FILTER_TEXT_INPUT, null, null);	
		divcolxs8.appendChild(inputrange);
		divrow.appendChild(divcolxs4);
		divrow.appendChild(divcolxs8);
		return divrow;
	}

	/* Criando o filtro de texto (Igual, contem, diferente) */
	function createRowConditionInputText(iddivpanel, inputtype, type, hidden){	

		var current;
		var classname;
		if(type == CONST_COUNT_IF){
			current = CONST_CONDITION_COUNT_IF_INPUT;
			classname = CONST_FORM_CONTROL_CONDITION_COUNT_IF;
		} else if(type == CONST_SUM_IF){
			current = CONST_CONDITION_SUM_IF_INPUT;
			classname = CONST_FORM_CONTROL_CONDITION_SUM_IF;
		}
		// Div que contera a condicao
		var divid = type+'-'+iddivpanel;
		var divrow = createNewDiv(divid, null, null, CONST_ROW, null, null, hidden);
		var divcolxs12 = createNewDiv(null, null, null, CONST_COL_XS_12, null, null, false);
		var idinput = current+'-'+iddivpanel; 
		// Input para a condicao
		var inputcondition = createNewInput(idinput, inputtype, classname, null, null);
		inputcondition.setAttribute(CONST_LIST, CONST_DATALIST_COLUMNS);
		divcolxs12.appendChild(inputcondition);
		divrow.appendChild(divcolxs12);
		return divrow;
	}

	/* Configurando a tela apos o usuario selecionar o tipo padrao de grafico */
	function configureScreenByDefaultGraphic(select){
		var value_selected = select.value;
		var div_chart = document.getElementById(CONST_CHART);
		var div_chart_pie = document.getElementById(CONST_CHART_PIE);
		var div_table = document.getElementById(CONST_TABLE);

		if(value_selected != CONST_TABLE){
			var id_selects_type_graphic = getAllSelectsGraphicTypeIds();
			if(id_selects_type_graphic != null && id_selects_type_graphic.length > 0){
				var disabled = true;
				var select_index = null;
				if(value_selected == CONST_COLUMN || value_selected == CONST_LINE){
					disabled = false;
					if(value_selected == CONST_COLUMN){
						select_index = 0;
					} else if(value_selected == CONST_LINE){
						select_index = 1;
					}
				}	
				var select;
				for(var i = 0; i < id_selects_type_graphic.length; i++){
					select = document.getElementById(id_selects_type_graphic[i]);
					select.disabled = disabled;
					if(select_index != null){
						select.selectedIndex = select_index;
					}
				}
				var chart;
				if(value_selected == CONST_PIE){
					div_chart.hidden = true;
					div_chart_pie.hidden = false;
					div_table.hidden = true;
					chart = CONST_CHART_PIE;
				} else {
					div_chart.hidden = false;
					div_chart_pie.hidden = true;
					div_table.hidden = true;
					chart = CONST_CHART;
				}
				changeGraphicTypeByChart(chart, value_selected);
			}
		} else {
			generateTableWithGraphicData();
			div_chart.hidden = true;
			div_chart_pie.hidden = true;
			div_table.hidden = false;	
		}
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
		complete_json = JSON_WITH_DATA;
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
			var select_graphic_type = document.getElementById(CONST_SELECT_DEFAULT_GRAPHIC).value;
			if(select_graphic_type == CONST_PIE){
				changeGraphicTypeByChart(CONST_CHART_PIE, select_graphic_type);
			} else if(select_graphic_type == CONST_TABLE){
				generateTableWithGraphicData();
			}
		} else if(axis == CONST_X){
			removeCategoriesByChart(CONST_CHART);
			removeCategoriesByChart(CONST_CHART_PIE);
			generateTableWithGraphicData();
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
	function researchGraphic(buttonid, axis, column_type){
		if(axis == null){
			axis = buttonid.split('-')[3];
		}
		if(column_type == null){
			column_type = getTypeColumn(buttonid, CONST_RESEARCH);
		}
		if(axis == CONST_X){
			researchValuesGraphicAxisX(buttonid, column_type, axis);
		} else if(axis == CONST_Y){
			researchValuesGraphicAxisY(buttonid, column_type, axis);
		}
		var select_graphic_type = document.getElementById(CONST_SELECT_DEFAULT_GRAPHIC).value;
		if(select_graphic_type == CONST_PIE){
			changeGraphicTypeByChart(CONST_CHART_PIE, select_graphic_type);
		} else if(select_graphic_type == CONST_TABLE){
			generateTableWithGraphicData();
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

			// Gerando grafico com os dados agrupados
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

	/* Recuperando o id de todos os selects de tipo de grafico */
	function getAllSelectsGraphicTypeIds(){
		var ids = new Array();
		var groupaxisy = document.getElementById(CONST_COLUMNS_GROUP_Y);
		if(groupaxisy != null){
			var selects_type_graphic = groupaxisy.getElementsByClassName(CONST_FORM_CONTROL_SELECT_GRAPHIC_TYPE);
			for(var i = 0; i < selects_type_graphic.length; i++){
				ids.push(selects_type_graphic[i].id);
			}
		}
		return ids;
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

	/* Recuperando o nome de todas as colunas no eixo Y */
	function getAllNameColumnsOnAxisY(){
		var column_names = new Array();
		var groupaxisy = document.getElementById(CONST_COLUMNS_GROUP_Y);
		if(groupaxisy != null){
			var a_title = groupaxisy.getElementsByClassName(CONST_A_TITLE_REMOVE);
			for(var i = 0; i < a_title.length; i++){
				column_names.push(a_title[i].innerHTML);
			}
		}
		return column_names;
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

	/* Gerando tabelas com os dados baseado no grafico */
	function generateTableWithGraphicData(){
		var div_table = document.getElementById(CONST_TABLE);
		// Apagando tabela antiga
		while (div_table.firstChild) {
		    div_table.removeChild(div_table.firstChild);
		}
		var column_name_x = getNameColumnOnAxisX();
		if(!column_name_x != null){
			var columns_name_y = getAllNameColumnsOnAxisY();
			generateTable(column_name_x, columns_name_y, div_table);
		} else {
			alert(MESSAGE_NOT_VALUES_ON_AXIS_X);
		}		
	}

	/* Gerando tabela com os dados */
	function generateTable(columnx_name, columns_name_y, div_table){
		var table = createNewTable(null, CONST_TABLE_TABLE_BORDERED_TABLE_STRIPE);
		var thead = createNewTHead();
		var trhead = createNewTr();
		var thhead = createNewTh(columnx_name);
		// head
		trhead.appendChild(thhead);	
		if(columns_name_y != null){
			for(var i = 0; i < columns_name_y.length; i++){
				thhead = createNewTh(columns_name_y[i]);
				trhead.appendChild(thhead);
			}
			thead.appendChild(trhead);
		}	
		// body
		var tbody = createNewTBody();
		var trbody;
		var tdbody;
		var categories = getCategoriesByChart(CONST_CHART);
		var series = getSeriesByChart(CONST_CHART);
		for(var i = 0; i < categories.length; i++){
			trbody = createNewTr();
			tdbody = createNewTd(categories[i]);
			trbody.appendChild(tdbody);
			for(var j = 0; j < series.length; j++){
				tdbody = createNewTd(series[j].yData[i]);
				trbody.appendChild(tdbody);
			}
			tbody.appendChild(trbody);
		} 
		table.appendChild(thead);
		table.appendChild(tbody);
		div_table.appendChild(table);
	}

	/* Criando novo grafico */
	function newChartConfiguration(){
		var confirmation = confirm(MESSAGE_DO_YOU_WANT_TO_SAVE_THE_GRAPHIC);
		if (confirmation == true) {
			saveChartConfiguration();
		} 
		cleanPlugin();
	}

	/* Salvando configuracao do chart */
	function saveChartConfiguration(){
		var idplot = document.getElementById(CONST_ID_PLOT).value;
		var id = '';
		if(idplot != null || idplot != ''){
			id = idplot;
		}
		var chart_configuration = getJsonWithValuesOfChart(id);
		onSaveChartConfiguration(chart_configuration, callbackfunctionOnSave);
	}

	/* Limpando todas as configuracoes da tela atual */
	function cleanPlugin(){
		// Removendo colunas
		removeColumns(CONST_Y);
		removeColumns(CONST_X);
		// Reinicializando os graficos
		initializeChart(CONST_CHART);
		initializeChart(CONST_CHART_PIE);
		// Removendo id do grafico atual
		document.getElementById(CONST_ID_PLOT).value = '';
		// Removendo valores de titulo e descricao
		$('.edit').editable('setValue', null)
		// Grafico padrao como de barra
		var select = document.getElementById(CONST_SELECT_DEFAULT_GRAPHIC);
		select.selectedIndex = 0;
	}

	/* Removendo todas as colunas do eixo enviado por parametro */
	function removeColumns(axis){
		var id;
		if(axis == CONST_Y){
			id = CONST_COLUMNS_GROUP_Y;
		} else if(axis == CONST_X){
			id = CONST_COLUMNS_GROUP_X;
		}
		var groupaxis = document.getElementById(id);
		while (groupaxis.firstChild) {
		    groupaxis.removeChild(groupaxis.firstChild);
		}
	}

	/* Criando JSON com todos os valores de configuracao do grafico atual */
	function getJsonWithValuesOfChart(id){
		var json_complete;
		var data = new Object();
		var groupaxisy = document.getElementById(CONST_COLUMNS_GROUP_Y); 
		var group_columns_axis_y = groupaxisy.getElementsByClassName(CONST_PANEL_PANEL_DEFAULT);
		var object_all_columns_axis_y = new Array();
		var object_all_columns_axis_x = new Array();
		var object_column;

		var title_plot = document.getElementById(CONST_TITLE_PLOT).innerHTML;
		var description_plot = document.getElementById(CONST_DESCRIPTION_PLOT).innerHTML;

		if(title_plot == NO_VALUE){
			title_plot = '';
		}
		if(description_plot == NO_VALUE){
			description_plot = '';
		}
		if(id != null && id != ''){
			data.id = id;
		}
		data.title_plot = title_plot;
		data.description_plot = description_plot;
		data.default_graphic = getSelectGraphicDefault();

		var title_plot = document.getElementById(CONST_TITLE_PLOT)

		// Colunas no eixo Y
		if(group_columns_axis_y != null && group_columns_axis_y.length > 0){
			for(var i = 0; i < group_columns_axis_y.length; i++){
				object_column = getAllConfigurationsOfColumn(group_columns_axis_y[i]);
				object_all_columns_axis_y.push(object_column);
			}
		}
		data.columns_axis_y = object_all_columns_axis_y;

		// Colunas no eixo X
		var groupaxisx = document.getElementById(CONST_COLUMNS_GROUP_X); 
		var group_columns_axis_x = groupaxisx.getElementsByClassName(CONST_PANEL_PANEL_DEFAULT);
		if(group_columns_axis_x != null && group_columns_axis_x.length > 0){
			object_column = getAllConfigurationsOfColumn(group_columns_axis_x[0])
			object_all_columns_axis_x.push(object_column);
		}
		data.columns_axis_x = object_all_columns_axis_x;

		json_complete = JSON.stringify(data);
		return json_complete;
	}

	/* Recuperando todos os valores de configuracao do grafico atual */ 
	function getAllConfigurationsOfColumn(div_column){
		var column_configuration = new Object();
		column_configuration.id = div_column.id;
		column_configuration.title = div_column.getElementsByClassName(CONST_A_TITLE_REMOVE)[0].innerHTML;

		column_configuration.select_graphic_type = getSelectGraphicType(div_column);
		column_configuration.select_order = getSelectOrderValues(div_column);
		column_configuration.select_value = getSelectValue(div_column);
		column_configuration.select_filter = getSelectFilterAndInputs(div_column);
		column_configuration.select_condition = getSelectConditionAndInputs(div_column);
		column_configuration.filter_text = getFilterTextInput(div_column);

		return column_configuration;
	}

	/* Recuperando o grafico padrao selecionado e as opcoes disponiveis */
	function getSelectGraphicDefault(){
		var object = new Object();
		var select = document.getElementById(CONST_SELECT_DEFAULT_GRAPHIC);
		if(select != null){
			object.value = select.value;
			var options = new Array();
			var option;
			for(var i = 0; i < select.options.length; i++){
				option = new Object();
				option.value = select.options[i].value;
				option.text = select.options[i].text;
				options.push(option);
			}
			object.options = options;
		}
		return object;
	}

	/* Recuperando o tipo de grafico selecionado pela coluna e as opcoes disponiveis */
	function getSelectGraphicType(div_column){
		var object = new Object();
		var select = div_column.getElementsByClassName(CONST_FORM_CONTROL_SELECT_GRAPHIC_TYPE);
		if(select != null && select.length > 0){
			object.value = select[0].value;
			var options = new Array();
			var option;
			for(var i = 0; i < select[0].options.length; i++){
				option = new Object();
				option.value = select[0].options[i].value;
				option.text = select[0].options[i].text;
				options.push(option);
			}
			object.options = options;
		}
		return object;
	}

	/* Recuperando o tipo de ordenacao selecionado pela coluna e as opcoes disponiveis */
	function getSelectOrderValues(div_column){
		var object = new Object();
		var select = div_column.getElementsByClassName(CONST_FORM_CONTROL_SELECT_ORDER);
		if(select != null && select.length > 0){
			object.value = select[0].value;
			var options = new Array();
			var option;
			for(var i = 0; i < select[0].options.length; i++){
				option = new Object();
				option.value = select[0].options[i].value;
				option.text = select[0].options[i].text;
				options.push(option);
			}
			object.options = options;
		}
		return object;
	}

	/* Recuperando o valor selecionado pela coluna e as opcoes disponiveis */
	function getSelectValue(div_column){
		var object = new Object();
		var select = div_column.getElementsByClassName(CONST_FORM_CONTROL_SELECT_VALUE);
		if(select != null && select.length > 0){
			object.value = select[0].value;
			var options = new Array();
			var option;
			for(var i = 0; i < select[0].options.length; i++){
				option = new Object();
				option.value = select[0].options[i].value;
				option.text = select[0].options[i].text;
				options.push(option);
			}
			object.options = options;
		}
		return object;
	}

	/* Recuperando o filtro selecionado pela coluna e as opcoes disponiveis */
	function getSelectFilterAndInputs(div_column){
		var object = new Object();
		var select = div_column.getElementsByClassName(CONST_FORM_CONTROL_SELECT_FILTER);
		if(select != null && select.length > 0){
			object.value = select[0].value;
			var options = new Array();
			var option;
			for(var i = 0; i < select[0].options.length; i++){
				option = new Object();
				option.value = select[0].options[i].value;
				option.text = select[0].options[i].text;
				options.push(option);
			}
			object.options = options;

			var initial_input = div_column.getElementsByClassName(CONST_FORM_CONTROL_INITIAL_INPUT);
			if(initial_input != null && initial_input.length > 0){
				object.initial_input = initial_input[0].value;
			}
			var final_input = div_column.getElementsByClassName(CONST_FORM_CONTROL_FINAL_INPUT);
			if(final_input != null && final_input.length > 0){
				object.final_input = final_input[0].value;
			}
		}
		return object;
	}

	/* Recuperando a condicao selecionada pela coluna e as opcoes disponiveis */
	function getSelectConditionAndInputs(div_column){
		var object = new Object();
		var select = div_column.getElementsByClassName(CONST_FORM_CONTROL_SELECT_CONDITION);
		if(select != null && select.length > 0){
			object.value = select[0].value;
			var options = new Array();
			var option;
			for(var i = 0; i < select[0].options.length; i++){
				option = new Object();
				option.value = select[0].options[i].value;
				option.text = select[0].options[i].text;
				options.push(option);
			}
			object.options = options;

			var count_if = div_column.getElementsByClassName(CONST_FORM_CONTROL_CONDITION_COUNT_IF);
			if(count_if != null && count_if.length > 0){
				object.count_if = count_if[0].value;
			}
			var sum_if = div_column.getElementsByClassName(CONST_FORM_CONTROL_CONDITION_SUM_IF);
			if(sum_if != null && sum_if.length > 0){
				object.sum_if = sum_if[0].value;
			}
		}
		return object;
	}

	/* Recuperando o filtro inserido pelo usuario na coluna */
	function getFilterTextInput(div_column){
		var object = new Object();
		var filter_text_input = div_column.getElementsByClassName(CONST_FILTER_TEXT);
		if(filter_text_input != null && filter_text_input.length > 0){
			object.filter_text_input = filter_text_input[0].value;
		}	
		return object;
	}

	/* Gerando o novo plot baseado na configuracao */
	function generateNewPlotByChartConfiguration(chart_configuration){

		var divgroup = document.getElementById(CONST_CHECKBOX_PLOTS_GROUP);
		var chart_configuration_object = JSON.parse(chart_configuration);
		var id_configuration = chart_configuration_object.id;
		var title_configuration = (chart_configuration_object.title_plot).split(' ').join('_');
		
		var id_plot = CONST_PLOT+'-'+id_configuration+'-'+title_configuration;
		
		// Div que contera o plot
		var divrow = createNewDiv(id_plot, null, null, CONST_ROW_DIV_WITH_PLOT, null, null, null);
		var divcolxs12 = createNewDiv(null, null, null, CONST_COL_XS_12, null, null, null);
		var inputid = CONST_CHECKBOX+'-'+id_plot;
		var input = createNewInput(inputid, CONST_CHECKBOX, CONST_CHECKBOX_PLOTS, null, null);

		var labeltext = chart_configuration_object.title_plot;
		var label = createNewLabel(null, labeltext, null, null, null, null);

		var ida = CONST_REMOVE+'-'+id_plot;
		var a = createNewA(ida, CONST_REMOVE_PLOT, onClickRemovePlot, null, null, null);

		var img = createNewImg(null, CONST_IMG_TRASH, null, null, CONST_IMG_TRASH_CLASS);

		a.appendChild(img);
		divcolxs12.appendChild(input);
		divcolxs12.appendChild(label);
		divcolxs12.appendChild(a);
		divrow.appendChild(divcolxs12);
		divgroup.appendChild(divrow);
	}

	function confirmDeletePlot(divplot){
		var confirmation = confirm(MESSAGE_HAVE_YOU_SURE_THAT_WANT_TO_DELETE_PLOT);
		if (confirmation == true) {
			var chart_configuration_id = (divplot.id).split('-')[2];
		    onRemoveChartConfiguration(chart_configuration_id, callbackfunctionOnRemove);
		} 
	}

	function removeDivWithPlotDeleted(chart_configuration){
		var divgroupwithplots = document.getElementById(CONST_CHECKBOX_PLOTS_GROUP);
		var divplots = divgroupwithplots.getElementsByClassName(CONST_ROW_DIV_WITH_PLOT);
		if(divplots != null && divplots.length > 0){
			var chart_configuration_object = JSON.parse(chart_configuration);
			var divplotid;
			for(var i = 0; i < divplots.length; i++){
				divplotid = (divplots[i].id).split('-')[1];
				if(divplotid == String(chart_configuration_object.id)){
					var elem = document.getElementById(divplots[i].id);
					elem.parentNode.removeChild(elem);
				}
			}
		}
	}





	/* --------------------------------------------------------------------------------------------------------- */
});