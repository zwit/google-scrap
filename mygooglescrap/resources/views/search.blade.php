<html>
<head>
	<title>Laravel</title>

	<link href='//fonts.googleapis.com/css?family=Lato:100' rel='stylesheet' type='text/css'>

	<style>
		body {
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
			color: #B0BEC5;
			display: table;
			font-weight: 100;
			font-family: 'Lato';
		}

		.container {
			text-align: center;
			display: table-cell;
		}

		.content {
			text-align: center;
			display: inline-block;
			margin-top: 5%;
			width:	100%;
		}

		.title {
			font-size: 96px;
			margin-bottom: 40px;
		}

		.quote {
			font-size: 24px;
		}
	</style>

	{!! HTML::style('css/bootstrap.min.css'); !!}

</head>
<body>
<div class="container">
	<div class="content">
		{!!  Form::open(array('action' => 'SearchController@scrap')) !!}
		<div class="row">
			<div class="col-md-3">
		{!!  Form::text('search','',array('id'=>'','class'=>'','placeholder'=>'Enter something bright','class'=>'form-control')) !!}
			</div>
			<div class="col-md-1">
		{!!  Form::submit('Search', array('class'=>'btn btn-info')) !!}
			</div>
		</div>
		{!!  Form::close() !!}
	</div>
</div>
</body>
</html>