$(document).on('click', "#mainButton", function(){
	console.log('I work');

	$.ajax({
		url: '/scrape'
	}).done(function(){
		$.getJSON('/articles', function(data){
			console.log(data[1].img_url);
			var count = 1;
			for (var i =0; i < 30; i++){
				$("#articles").append(
					"<div class='individArticle' data-id=" + data[i]._id + "><img src='" + "'><h3>" + count + '. ' + data[i].title  +
					"</h3><p>" + data[i].author + "</p>" +
		        		"<p><a href='" + data[i].link + "' class='btn btn-primary' role='button'>Link</a> <a href='/articles/" + data[i]._id +"' class='btn btn-default' role='button' id='commentButton'>Comment</a></p>" +
		      				"</div>")
				count++;
			}
		});
	});
});

// whenever someone clicks a p tag
$(document).on('click', 'p', function(){
  // empty the notes from the note section
  // $('#notes').empty();
  // save the id from the p tag
  var thisId = $(this).attr('data-id');

  // now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
  })
    // with that done, add the note information to the page
    .done(function( data ) {
      console.log(data);
      // the title of the article
      $('#notes').append('<h2>' + data.title + '</h2>'); 
      // an input to enter a new title
      $('#notes').append('<input id="titleinput" name="title" >'); 
      // a textarea to add a new note body
      $('#notes').append('<textarea id="bodyinput" name="body"></textarea>'); 
      // a button to submit a new note, with the id of the article saved to it
      $('#notes').append('<button data-id="' + data._id + '" id="savenote">Save Note</button>');

      // if there's a note in the article
      if(data.note){
        // place the title of the note in the title input
        $('#titleinput').val(data.note.title);
        // place the body of the note in the body textarea
        $('#bodyinput').val(data.note.body);
      }
    });
});

// when you click the savenote button
$(document).on('click', '#savenote', function(){
  // grab the id associated with the article from the submit button
  var thisId = $(this).attr('data-id');

  // run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $('#titleinput').val(), // value taken from title input
      body: $('#bodyinput').val() // value taken from note textarea
    }
  })
    // with that done
    .done(function( data ) {
      // log the response
      console.log(data);
      // empty the notes section
      $('#notes').empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $('#titleinput').val("");
  $('#bodyinput').val("");
});

