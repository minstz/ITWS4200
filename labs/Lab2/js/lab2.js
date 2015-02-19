$(document).ready(function() {
		getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayWeather);
    } else {
        $("#Location").html("Geolocation is not supported by this browser.");
    }
};
function displayWeather(position) {
	var lat = Math.round(position.coords.latitude);
	var lon = Math.round(position.coords.longitude);

	var url = "https://api.forecast.io/forecast/5c68aec8f97995476a0e392e6710be07/" + lat + "," + lon;


  $.getJSON(url, function(json) {
  	//json.currently stores a data object of the current weather
  	
  		var currentData = json.currently;
  		$("#container").append("<div class='row' id='summary'> " + currentData.summary + "</div>");
  		$("#container").append("<img src='./data/" + currentData.icon + ".png'/>");
  		$("#container").append("<div class='large-8 columns right'  id='temp'>" + Math.round(currentData.temperature) + "&#8457 </div>"); //Degrees Farhenheit symbol

  		if (currentData.precipProbability === 0) {
  			var after = "% </div>";
  		} else {
  			var after = "% chance of " + currentData.percipType + "</div>";
  		}
  		$("#container").append("<div class='row' id='chance'> Percipitation: " + currentData.precipProbability*100 + after);
  		$("#container").append("<div class='row' id='humidity'> Humidity: " + Math.round(currentData.humidity*100) + "% </div>");
  		$("#container").append("<div class='row'  id='windSpeed'>Wind Speed: " + currentData.windSpeed + " mph </div>");

  });

};

