
function setAxisX(tipe_graphic, values){
	var chart = $('#chart').highcharts(
		{
			chart: { 
				type: tipe_graphic 
			},
	        title: {
	        	text: 'Situated'
	        },
	        xAxis: {
            	categories: values
        	},
	        series: [
		        {
		            data: [1,3,5,6]
		        }, 
		        {
		        	type: 'spline',
		            data: [6,4,1,8]
		        },
		        {
		            data: [0,10,7,2]
		        }
	        ]
		}
	);

	var highcharts = chart.highcharts();
	var categories = highcharts.xAxis[0].categories;
	var series = highcharts.series;
	series.splice(0, 1);

	highcharts.redraw();
}

function setValuesGraphic(tipe_graphic, categories, series){
	var chart = $('#chart').highcharts(
		{
			chart: { 
				type: tipe_graphic 
			},
	        title: {
	        	text: 'Situated'
	        },
	        xAxis: {
            	categories: categories
        	},
	        series: series
		}
	);
}