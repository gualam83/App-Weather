document.addEventListener('DOMContentLoaded', function (event) {
  getWeatherData('bogota', 'tempBogota');
  getWeatherData('paris', 'tempParis');
  getWeatherData('paris', 'humidityParis', 'humidity');
  getWeatherData('paris', 'windParis', 'wind');  
  getWeatherData('lyon', 'tempLyon');
  getWeatherData('lyon', 'humidityLyon', 'humidity');
  getWeatherData('lyon', 'windLyon', 'wind');  
});

function getWeatherData(query, elementID, dataType) {

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&units=metric&meter/sec&appid=824ecdaef6bdad9628e5484d88089669';
  const urlZip = 'https://samples.openweathermap.org/data/2.5/forecast?zip=94040&appid=439d4b804bc8187953eb36d2a8c26a02';

  const api = new XMLHttpRequest();
  api.open('GET', url, true);
  api.send();

  api.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {

      let dates = JSON.parse(this.responseText);
      const iconurl = dates.weather[0].icon;      
      const dataElementID = document.getElementById(elementID);   

      dataElementID.innerHTML = (dates.main.temp).toFixed(0) + '°c';

      if (dataType === 'humidity') {
        dataElementID.innerHTML = (dates.main.humidity) + '%';
      }

      if (dataType === 'wind') {
        dataElementID.innerHTML = (dates.wind.speed)*3.6 .toFixed(0) + 'Km/h';
      }    

      if (iconurl !== '') {
        const iconElement = document.getElementById('icon-'+ query);
        iconElement.setAttribute('src', 'https://openweathermap.org/img/w/' + iconurl + '.png');
      }
      console.log(dates)
    }
  }
}