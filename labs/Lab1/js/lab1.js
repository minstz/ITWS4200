$(document).ready( function() {

	$.getJSON('./data/tweets.json', function(json) {
		$(json).each(function (num) {
			$("#tweetcol").append("<li class='tweets'>" + json[num].text + "</li>" );

			if (json[num].entities.hashtags[0] != undefined) {
				$(json[num].entities.hashtags).each( function (tag) {
					$("#hashtagcol").append("<li class='trends'> #" + json[num].entities.hashtags[tag].text + "</li>")	
				});
			};

		});
		cycleTweets();
		cycleTags();
	});

});

function cycleTweets() {
	$(".tweets").slideDown("slow"); //show the bottom element with a sliding motion
	
	$(".tweets:first-child").slideUp('slow', function() { //Slide up the top most list item
		var temp = $(".tweets:first-child"); //variable to hold first list item
		temp.appendTo("#tweetcol"); //append top list item to the bottom
	});
	$(".tweets").slice(6).hide(); //Hide all but the first 5 elements of the list
																//The 6th element is the element in transition
	
	setTimeout(cycleTweets, 3000); //after 3 seconds, call this function again
};

function cycleTags() {	//This function is identical in structure to the one above
	$(".trends").slideDown("slow");

	$(".trends:first-child").slideUp('slow', function() {
		var temp = $(".trends:first-child");
		temp.appendTo("#hashtagcol");
	});
	$(".trends").slice(6).hide(); 

	setTimeout(cycleTags, 5000);
};


  
