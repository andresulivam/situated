
function getValuesFromFilter(column_name, range_initial, range_final, condition, x_column, x_value, column_type, filter_text, axis){

	var values = new Array();

	var complete_json = JSON_TEST;
	if(complete_json != null) {
		var fieldsJson = complete_json.message;
		var valid_value = true;
		var value;
		for(var i = 0; i < fieldsJson.length; i++){
			value = fieldsJson[i][column_name];
			// Filtrando pelo valor de X
			if(x_column != null){
				var y_value_column_x = fieldsJson[i][x_column];
				if(x_value != y_value_column_x){
					valid_value = false;
				}
			}
			// Filtrando pelo range inicial
			if(valid_value) {
				if(range_initial != null){
					valid_value = filterByRange(range_initial, value, CONST_INITIAL, column_type);
				}
			}
			// Filtrando pelo range final
			if(valid_value){
				if(range_final != null){
					valid_value = filterByRange(range_final, value, CONST_FINAL, column_type);
				}
			}
			// Filtrando pela condicao
			if(valid_value){
				if(condition != null && condition != CONST_COUNT_ALL){

				}
			}
			// Filtrando pelo filtro de texto
			if(valid_value){
				if(filter_text != null){
					valid_value = filterByText(filter_text, value);
				}
			}
			// Caso seja coluna do eixo X, nao repetir o valor
			if(valid_value){
				if(axis == CONST_X){
					valid_value = !check_already_exist(value, values)
				}
			}
			if(valid_value){
				values.push(value);
			}
			valid_value = true;
		}
		// Ordenando valores
		if(x_column == null){
			values = sortArray(values);
		}
	}
	return values;
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

/* Filtrando pelo range enviado por parametro */
function filterByRange(range, value, range_type, column_type){
	
	if(column_type == CONST_NUMBER){
		if(range_type == CONST_INITIAL){
			if(value >= range) {
				return true;
			}
		}else if(range_type == CONST_FINAL){
			if(value <= range) {
				return true;
			}
		}
	} else if(column_type == CONST_DATE){
		var parsedDate = Date.parse(value);
		if (isNaN(value) && !isNaN(parsedDate)) {
			var datea = range.split('-');
			var dateb = value.split('/');
			var date_a = new Date(datea[0],datea[1],datea[2]);
			var date_b = new Date(dateb[2],dateb[1],dateb[0]);
			if(range_type == CONST_INITIAL){
				if(date_b >= date_a){
				    return true;
				}
			}else if(range_type >= CONST_FINAL){
				if(date_b <= date_a){
				    return true;
				}
			}
		}
	}
	return false;
}

/* Filtrando pela condicao enviada por parametro */
function filterByCondition(condition, value_condition, value){

}

/* Filtrando pelo texto inserido pelo usuario */
function filterByText(filter, value){
	if(filter != null && filter.length > 0){
		var filter_split = filter.split('[');
		var operation = filter_split[0];
		var filter = filter_split[1].replace(']','');
		value = value.toLowerCase();
		filter = filter.toLowerCase();
		if(operation == '='){
			if(value.indexOf(filter) > -1){
				return true;
			}
		} else if(operation == '=='){
			if(value == filter){
				return true;
			}
		} else if(operation == '<>'){
			if(value != filter){
				return true;
			}
		}
		return false;
	}
	return true;
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


