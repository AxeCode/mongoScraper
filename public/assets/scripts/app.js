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
		        		"<p><a href='' class='btn btn-primary' role='button'>Button</a> <a href='' class='btn btn-default' role='button'>Button</a></p>" +
		      				"</div></div>"
				)
				count++;
			}
		});
	});
});

