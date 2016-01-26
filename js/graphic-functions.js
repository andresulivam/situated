
/* Inicializando os gráficos com configuracoes padroes */
function initializeChart(chart_id){
	$('#'+chart_id).highcharts({
        chart: {
            type: CONST_COLUMN
        },
        title: {
            text: CONST_SITUATED
        },
        plotOptions: {
	        series: {
	            pointPadding: 0.2,
	            borderWidth: 0,
	            dataLabels: {
	                enabled: true
	            }
	        },
	        pie: {
	            plotBorderWidth: 0,
	            allowPointSelect: true,
	            cursor: 'pointer',
	            size: '100%',
	            dataLabels: {
	                enabled: true,
	                format: '{point.name}: <b>{point.y}</b>'
	            },
                showInLegend: true
	        },
		    line: {
		        dataLabels: {
		            enabled: true
		        }
		    }
	    }
    });
}

/* Mudando o estilo do grafico baseado na escolha do usuario */
function changeGraphicTypeByChart(chart_id, type){
	var highcharts = getChartById(chart_id);
	if(highcharts != null){
		var series = highcharts.series;
		if(type == CONST_PIE){
			// caso seja para alterar para o grafico de pizza

			// recuperando as categories do grafico barra/linha
			var categories = getCategoriesByChart(CONST_CHART);
			// recuperando as series do grafico barra/linha
			var series_chart = getChartById(CONST_CHART).series;
			// criando nova serie para gerar o grafico de pizza
			var serie = groupSeriesToCreateAPie(categories, series_chart);
			// removendo todas as series antigas
			for(var i = 0; i < series.length; i++){
				series[i].remove();
				i--;
			}
			highcharts.type = type;
			highcharts.addSeries({
				type: type,
				name: SUM_TOTAL,
				data: serie
			});
		} else {
			// caso seja barra ou linha
			for(var i = 0; i < series.length; i++){	
				series[i].update({
	                type: type
	            });
			}
		}
	}
}

/* Gerando uma serie para o grafico de pizza */
function groupSeriesToCreateAPie(categories, series){
	var array_series = new Array();
	if(categories != null && categories.length > 0){
		var data;
		var value_total = 0;
		for(var i = 0; i < categories.length; i++){
			for(var j = 0; j < series.length; j++){
				value_total = value_total + parseInt(series[j].yData[i]);
			}
			data = new Object()
			data.y = value_total;
			data.name = categories[i];
			array_series.push(data);
			value_total = 0;
		} 
	}
	return array_series;
}

/* Formata o array de series temporarias para o formato exigido no grafico */
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
		                type: serie_type,
                		drilldown: true
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
		for(var i = 0; i < series.length; i++){
			if(series[i].name == serie_name){
				series[i].remove();
			}
		}
	}
}

/* Inicializa grafico vazio */
function removeCategoriesByChart(chart_id){
	initializeChart(chart_id);
}

