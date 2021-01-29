const API = {
  key: "dc6a2220632ec5b7021b539c53b5c913",
  base: "https://api.openweathermap.org/data/2.5/weather",
};

const main = () => {
  document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-bar").value;
    getWeather(query);
  });
};

const getWeather = (query) => {
  fetchWeather(query).then((data) => {
    const {
      name: city,
      sys: { country: countryCode },
      main: { temp, temp_max: maxTemp, temp_min: minTemp },
      weather: [{ main: weather }],
    } = data;
    displayWeather({ city, countryCode, temp, weather, minTemp, maxTemp });
    displayDate();
  });
};

const fetchWeather = (query) => {
  return fetch(`${API.base}?q=${query}&appid=${API.key}&units=metric`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

const displayWeather = ({
  city,
  countryCode,
  temp,
  weather,
  minTemp,
  maxTemp,
}) => {
  document.getElementById("city").innerHTML = city;
  document.getElementById("country-code").innerHTML = countryCode;
  document.getElementById("temp").innerHTML = `${temp}°C`;
  document.getElementById("weather").innerHTML = weather;
  document.getElementById("min-temp").innerHTML = `${minTemp}°C`;
  document.getElementById("max-temp").innerHTML = `${maxTemp}°C`;
};

const displayDate = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  document.getElementById("date").innerHTML = `${day} ${date} ${month} ${year}`;
};
