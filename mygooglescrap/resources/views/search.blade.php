<html>
<head>
	<title>Google Scrapper</title>

	{!! HTML::style('css/bootstrap.min.css'); !!}
	{!! HTML::style('css/main.css'); !!}
	{!! HTML::script('js/jquery-2.1.3.min.js'); !!}
	{!! HTML::script('js/main.js'); !!}

</head>
<body>
<div class="container">
	<div class="content">
		{!!  Form::open(array('action' => 'SearchController@scrap', 'id' => 'form-search')) !!}
		<div class="row">
			<div class="col-md-3">
		{!!  Form::text('search','',array('id'=>'search','class'=>'','placeholder'=>'Enter something bright','class'=>'form-control')) !!}
			</div>
			<div class="col-md-1">
		{!!  Form::submit('Rechercher', array('class'=>'btn btn-info')) !!}
			</div>
			<div class="col-md-2" id="ajax-loader" style="display:none;text-align:left">
				{!! HTML::image('img/ajax-loader.gif') !!}
			</div>
			<div class="col-md-2" id="warning-loader" style="display:none;text-align:left">
				{!! HTML::image('img/warning.png') !!}
				Erreur !
			</div>
		</div>
		{!!  Form::close() !!}
		<div class="row buttons" style="display:none">
			<div class="col-md-2" id="nbPage">

			</div>
			<div class="col-md-2">
				{!! Form::button('Première Page', array('class'=>'btn btn-info first')) !!}
			</div>
			<div class="col-md-2">
				{!! Form::button('Page Précédente', array('class'=>'btn btn-info prev')) !!}
			</div>
			<div class="col-md-2">
				{!! Form::button('Page Suivante', array('class'=>'btn btn-info next')) !!}
			</div>
		</div>
		<div id="results">
			<?php if (isset($results)) {
				foreach ($results->{'results'} as $k => $v) {
					echo '<br/><br/><br/>title : '.$v->{'title'};
					echo '<br/>href : '.$v->{'href'};
					echo '<br/>description : '.$v->{'desc'};
				}
			} ?>
		</div>
		<div class="row buttons" style="display:none">
			<div class="col-md-2" id="nbPage">

			</div>
			<div class="col-md-2">
				{!! Form::button('Première Page', array('class'=>'btn btn-info first')) !!}
			</div>
			<div class="col-md-2">
				{!! Form::button('Page Précédente', array('class'=>'btn btn-info prev')) !!}
			</div>
			<div class="col-md-2">
				{!! Form::button('Page Suivante', array('class'=>'btn btn-info next')) !!}
			</div>
		</div>
	</div>

</div>
</body>
</html>