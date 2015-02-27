<html>
<head>
	<title>Laravel</title>

	<link href='//fonts.googleapis.com/css?family=Lato:100' rel='stylesheet' type='text/css'>
	{!! HTML::style('css/bootstrap.min.css'); !!}

	{!! HTML::script('js/jquery-2.1.3.min.js'); !!}

	<style>
		body {
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
			display: table;
			background-color: #F0F0F0;
			color: black;
			font-family: sans-serif;
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

		#results {
			text-align: left;
			margin-top: 30px;
			padding-left: 30px;
		}

		.rowres {
			float:left;
			clear: both;
			margin-top: 10px;
		}

		.rowtitle {
			float:left;
			clear: both;
			color: #1a0dab;
			font-size: 18px;
		}

		.rowhref {
			float:left;
			clear: both;
			color: #006621;
			font-size: 14px;
		}

		.rowdesc {
			float:left;
			clear: both;
			font-size: 12px;
		}

		.title {
			font-size: 96px;
			margin-bottom: 40px;
		}

		.quote {
			font-size: 24px;
		}
	</style>

	<script>
		jQuery( document ).ready( function( $ ) {

			var page;

			function generateData(data) {
				$('#results').html('');

				tmp = JSON.parse(data);
				$.each(tmp , function( index, obj ) {
					$.each(obj, function( index2, value ) {
						$('#results').append('<div class="rowres">');
						$('#results').append('<div class="rowtitle">' + value["rowtitle"] + '</div>');
						$('#results').append('<div class="rowhref">' + value["rowhref"] + '</div>');
						$('#results').append('<div class="rowdesc">' + value["rowdesc"] + '</div>');
						$('#results').append('</div>');
					});
				});
			}

			function sendData(nbpage) {
				$('#ajax-loader').show();

				page = nbpage;
				$('#nbPage').html("Page " + page);

				$.post(
						$( '#form-search' ).prop( 'action' ),
						{
							"_token": $( '#form-search' ).find( 'input[name=_token]' ).val(),
							"search": $( '#search' ).val(),
							"page": page
						},
						function( data ) {
							generateData(data);

							$('#ajax-loader').hide();
						},
						'json'
				);
			}

			$( '#form-search' ).on( 'submit', function() {
				sendData(1);

				return false;
			} );

			$( '#first' ).on( 'click', function() {
				sendData(1);
			} );

			$( '#prev' ).on( 'click', function() {
				if (page > 1)
					sendData(page - 1);
			} );

			$( '#next' ).on( 'click', function() {
				sendData(page + 1);
			} );

		} );
	</script>

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
		{!!  Form::submit('Search', array('class'=>'btn btn-info')) !!}
			</div>
			<div class="col-md-1" id="ajax-loader" style="display:none">
				{!! HTML::image('img/ajax-loader.gif') !!}
			</div>
		</div>
		{!!  Form::close() !!}
		<div class="row">
			<div class="col-md-2" id="nbPage">

			</div>
			<div class="col-md-2">
				{!! Form::button('Première Page', array('class'=>'btn btn-info', 'id'=>'first')) !!}
			</div>
			<div class="col-md-2">
				{!! Form::button('Page Précédente', array('class'=>'btn btn-info', 'id'=>'prev')) !!}
			</div>
			<div class="col-md-2">
				{!! Form::button('Page Suivante', array('class'=>'btn btn-info', 'id'=>'next')) !!}
			</div>
		</div>
		<div id="results">
			<?php if (isset($results)) {
				//$results = json_decode(json_encode($results), true);
				foreach ($results->{'results'} as $k => $v) {
					echo '<br/><br/><br/>title : '.$v->{'title'};
					echo '<br/>href : '.$v->{'href'};
					echo '<br/>description : '.$v->{'desc'};
				}
			} ?>
		</div>
	</div>

</div>
</body>
</html>