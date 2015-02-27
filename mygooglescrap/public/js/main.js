jQuery( document ).ready( function( $ ) {

  var page;

  function generateData(data) {
    $('#results').html('');

    tmp = JSON.parse(data);
      $.each(tmp, function( index2, value ) {
        $('#results').append('<div class="rowres">');
        $('#results').append('<div class="rowtitle">' + value["rowtitle"] + '</div>');
        $('#results').append('<div class="rowhref">' + value["rowhref"] + '</div>');
        $('#results').append('<div class="rowdesc">' + value["rowdesc"] + '</div>');
        $('#results').append('</div>');
      });
  }

  function sendData(nbpage) {
    $('#warning-loader').hide();
    $('#ajax-loader').show();
    page = nbpage;

    $.ajax({
          type: "POST",
          url: $('#form-search').prop('action'),
          timeout: 10000,
          data: {
            "_token": $('#form-search').find('input[name=_token]').val(),
            "search": $('#search').val(),
            "page": page
          }
        }).done(function( data ) {
          generateData(data);

          $('#ajax-loader').hide();
          $('.buttons').show();
          $('#nbPage').html("Page " + page);
        }).fail(function() {
          $('#ajax-loader').hide();
          $('#warning-loader').show();
          $('.buttons').hide();
          $('#nbPage').html("Please retry");
          $('#results').html("");
        });
  }

  $( '#form-search' ).on( 'submit', function() {
    sendData(1);

    return false;
  } );

  $( '.first' ).on( 'click', function() {
    sendData(1);
  } );

  $( '.prev' ).on( 'click', function() {
    if (page > 1)
      sendData(page - 1);
  } );

  $( '.next' ).on( 'click', function() {
    sendData(page + 1);
  } );

} );