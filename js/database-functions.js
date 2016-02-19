
var ID = 1;

var array_temp_chart_configurations = new Array();
var updated

function onLoadPlugin(callbackfunction){
	// ajax de pesquisa do JSON com os dados das colunas e o JSON com os dados salvos anteriormente
	// no caso 'success', chamar o callbackfunction enviando 'true' e os 2 JSONS como parametro
	
	// JSON_WITH_DATA está no arquivo consts.js
	callbackfunction(true, loadPlugin()[0], loadPlugin()[1]);
}

function onSearchChartConfiguration(chart_configuration_id, callbackfunction){
	// ajax de pesquisa do JSON com os dados da configuracao do grafico a ser visualizado
	// no caso 'success', chamar o callbackfunction enviando 'true' e o json da configuracao para ser inserido na tela
	var object = searchConfiguration(chart_configuration_id);
	callbackfunction(true, object);
}

function onRemoveChartConfiguration(chart_configuration_id, callbackfunction){
	// ajax de remocao do JSON com os dados da configuracao do grafico a ser removido
	// no caso 'success', chamar o callbackfunction enviando 'true' e o id do grafico removido para ser retirado da tela
	removeConfiguration(chart_configuration_id);
	callbackfunction(true, chart_configuration_id);
}

function onSaveChartConfiguration(chart_configuration, callbackfunction){
	// ajax de adicao do JSON com os dados da configuracao do grafico a ser salvo
	// no caso 'success', chamar o callbackfunction enviando 'true' e o json da configuracao para ser inserido na tela	
	var object = saveConfiguration(chart_configuration);
	callbackfunction(true, object);
	ID = ID + 1;
}


/* ----------------------------------- APENAS PARA TESTES ----------------------------------*/

function loadPlugin(){
	var values = new Array();
	values[0] = JSON_WITH_DATA;
	values[1] = array_temp_chart_configurations;
	return values;
}

function searchConfiguration(chart_configuration_id){
	var value = null;
	for(var i = 0; i < array_temp_chart_configurations.length; i++){
		var object_temp = JSON.parse(array_temp_chart_configurations[i]);
		if(object_temp.id == chart_configuration_id){
			value = JSON.stringify(object_temp);
			break;
		}
	}
	return value;
}

function removeConfiguration(chart_configuration_id){
	var value = null;
	for(var i = 0; i < array_temp_chart_configurations.length; i++){
		var object_temp = JSON.parse(array_temp_chart_configurations[i]);
		if(object_temp.id == chart_configuration_id){
			value = JSON.stringify(object_temp);;
			array_temp_chart_configurations.splice(i,1);
			break;
		}
	}
	return value;
}

function saveConfiguration(chart_configuration){

	var object_temp = JSON.parse(chart_configuration);
	var object;
	if(object_temp.id == null || object_temp.id == ''){
		chart_configuration = saveNewConfiguration(chart_configuration);
	} else {
		chart_configuration = updateConfiguration(chart_configuration);
	}
	return chart_configuration;
}

function saveNewConfiguration(chart_configuration){
	var new_id = 0;	
	for(var i = 0; i < array_temp_chart_configurations.length; i++){
		var object_temp = JSON.parse(array_temp_chart_configurations[i]);
		if(object_temp.id > new_id){
			new_id = object_temp.id;
		}
	}
	new_id = new_id + 1;
	var chart_configuration_object = JSON.parse(chart_configuration);
	chart_configuration_object.id = new_id;
	chart_configuration = JSON.stringify(chart_configuration_object);
	array_temp_chart_configurations.push(chart_configuration);
	return chart_configuration;
}

function updateConfiguration(chart_configuration){
	var chart_configuration_object = JSON.parse(chart_configuration);
	for(var i = 0; i < array_temp_chart_configurations.length; i++){
		var object_temp = JSON.parse(array_temp_chart_configurations[i]);
		if(object_temp.id == chart_configuration_object.id){
			array_temp_chart_configurations.splice(i,1);
			array_temp_chart_configurations.push(chart_configuration);
			break;
		}
	}
	return chart_configuration;
}