function onChangeInputPersonalized(){

	var cursor_position = this.selectionStart;
	var value_inputted = this.value;
	var last_value_inputted = value_inputted[cursor_position-1];

	if(last_value_inputted == ':'){
		var type_values = checkTheLastInputtedValues(this);
		formatDatalistToArrayColumns(this, cursor_position, type_values);					
	} 
}

function formatDatalistToArrayColumns(text_input, cursor_position, type_values){
	// recuperando todas as colunas
	var select_columns = document.getElementById(CONST_SELECT_COLUMN);
	var options = select_columns.options;
	var options_columns;
	if(type_values == CONST_NUMBER){
		options_columns = new Array();
		for(var i = 0; i < options.length; i++){
			if(options[i].className == (type_values+'-'+CONST_TYPE)){
				options_columns.push(options[i]);
			}
		}
	}
	if(options_columns == null){
		options_columns = options;
	}
	var value_complete_inputted = text_input.value;
	var text_before = value_complete_inputted.substring(0, cursor_position);
	var text_after = value_complete_inputted.substring(cursor_position, value_complete_inputted.length);

	var array_options_datalist = arrayDataListColumns(text_before, options_columns, text_after);
	var datalist = document.getElementById(CONST_DATALIST_COLUMNS_PERSONALIZE);
	while(datalist.firstChild) {
	    datalist.removeChild(datalist.firstChild);
	}
	var option;
	for(var i=0; i < array_options_datalist.length; i++){
		option =  document.createElement(CONST_OPTION);
		option.value = array_options_datalist[i].value;
		datalist.appendChild(option);
	}
}

function checkTheLastInputtedValues(text_input){
	var value_inputted = text_input.value;
	var initial_position;
	var closed = false;
	for(var i = value_inputted.length; i > 0; i--){
		if(value_inputted[i] == ')'){
			closed = true;
		} else if(value_inputted[i] == '('){
			if(closed){
				closed = false;
			} else {
				initial_position = i;
				break;
			}
		}
	}

	var value_1 = value_inputted[initial_position];
	var value_2 = value_inputted[initial_position-1];
	var value_3 = value_inputted[initial_position-2];
	var value_4 = value_inputted[initial_position-3];
	var value_5 = value_inputted[initial_position-4];
	var value_6 = value_inputted[initial_position-5];

	var complete_value;
	if(value_1 == '('){
		complete_value = value_4+value_3+value_2+value_1;
		if(complete_value == CONST_AVG+'(' || complete_value == CONST_SUM+'('){
			return CONST_NUMBER;
		} else {
			complete_value = value_6+value_5+value_4+value_3+value_2+value_1;
			if(complete_value == CONST_COUNT+'('){
				return CONST_ALL_VALUES;
			} else {
				return CONST_INVALID;
			}
		}
	} 
	return CONST_ALL_VALUES;	
}

/* Criando o datalist com os valores das colunas disponiveis para o filtro */
function arrayDataListColumns(text_before, options_columns, text_after){
	var arrayOptions = new Array();
	var option;
	if(options_columns != null){
		for(var i = 0; i < options_columns.length; i++){
			option = {value: text_before+options_columns[i].value+text_after};
			arrayOptions.push(option);
		}
	} else {
		option = {value: text_before+text_after}
		arrayOptions.push(option);
	}	
	return arrayOptions;
}

function getValuesOfFunctions(text_input_value){
	var substring = '';
	var array_substring = new Array();
	var formula;
	var categories = getCategoriesByChart(CONST_CHART);
	var value_temp;
	var column_name;
	var column_name_x;
	if(categories != null){
		for(var i = 0; i < text_input_value.length; i++){
			if(text_input_value[i] == ')'){
				for(var j = i; j > 0; j--){
					if(text_input_value[j] == '('){
						formula = getFormula(text_input_value, j);
						if(formula != CONST_INVALID){
							substring = text_input_value.substring((j-formula.length),i+1);
							for(var z = 0; z < categories.length; z++){
								column_name = getNameColumnByFormula(substring);
								column_name_x = getNameColumnOnAxisX();
								value_temp = new Object();
								value_temp.value = getValuesToSeries(column_name, column_name_x, null, categories[z], null, null);
								value_temp.substring = substring;
								array_substring.push(value_temp);
								text_input_value = text_input_value.replace(substring,'');
								i = i - substring.length;
							}
						}
						break;
					}
				}
			}
		}
	}
	console.log(array_substring);
}

function getFormula(text, initial_position){
	var value_1 = text[initial_position-1];
	var value_2 = text[initial_position-2];
	var value_3 = text[initial_position-3];
	var value_4 = text[initial_position-4];
	var value_5 = text[initial_position-5];
	var complete_value = value_3+value_2+value_1;
	if(complete_value == CONST_AVG ){
		return CONST_AVG;
	} else if(complete_value == CONST_SUM){
		return CONST_SUM;
	} else {
		complete_value = value_5+value_4+value_3+value_2+value_1;
		if(complete_value == CONST_COUNT){
			return CONST_COUNT;
		} 
	}
	return CONST_INVALID;
}

function getNameColumnByFormula(substring){
	if(substring != null){
		var text_formula = substring.split(':')[1].replace(')','');
		return text_formula;
	}
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

