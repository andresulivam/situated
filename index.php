<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Situated</title>
	  	<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">

	 	<!-- JQUERY -->
	  	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	    <!------------>

	  	<!-- BOOTSTRAP -->
	  	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	 	<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	 	<!-- ------------ >

		<!-- X EDITABLE -->
		<link href="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/css/bootstrap-editable.css" rel="stylesheet"/>
		<script src="//cdnjs.cloudflare.com/ajax/libs/x-editable/1.5.0/bootstrap3-editable/js/bootstrap-editable.min.js"></script>

		<!-- HIGHCHARTS -->
		<script src="//code.highcharts.com/highcharts.js"></script>
		<script src="//code.highcharts.com/modules/exporting.js"></script>
		<!-- -------------->

		<!-- CSS -->
		<link rel="stylesheet" href="css/main.css">

		<!-- PLUGIN FUNCTIONS -->
		<script src="js/plugin-functions.js"></script>

		<!-- LANGUAGE -->
		<script src="js/PT-BR.js"></script>

		<!-- CONSTS -->
		<script src="js/consts.js"></script>

		<!-- CREATE ELEMENTS -->
		<script src="js/create-elements-html.js"></script>

		<!-- GRAPHIC FUNCTIONS -->
		<script src="js/graphic-functions.js"></script>

		<!-- FILTER FUNCTIONS -->
		<script src="js/filter-columns-functions.js"></script>

		<!-- DATABASE FUNCTIONS -->
		<script src="js/database-functions.js"></script>

		<!-- PERSONALIZED FUNCTIONS -->
		<script src="js/personalized-functions.js"></script>

		<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.1/css/bootstrap-datepicker.min.css" type="text/css">
		<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.1/js/bootstrap-datepicker.min.js"></script>
    	<script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.5.1/locales/bootstrap-datepicker.pt-BR.min.js"></script>

	  	<script>  
		  	/* function to use language based on translate file */
			function show(x){
		  		document.write(x);
		  	}

		  	function changeField(x,y){
		  		console.log('teste');
		  	}
	  	</script>
	</head>
	<body>

		<!-- ESPAÇO PARA O MENU DO SISTEMA -->
		<div class="row">
			<h2 align="center">MENU</h2>
		</div>
		<!------------------------------------>

		<div class="row">
			<div id="datalists">
				<datalist id="datalist-columns-personalize"></datalist>
			</div>
			<!-- plot id -->
			<input id="id-plot" hidden></input>

		  	<!-- left column -->
		  	<div class="col-xs-2">
		  		<!-- part 1 -->
		  		<div class="row">
					<div class="col-xs-12">
		  				<button id="generate-new" type="button" class="btn btn-primary btn-block"><script>show(NEW)</script></button>
		  			</div>
				</div>
				<!-------------- -->
				<hr>
				<div class="row">
					<div class="col-xs-12">
						<label for="select-column"><script>show(COLUMN)</script>:</label>
					</div>
					<div class="col-xs-12">
						<select id="select-column" class="form-control"></select>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-xs-12">
				  		<label for="select-axis"><script>show(AXIS)</script>:</label>
					</div>
					<div class="col-xs-12">
							<select id="select-axis" class="form-control">
								<option value="axis-y"><script>show(AXIS_Y)</script></option>
						    <option value="axis-x"><script>show(AXIS_X)</script></option>
						</select>						
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-xs-12">	
						<input type="checkbox" id="check-personalized">
						 <label for="checkbox"><script>show(PERSONALIZED)</script></label>
					</div>
				</div>
				<br>		
				<div class="row" id='div-input-personalized' hidden>
					<div class="col-xs-12">	
						<div class="form-group">
						  <input type="text" class="form-control" id="input-personalized" list="datalist-columns-personalize">
						</div>
					</div>		
				</div>		
				<br>
				<div class="row">
					<div class="col-xs-12">	 			
						<button id="add-column" type="button" class="btn btn-primary btn-block"><script>show(ADD)</script></button>
					</div>
				</div>
				<hr>
		  	</div>
		  	<!----------------->

		  	<!-- center column -->
		  	<div class="col-xs-8">
		  		<div class="row">
		  			<div class="col-xs-2">
		  				<div class="form-group">
	  					  <label for="select-default-graphic"><script>show(DEFAULT_GRAPHIC)</script></label>
						  <select id="select-default-graphic" class="form-control">
						    <option value="column"><script>show(BAR)</script></option>
						    <option value="line"><script>show(LINE)</script></option>
						    <option value="pie"><script>show(PIE)</script></option>
						    <option value="table"><script>show(TABLE)</script></option>
						  </select>
						</div>
		  			</div>
		  			<div class="col-xs-10">
						<a href="#" id="title-plot" data-type="text" data-mode="inline" class="edit"></a>
		  			</div>
		  			<br>
		  			<br>
		  			<div class="col-xs-10">
						<a href="#" id="description-plot" data-type="textarea" data-mode="inline" class="edit"></a>
		  			</div>
		  			<br>
		  			<br>
		  		</div>
		  		<div class="row">
		  			<div class="col-xs-2">
		  				<div class="form-group">	
							<div id="columns-group-y" class="columns-group-y">
				  				<!-- space with the columns y -->
							</div>	
						</div>	
		  			</div>
		  			<div class="col-xs-10">
		  				<div class="row">
	  						<div class"col-xs-10">
	  							<div id="chart"></div>
	  						</div>
	  					</div>
	  					<div class="row">
	  						<div class"col-xs-10">
	  							<div id="chart-pie" hidden></div>
	  						</div>
	  					</div>
	  					<div class="row">
	  						<div class"col-xs-10">
	  							<div id="table" hidden></div>
	  						</div>
	  					</div>
	  					<br>
	  					<div class="row">
				  			<div class="col-xs-10">
				  				<div id="columns-group-x">
					  				<!-- space with the columns x -->
				  				</div>
							</div>
							<div class="col-xs-2 pull-right">
				  				<button id="save-chart-configuration" type="button" class="btn btn-primary btn-block"><script>show(SAVE)</script></button>
				  			</div>
				  		</div>
		  			</div>
		  		</div>
		  	</div>
		  	<!----------------->

		  	<!-- right column -->
		  	<div class="col-xs-2">
		  		<div class="row">
		  			<div class="col-xs-12">
		  				<h2 align="center"><script>show(PLOTS)</script></h2>
		  			</div>
		  		</div>
		  		<div class="row">
		  			<div class="col-xs-12 checkbox">
		  				<label><input type="checkbox" id="check-all-plots" value=""><script>show(CHECK_ALL)</script></label>
		  			</div>
		  		</div>
		  		<br>
		  		<div class="row">
		  			<div class="col-xs-12">
		  				<div id="checkbox-plots-group">
							<!-- space with all plots -->
		  				</div>
		  			</div>
		  		</div>
				<br>
				<button id="button-export" type="button" class="btn btn-primary btn-block"><script>show(EXPORT)</script></button>
				<div class="form-group">
				  <select class="form-control" id="sel6">
				    <option>Formato 1</option>
				  </select>
				</div>
		  	</div>
		  	<!--------------- -->
		</div>	
	</body>
</html>