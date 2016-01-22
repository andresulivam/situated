
function formatSeriesToGraphic(chart_id, series, column_name_y, column_type, condition_value){
	var serie = new Array();
	var value_action;
	if(condition_value == CONST_COUNT_ALL || condition_value == CONST_COUNT_IF){
		value_action = CONST_COUNT;
	} else if(condition_value == CONST_SUM || condition_value == SUM_IF){
		value_action = CONST_SUM;
	} else if(condition_value == CONST_AVERAGE){
		value_action = CONST_AVERAGE;
	}
	var values_temp;
	for(var i = 0; i < series.length; i++){
		values_temp = series[i][2];
		if(values_temp != null){
			serie.push(values_temp[value_action]);
		}
	}
	setSeriesByChart(chart_id, serie, column_name_y, column_type);
}

function getChartById(chart_id){
	var chart = $('#'+chart_id);
	if(chart != null && chart.highcharts() != null){
		return chart.highcharts();
	}
	return null;
}

function getCategoriesByChart(chart_id){
	var categories = null;
	if(chart_id != null){
		var chart = $('#'+chart_id);
		if(chart != null && chart.highcharts() != null){
			var highcharts = chart.highcharts();
			categories = highcharts.xAxis[0].categories;
		}
	}
	return categories;
}

function setCategoriesByChart(chart_id, categories_values){
	var chart = $('#'+chart_id);
	var highcharts = chart.highcharts();
	if(highcharts != null){
		highcharts.xAxis[0].categories = categories_values;
		highcharts.redraw();
	}
}

function getSeriesByChart(chart_id){
	var series = null;
	if(chart_id != null){
		var chart = $('#'+chart_id);
		if(chart != null && chart.highcharts() != null){
			var highcharts = chart.highcharts();
			series = highcharts.series;
		}
	}
	return series;
}

function setSeriesByChart(chart_id, serie, serie_name, serie_type){
	var highcharts = getChartById(chart_id);
	if(highcharts != null){
		var series = highcharts.series;
		var exist_serie = false;
		for(var i = 0; i < series.length; i++){
			if(series[i].name == serie_name){
				if(series[i].type != serie_type){
					series[i].update({
		                type: serie_type
		            });
				}
				series[i].setData(serie);
				exist_serie = true;
			}
		}
		if(!exist_serie){
			highcharts.addSeries({
				type: serie_type,
				name: serie_name,
				data: serie
			});
		}
	}
}

function removeSerieByName(chart_id, serie_name){
	var highcharts = getChartById(chart_id);
	if(highcharts != null){
		var series = highcharts.series;
		var exist_serie = false;
		for(var i = 0; i < series.length; i++){
			if(series[i].name == serie_name){
				series[i].remove();
			}
		}
	}
}

