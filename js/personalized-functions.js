/* Evento de mudanca no campo de texto do personalizado */
function onChangeInputPersonalized(){

	var cursor_position = this.selectionStart;
	var value_inputted = this.value;
	var last_value_inputted = value_inputted[cursor_position-1];
	// Caso o ultimo valor inserido seja :
	if(last_value_inputted == ':'){
		// Verifica em qual tipo a coluna esta inserida (sum, avg ou count)
		var type_values = checkTheLastInputtedValues(this);
		// Lista array no datalista baseado no tipo
		formatDatalistToArrayColumns(this, cursor_position, type_values);					
	} 
}

/* Insere datalist com as colunas para o campo de texto do personalizado */
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

/* Verifica qual o tipo foi inserido para listar as colunas apos digitar : */
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

/* Calcular o valor da expressa inserida pelo usuario */
function getValuesOfFunctions(expression_value){
	expression_value = expression_value.replace(/ /g, "").toLowerCase();
	var expression = '';
	var array_substring = new Array();
	var operation;
	var categories = getCategoriesByChart(CONST_CHART);
	var column_name;
	var expression_updated;
	var expression_temp = expression_value;
	var count;
	var expression_initial;
	var expression_final;
	if(categories != null && categories.length > 0){
		var column_name_x = getNameColumnOnAxisX();
		for(var z = 0; z < categories.length; z++){
			// Percorrendo toda a expressao para procura e calculo das partes que possuem sum, avg ou count
			for(var i = 0; i < expression_temp.length; i++){
				// Encontrando o parenteses fechado
				if(expression_temp[i] == ')'){
					// Pesquisando os valores anteriores
					for(var j = i; j > 0; j--){
						// Encontrando o parenteses aberto
						if(expression_temp[j] == '('){
							// Recuperando se é soma, media ou contar
							operation = getOperation(expression_temp, j);
							if(operation != CONST_INVALID){
								// Recuperando todo o campo com a operacao. Exemplo: sum(:index)
								expression = expression_temp.substring((j-operation.length),i+1);
								// Expressao com o valor filtrado
								expression_updated = getValueBasedOnExpression(expression, operation, column_name_x, categories[z]);							
								// Encontrando e formando a expressao para substitui-la pelo valor
								expression_initial = expression_temp.substring(0, (j-operation.length));
								expression_final = expression_temp.substring((i+1), expression_value.length);
								// Nova expressao com valor
								expression_temp = expression_initial + expression_updated + expression_final;

								// Atualizando posicao do ponteiro i do loop
								if(expression_temp.length > expression_value.length){
									count = expression_temp.length - expression_value.length;
									i = i + count;
								} else {
									count = expression_value.length - expression_temp.length;
									i = i - count;
								}
							}
							break;
						}
					}
				}
			}
			// Apos o calculo de todas as partes com sum, avg ou count, calcular os valores encontrados
			if(expression_temp != CONST_INVALID){
				expression_temp = expression_temp.replace(/\(/g, "");
				expression_temp = expression_temp.replace(/\)/g, "");
				// Expressao atualizada com calculos dentro de chaves []
				expression_temp = makeCountInsideKeys(expression_temp);
				if(expression_temp != CONST_INVALID){
					expression_temp = expression_temp.replace(/\[/g, "");
					expression_temp = expression_temp.replace(/\]/g, "");
					// Expressao atualizada com calculos de soma
					expression_temp = makeSumValues(expression_temp);
					if(expression_temp != CONST_INVALID){
						// Expressao atualizada com calculos de subtracao
						expression_temp = makeSubtractionValues(expression_temp);
						if(expression_temp != CONST_INVALID){
							// Expressao atualizada com calculos de multiplicacao
							expression_temp = makeMultiplicationValues(expression_temp);
							if(expression_temp != CONST_INVALID){
								// Expressao atualizada com calculos de multiplicacao
								expression_temp = makeDivisionValues(expression_temp);
							}
						}
					}
				}
			}
			if(expression_temp != CONST_INVALID){
				if(!$.isNumeric(expression_temp)){
					expression_temp = CONST_INVALID;
				}
			}
			array_substring.push(expression_temp);
			expression_temp = expression_value;	
		} 
	}
	return array_substring;
}

/* Recuperando qual operacao e para ser feita (sum, avg ou count) */
function getOperation(text, initial_position){
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

/* Recuperando o nome da coluna */
function getNameColumnByExpression(expression){
	if(expression != null){
		var name_column = expression.split(':')[1].replace(')','');
		return name_column;
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

/* Calculos da expressao que possui sum, avg, count */
function getValueBasedOnExpression(expression, operation, column_name_x, column_value_x){
	if(expression != null && expression != ''){	
		var array_values = new Array();	
		// Atualizando expressao com os valores corretos substituindo as colunas
		expression = updateColumnsExpressionWithValue(expression, operation, column_name_x, column_value_x);
		// Atualizando a expressao com os calculos de expressoes dentro de chaves []
		expression = makeCountInsideKeys(expression);	
	}
	return expression;
}

/* Atualizando expressao com os valores corretos substituindo as colunas */
function updateColumnsExpressionWithValue(expression, operation, column_name_x, column_value_x){
	var column_temp = '';
	// Variavel quando encontra posicao que inicia/finaliza inicio de necessidade de calculo
	var found_expression = false;
	var value_serie_temp;
	var value;

	for(var i = 0; i < expression.length; i++){
		// Inicio do nome de uma coluna
		if(expression.charAt(i) == ':'){
			if(found_expression){
				// Caso estejam 2 colunas juntas sem sinal as separando
				return CONST_INVALID;
			} else {
				found_expression = true;
			}	
		} else if(found_expression){
			if(checkIsValidValueText(expression.charAt(i))){
				// Caso seja alguma letra e nao um sinal matematico para se concatenar e formar o nome da coluna
				column_temp = column_temp.concat(expression.charAt(i))
			} else {
				// Filtrando os valores
				value_serie_temp = getValuesToSeries(column_temp, column_name_x, null, column_value_x, null, null);
				// Valor baseado na operacao
				value = value_serie_temp[2][operation];
				// Substituindo na expressao a coluna pelo valor
				expression = expression.replace(':'+column_temp,value);
				// Atualizando posicao do ponteiro i do loop
				i = i - (':'+column_temp).length;
				found_expression = false;
				column_temp = '';
			}
		}
	}
	expression = expression.replace('(','');
	expression = expression.replace(')','');
	expression = expression.replace(CONST_AVG,'');
	expression = expression.replace(CONST_SUM,'');
	expression = expression.replace(CONST_COUNT,'');
	return expression;
}

/* Atualizando a expressao com os calculos de expressoes dentro de chaves [] */
function makeCountInsideKeys(expression){
	var expression_inside_key = '';
	var expression_initial;
	var expression_final;
	var expression_temp = expression;
	var new_expression_length;
	var initial_position;
	var final_position;
	for(var i = 0; i < expression.length; i++){
		// Encontrando chaves fechado
		if(expression[i] == ']'){
			// Pesquisando os valores anteriores
			for(var j = i; j > 0; j--){
				// Encontrando chaves aberto
				if(expression[j] == '['){
					initial_position = (j+1);
					final_position = (i-1);
					// Expressao interna as chaves
					for(var ini = initial_position; ini <= final_position; ini++){
						expression_inside_key = expression_inside_key.concat(expression.charAt(ini));
					}
					// Expressao atualizada com calculos de soma
					expression_temp = makeSumValues(expression_inside_key);
					if(expression_temp != CONST_INVALID){
						// Expressao atualizada com calculos de subtracao
						expression_temp = makeSubtractionValues(expression_temp);
						if(expression_temp != CONST_INVALID){
							// Expressao atualizada com calculos de multiplicacao
							expression_temp = makeMultiplicationValues(expression_temp);
							if(expression_temp != CONST_INVALID){
								// Expressao atualizada com calculos de multiplicacao
								expression_temp = makeDivisionValues(expression_temp);
								if(expression_temp != CONST_INVALID){
									new_expression_length = expression_temp.length;
									expression_inside_key = '['+expression_inside_key+']';
									// Atualizando expressao
									expression_temp = updateExpressionWithValues(expression_temp, expression, i, j);
									// Atualizando posicao do ponteiro i do loop
									i = (j + new_expression_length);
								}
							}
						}
					}
					expression = expression_temp;			
					expression_inside_key = '';	
				}
			}
		}
	}
	return expression_temp;
}

/* Atualizando expressao com o novo valor substituindo o texto anterior */
function updateExpressionWithValues(expression_temp, expression, i, j){
	// Encontrando e formando a expressao para substitui-la pelo valor
	var expression_initial = expression.substring(0,j);
	var expression_final = expression.substring((i+1), expression.length);
	// Nova expressao com valor
	expression = expression_initial + expression_temp + expression_final;
	return expression;
}

/* Calculos de soma na expressao */
function makeSumValues(expression){
	var result = expression;
	if(expression != null && expression != ''){
		var first_value = '';
		var second_value = '';
		var count_sum = (expression.match(/\+/g) || []).length;
		var sum;
		var position_initial_number = 0;
		var position_final_number = 0;
		var expression_initial;
		var expression_final;
		var expression_temp;
		var sum_text = '';
		if(count_sum > 0){
			for(var i = 0; i < expression.length; i++){
				// Encontrando sinal de soma
				if(expression[i] == '+'){
					// Pesquisando o primeiro valor
					for(var j = (i-1); j >= 0; j--){
						if(checkIsValidValueNumber(expression[j])){
							first_value = first_value.concat(expression[j]);
							position_initial_number = j;
						} else {
							break;
						}
					}
					for(var j = (i+1); j < expression.length; j++){
						if(checkIsValidValueNumber(expression[j])){
							second_value = second_value.concat(expression[j]);
							position_final_number = j;
						} else {
							break;
						}
					}
					// invertendo o primeiro valor
					first_value = first_value.split('').reverse().join('');
					if($.isNumeric(first_value) && $.isNumeric(second_value)){
						sum_text = sum_text.concat(first_value).concat('+').concat(second_value);
						sum = Number(first_value) + Number(second_value);
						expression_initial = expression.substring(0,position_initial_number);
						expression_final = expression.substring((position_final_number+1),expression.length);
						expression_temp = expression_initial + String(sum) + expression_final;
						expression = expression_temp;
						sum = String(sum);
						// Atualizando posicao do ponteiro i do loop
						if(sum.length > sum_text.length){
							count = sum.length - sum_text.length;
							i = i + count;
						} else {
							count = sum_text.length - sum.length;
							i = i - count;
						}
						first_value = '';
						second_value = '';
						sum_text = '';
						result = expression;
					} else {
						result = CONST_INVALID;
						break;
					}
				}
				if(result == CONST_INVALID){
					break;
				}
			}
		}
	} else {
		result = CONST_INVALID;
	}
	return result;
}

/* Calculos de subtracao na expressao */
function makeSubtractionValues(expression){
	var result = expression;
	if(expression != null && expression != ''){
		var first_value = '';
		var second_value = '';
		var count_subtraction = (expression.match(/\-/g) || []).length;
		var subtraction;
		var position_initial_number = 0;
		var position_final_number = 0;
		var expression_initial;
		var expression_final;
		var expression_temp;
		var subtraction_text = '';
		if(count_subtraction > 0){
			for(var i = 0; i < expression.length; i++){
				// Encontrando sinal de soma
				if(expression[i] == '-'){
					// Pesquisando o primeiro valor
					for(var j = (i-1); j >= 0; j--){
						if(checkIsValidValueNumber(expression[j])){
							first_value = first_value.concat(expression[j]);
							position_initial_number = j;
						} else {
							break;
						}
					}
					for(var j = (i+1); j < expression.length; j++){
						if(checkIsValidValueNumber(expression[j])){
							second_value = second_value.concat(expression[j]);
							position_final_number = j;
						} else {
							break;
						}
					}
					// invertendo o primeiro valor
					first_value = first_value.split('').reverse().join('');
					if($.isNumeric(first_value) && $.isNumeric(second_value)){
						subtraction_text = subtraction_text.concat(first_value).concat('-').concat(second_value);
						subtraction = Number(first_value) - Number(second_value);
						expression_initial = expression.substring(0,position_initial_number);
						expression_final = expression.substring((position_final_number+1),expression.length);
						expression_temp = expression_initial + String(subtraction) + expression_final;
						expression = expression_temp;
						subtraction = String(subtraction);
						// Atualizando posicao do ponteiro i do loop
						if(subtraction.length > subtraction_text.length){
							count = subtraction.length - subtraction_text.length;
							i = i + count;
						} else {
							count = subtraction_text.length - subtraction.length;
							i = i - count;
						}
						first_value = '';
						second_value = '';
						subtraction_text = '';
						result = expression;
					} else {
						result = CONST_INVALID;
						break;
					}
				}
				if(result == CONST_INVALID){
					break;
				}
			}
		}
	} else {
		result = CONST_INVALID;
	}
	return result;
}

/* Calculos de multiplicacao na expressao */
function makeMultiplicationValues(expression){
	var result = expression;
	if(expression != null && expression != ''){
		var first_value = '';
		var second_value = '';
		var count_multiplication = (expression.match(/\*/g) || []).length;
		var multiplication;
		var position_initial_number = 0;
		var position_final_number = 0;
		var expression_initial;
		var expression_final;
		var expression_temp;
		var multiplication_text = '';
		if(count_multiplication > 0){
			for(var i = 0; i < expression.length; i++){
				// Encontrando sinal de soma
				if(expression[i] == '*'){
					// Pesquisando o primeiro valor
					for(var j = (i-1); j >= 0; j--){
						if(checkIsValidValueNumber(expression[j])){
							first_value = first_value.concat(expression[j]);
							position_initial_number = j;
						} else {
							break;
						}
					}
					for(var j = (i+1); j < expression.length; j++){
						if(checkIsValidValueNumber(expression[j])){
							second_value = second_value.concat(expression[j]);
							position_final_number = j;
						} else {
							break;
						}
					}
					// invertendo o primeiro valor
					first_value = first_value.split('').reverse().join('');
					if($.isNumeric(first_value) && $.isNumeric(second_value)){
						multiplication_text = multiplication_text.concat(first_value).concat('+').concat(second_value);
						multiplication = Number(first_value) * Number(second_value);
						expression_initial = expression.substring(0,position_initial_number);
						expression_final = expression.substring((position_final_number+1),expression.length);
						expression_temp = expression_initial + String(multiplication) + expression_final;
						expression = expression_temp;
						multiplication = String(multiplication);
						// Atualizando posicao do ponteiro i do loop
						if(multiplication.length > multiplication_text.length){
							count = multiplication.length - multiplication_text.length;
							i = i + count;
						} else {
							count = multiplication_text.length - multiplication.length;
							i = i - count;
						}
						first_value = '';
						second_value = '';
						multiplication_text = '';
						result = expression;
					} else {
						result = CONST_INVALID;
						break;
					}
				}
				if(result == CONST_INVALID){
					break;
				}
			}
		}
	} else {
		result = CONST_INVALID;
	}
	return result;
}

/* Calculos de divisao na expressao */
function makeDivisionValues(expression){
	var result = expression;
	if(expression != null && expression != ''){
		var first_value = '';
		var second_value = '';
		var count_division = (expression.match(/\//g) || []).length;
		var division;
		var position_initial_number = 0;
		var position_final_number = 0;
		var expression_initial;
		var expression_final;
		var expression_temp;
		var division_text = '';
		if(count_division > 0){
			for(var i = 0; i < expression.length; i++){
				// Encontrando sinal de soma
				if(expression[i] == '/'){
					// Pesquisando o primeiro valor
					for(var j = (i-1); j >= 0; j--){
						if(checkIsValidValueNumber(expression[j])){
							first_value = first_value.concat(expression[j]);
							position_initial_number = j;
						} else {
							break;
						}
					}
					for(var j = (i+1); j < expression.length; j++){
						if(checkIsValidValueNumber(expression[j])){
							second_value = second_value.concat(expression[j]);
							position_final_number = j;
						} else {
							break;
						}
					}
					// invertendo o primeiro valor
					first_value = first_value.split('').reverse().join('');
					if($.isNumeric(first_value) && $.isNumeric(second_value) && Number(second_value) != 0){
						division_text = division_text.concat(first_value).concat('+').concat(second_value);
						division = Number(first_value) / Number(second_value);
						expression_initial = expression.substring(0,position_initial_number);
						expression_final = expression.substring((position_final_number+1),expression.length);
						expression_temp = expression_initial + String(division) + expression_final;
						expression = expression_temp;
						division = String(division);
						// Atualizando posicao do ponteiro i do loop
						if(division.length > division_text.length){
							count = division.length - division_text.length;
							i = i + count;
						} else {
							count = division_text.length - division.length;
							i = i - count;
						}
						first_value = '';
						second_value = '';
						division_text = '';
						result = expression;
					} else {
						result = CONST_INVALID;
						break;
					}
				}
				if(result == CONST_INVALID){
					break;
				}
			}
		}
	} else {
		result = CONST_INVALID;
	}
	return result;
}

/* Verificando se o valor enviado como parametro é texto */
function checkIsValidValueText(value){
	if(value != '+' && value != '-' && value != '/' && value != '*' && value != ')' && value != ' ' && value != ':'){
		return true;
	}
	return false;
}

/* Verificando se o valor enviado como parametro é numero */
function checkIsValidValueNumber(value){
	if(value == '.' || $.isNumeric(value)){
		return true;
	}
	return false;
}
