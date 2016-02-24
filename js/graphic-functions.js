
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

/* Retorna chart baseado no id enviado por parametro */
function getChartById(chart_id){
	var chart = $('#'+chart_id);
	if(chart != null && chart.highcharts() != null){
		return chart.highcharts();
	}
	return null;
}

/* Lista com as categorias do chart baseado no id enviado por parametro */
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

/* Inserindo category no chart baseado no id enviado por parametro */
function setCategoriesByChart(chart_id, categories_values){
	var chart = $('#'+chart_id);
	var highcharts = chart.highcharts();
	if(highcharts != null){
		highcharts.xAxis[0].categories = categories_values;
		highcharts.redraw();
	}
}

/* Lista com as series do chart baseado no id enviado por parametro */
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

/* Inserindo as series no chart baseado no id enviado por parametro */
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

/* Removendo serie pelo nome */
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

/* Exportando graficos */
function exportingGraphics(select_type_export, array_chart_configurations){
	if(array_chart_configurations != null && array_chart_configurations.length > 0){
		var array_charts = new Array();
		var categories;
		var series;
		var serie;
		var div_charts = document.getElementById(CONST_CHARTS_EXPORT)
		for(var i = 0; i < array_chart_configurations.length; i++){
			var div = createNewDiv(null, null, null, null, null, null, true);
			div_charts.appendChild(div);

			categories = array_chart_configurations[i].chart_configuration.categories;
			var chart = getNewChartToExport(categories, div);
			
			series = array_chart_configurations[i].chart_configuration.series;
			if(series != null){
				for(var j = 0; j < series.length; j++){
					serie = series[j];
					chart.addSeries({
						type: serie.type,
						name: serie.name,
						data: serie.data
					});
				}
			}
			var chart_temp = Object.assign(chart);
			array_charts.push(chart_temp);
		}
		Highcharts.exportCharts(array_charts, select_type_export);
		removeAllDivsExportCharts();
	}
}

Highcharts.getSVG = function(charts) {
    var svgArr = [],
        top = 0,
        width = 0;
    $.each(charts, function(i, chart) {
        var svg = chart.getSVG();
        svg = svg.replace('<svg', '<g transform="translate(0,' + top + ')" ');
        svg = svg.replace('</svg>', '</g>');

        top += chart.chartHeight;
        width = Math.max(width, chart.chartWidth);

        svgArr.push(svg);
    });

    return '<svg height="'+ top +'" width="' + width + '" version="1.1" xmlns="http://www.w3.org/2000/svg">' + svgArr.join('') + '</svg>';
};

Highcharts.exportCharts = function(charts, select_type_export, options) {

	// Merge the options
    options = Highcharts.merge(Highcharts.getOptions().exporting, options);

	// Post to export server
    Highcharts.post(options.url, {
    	filename: options.filename || 'chart',
        type: select_type_export,
        width: options.width,
        svg: Highcharts.getSVG(charts)
    });
};

function getNewChartToExport(categories, div){
	var chart = new Highcharts.Chart({ 
		    chart: {
		        renderTo: div
		    },
		    title: {
	            text: CONST_SITUATED
	        },
	        xAxis: { 
	        	categories: categories 
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
	return chart;
}

function removeAllDivsExportCharts(){
	var div_charts = document.getElementById(CONST_CHARTS_EXPORT);
	// Apagando tabela antiga
	while (div_charts.firstChild) {
	    div_charts.removeChild(div_charts.firstChild);
	}
}
