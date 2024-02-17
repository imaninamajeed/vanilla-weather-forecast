// With event.preventDefault()
// It prevents the default form submission behavior
// Ensuring that the custom JavaScript code executes smoothly without triggering a page reload when the search form is submitted.

// Without event.preventDefault()
// The default form submission behavior is allowed
// Potentially causing the page to reload or navigate to a new page,
// which could disrupt the intended functionality of the web application, such as updating cityElement.innerHTML.
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Paris");

function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-form-input");
	searchCity(searchInput.value);
	// let cityElement = document.querySelector("#weather-app-city");
	// let inputValue = searchInput.value;
	// var capitalizedValue =
	// 	inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
	// cityElement.innerHTML = capitalizedValue;
}

function searchCity(city) {
	let apiKey = "b2a5adcct04b33178913oc335f405433";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
	axios.get(apiUrl).then(refreshWeather);
}

function refreshWeather(response) {
	let temperatureElement = document.querySelector("#weather-app-temperature");
	let cityElement = document.querySelector("#weather-app-city");
	let descriptionElement = document.querySelector("#description");
	let humidityElement = document.querySelector("#humidity");
	let windSpeedElement = document.querySelector("#wind-speed");
	let timeElement = document.querySelector("#time");
	let iconElement = document.querySelector("#weather-app-icon");

	let temperature = response.data.temperature.current;
	let date = new Date(response.data.time * 1000);

	temperatureElement.innerHTML = Math.round(temperature);
	cityElement.innerHTML = response.data.city;
	descriptionElement.innerHTML = response.data.condition.description;
	humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
	windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
	timeElement.innerHTML = formatDate(date);
	iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
}

function formatDate(date) {
	let min = date.getMinutes();
	let hr = date.getHours();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];

	// add zero for 01 until 09 mins (display purpose)
	if (min < 10) {
		min = `0${min}`;
	}

	return `${day} ${hr}:${min}`;
}
