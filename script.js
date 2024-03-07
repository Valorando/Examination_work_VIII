const apiKey = 'f0516ee12b3f411cc16e0c27e4b084ca';


function WeatherInCurrentLocation() {
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const weatherDescription = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1); // Преобразуем первую букву в заглавную
                const temperature = Math.round(data.main.temp);
                const feelsLikeTemperature = Math.round(data.main.feels_like);
                const weatherIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

                const sunrise = new Date(data.sys.sunrise * 1000);
                const sunset = new Date(data.sys.sunset * 1000);
                const dayDuration = new Date((data.sys.sunset - data.sys.sunrise) * 1000);

                const iconElement = document.createElement('img');
                iconElement.src = weatherIcon;
                iconElement.style.width = '64px';
                const weatherElement = document.createElement('div');
                weatherElement.textContent = `${weatherDescription}`;
                weatherElement.style.fontSize = '18px';

                const temperatureElement = document.createElement('div');
                temperatureElement.textContent = `${temperature}°C`;
                temperatureElement.style.fontSize = '45px';
                const feelsLikeTemperatureElement = document.createElement('div');
                feelsLikeTemperatureElement.textContent = `Real Feel: ${feelsLikeTemperature}°C`;
                feelsLikeTemperatureElement.style.fontSize = '14px';

                const sunriseElement = document.createElement('div');
                sunriseElement.textContent = `Sunrise: ${sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                const sunsetElement = document.createElement('div');
                sunsetElement.textContent = `Sunset: ${sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                const dayDurationElement = document.createElement('div');
                dayDurationElement.textContent = `Duration: ${dayDuration.getHours()}h ${dayDuration.getMinutes()}m`;

                const weatherContainer = document.getElementById('weather');
                weatherContainer.appendChild(iconElement);
                weatherContainer.appendChild(weatherElement);

                const temperatureContainer = document.getElementById('temperature');
                temperatureContainer.appendChild(temperatureElement);
                temperatureContainer.appendChild(feelsLikeTemperatureElement);

                const dayTimeContainer = document.getElementById('day_time');
                dayTimeContainer.appendChild(sunriseElement);
                dayTimeContainer.appendChild(sunsetElement);
                dayTimeContainer.appendChild(dayDurationElement);

                const currentDate = new Date();
                const dateContainer = document.getElementById('date');
                dateContainer.textContent = currentDate.toDateString();

                HoursForTables();
                WeatherTableOne(latitude, longitude);
                WeatherTableTwo(latitude, longitude);
                WeatherForNearbyCities(latitude, longitude);
                WeatherForecast(latitude, longitude);

                var day1 = document.getElementById('day1');
                day1.addEventListener('click', function () {
                    WeatherTableTwo(latitude, longitude);
                });

                var day2 = document.getElementById('day2');
                day2.addEventListener('click', function () {
                    OneAhead(latitude, longitude);
                });

                var day3 = document.getElementById('day3');
                day3.addEventListener('click', function () {
                    TwoAhead(latitude, longitude);
                });

                var day4 = document.getElementById('day4');
                day4.addEventListener('click', function () {
                    ThreeAhead(latitude, longitude);
                });

                var day5 = document.getElementById('day5');
                day5.addEventListener('click', function () {
                    FourAhead(latitude, longitude);
                });

            })
            .catch(error => {
                handleWeatherError(error);
            });
    });
}

WeatherInCurrentLocation();




function WeatherInSpecifiedLocation() {
    const user_location = document.getElementById("city");
    const location = user_location.value;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const weatherDescription = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1); // Преобразуем первую букву в заглавную
            const temperature = Math.round(data.main.temp);
            const feelsLikeTemperature = Math.round(data.main.feels_like);
            const weatherIcon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

            const sunrise = new Date(data.sys.sunrise * 1000);
            const sunset = new Date(data.sys.sunset * 1000);
            const dayDuration = new Date((data.sys.sunset - data.sys.sunrise) * 1000);

            const weatherContainer = document.getElementById('weather');
            weatherContainer.innerHTML = '';
            const temperatureContainer = document.getElementById('temperature');
            temperatureContainer.innerHTML = '';
            const dayTimeContainer = document.getElementById('day_time');
            dayTimeContainer.innerHTML = '';

            const iconElement = document.createElement('img');
            iconElement.src = weatherIcon;
            iconElement.style.width = '64px';
            const weatherElement = document.createElement('div');
            weatherElement.textContent = `${weatherDescription}`;
            weatherElement.style.fontSize = '18px';

            const temperatureElement = document.createElement('div');
            temperatureElement.textContent = `${temperature}°C`;
            temperatureElement.style.fontSize = '45px';
            const feelsLikeTemperatureElement = document.createElement('div');
            feelsLikeTemperatureElement.textContent = `Real Feel: ${feelsLikeTemperature}°C`;
            feelsLikeTemperatureElement.style.fontSize = '14px';

            const sunriseElement = document.createElement('div');
            sunriseElement.textContent = `Sunrise: ${sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            const sunsetElement = document.createElement('div');
            sunsetElement.textContent = `Sunset: ${sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            const dayDurationElement = document.createElement('div');
            dayDurationElement.textContent = `Duration: ${dayDuration.getHours()}h ${dayDuration.getMinutes()}m`;

            weatherContainer.appendChild(iconElement);
            weatherContainer.appendChild(weatherElement);

            temperatureContainer.appendChild(temperatureElement);
            temperatureContainer.appendChild(feelsLikeTemperatureElement);

            dayTimeContainer.appendChild(sunriseElement);
            dayTimeContainer.appendChild(sunsetElement);
            dayTimeContainer.appendChild(dayDurationElement);

            const currentDate = new Date();
            const dateContainer = document.getElementById('date');
            dateContainer.textContent = currentDate.toDateString();

            HoursForTables();
            WeatherTableOne(data.coord.lat, data.coord.lon);
            WeatherTableTwo(data.coord.lat, data.coord.lon);
            WeatherForNearbyCities(data.coord.lat, data.coord.lon);
            WeatherForecast(data.coord.lat, data.coord.lon);

            var day1 = document.getElementById('day1');
            day1.addEventListener('click', function() {
                WeatherTableTwo(data.coord.lat, data.coord.lon);
            });

            var day2 = document.getElementById('day2');
            day2.addEventListener('click', function() {
                OneAhead(data.coord.lat, data.coord.lon);
            });

            var day3 = document.getElementById('day3');
            day3.addEventListener('click', function() {
                TwoAhead(data.coord.lat, data.coord.lon);
            });

            var day4 = document.getElementById('day4');
            day4.addEventListener('click', function() {
                ThreeAhead(data.coord.lat, data.coord.lon);
            });

            var day5 = document.getElementById('day5');
            day5.addEventListener('click', function() {
                FourAhead(data.coord.lat, data.coord.lon);
            });

        })
        .catch(error => {
            handleWeatherError(error);
        });
}



function HoursForTables()
{
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const roundedHour = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentHour, 0, 0);
    
    const nextHour = new Date(roundedHour);
    nextHour.setHours(nextHour.getHours() + 1);
    
    const secondNextHour = new Date(nextHour);
    secondNextHour.setHours(secondNextHour.getHours() + 1);
    
    const thirdNextHour = new Date(secondNextHour);
    thirdNextHour.setHours(thirdNextHour.getHours() + 1);
    
    const fourthNextHour = new Date(thirdNextHour.getTime());
    fourthNextHour.setHours(fourthNextHour.getHours() + 1);
    
    const sixthNextHour = new Date(fourthNextHour.getTime()); 
    sixthNextHour.setHours(sixthNextHour.getHours() + 1);
    
    const cells = [
        { id: 't1', time: roundedHour },
        { id: 't2', time: nextHour },
        { id: 't3', time: secondNextHour },
        { id: 't4', time: thirdNextHour },
        { id: 't5', time: fourthNextHour },
        { id: 't6', time: sixthNextHour }
    ];

    cells.forEach(cell => {
        const formattedTime = cell.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const table1Cell = document.querySelector(`#weather_table #${cell.id}`);
        const table2Cell = document.querySelector(`#weather_table2 #${cell.id}`);
        table1Cell.textContent = formattedTime;
        table2Cell.textContent = formattedTime;
    });
}



function WeatherTableOne(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                for (let i = 1; i <= 6; i++) {
                    const nextHour = new Date(currentTime.getTime() + (i * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherIcon = `https://openweathermap.org/img/w/${nextHourWeather.weather[0].icon}.png`;
                        const iconCell = document.getElementById(`i${i}`);
                        iconCell.innerHTML = `<img src="${nextWeatherIcon}" alt="Weather Icon" width="50">`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWeatherDescription = capitalizeFirstLetter(currentHourWeather.weather[0].description);
                const f1Cell = document.getElementById('f1');
                f1Cell.textContent = currentWeatherDescription;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (i * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherDescription = capitalizeFirstLetter(nextHourWeather.weather[0].description);
                        const nextHourId = `f${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextWeatherDescription;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentTemperature = Math.round(currentHourWeather.main.temp) + '°';
                const temp1Cell = document.getElementById('temp1');
                temp1Cell.textContent = currentTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (i * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextTemperature = Math.round(nextHourWeather.main.temp) + '°';
                        const nextHourId = `temp${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentFeelsLikeTemperature = Math.round(currentHourWeather.main.feels_like) + '°';
                const r1Cell = document.getElementById('r1');
                r1Cell.textContent = currentFeelsLikeTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (i * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextFeelsLikeTemperature = Math.round(nextHourWeather.main.feels_like) + '°';
                        const nextHourId = `r${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextFeelsLikeTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWindSpeed = currentHourWeather.wind.speed;
                const currentWindDegree = currentHourWeather.wind.deg;
                const currentWindDirection = getWindDirection(currentWindDegree);
                const w1Cell = document.getElementById('w1');
                w1Cell.textContent = `${currentWindSpeed} ${currentWindDirection}`;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (i * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWindSpeed = nextHourWeather.wind.speed;
                        const nextWindDegree = nextHourWeather.wind.deg;
                        const nextWindDirection = getWindDirection(nextWindDegree);
                        const nextHourId = `w${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = `${nextWindSpeed} ${nextWindDirection}`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

    function getWindDirection(degree) {
        const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round((degree % 360) / 45);
        return sectors[index];
    }
}




function WeatherTableTwo(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                for (let i = 1; i <= 6; i++) {
                    const nextHour = new Date(currentTime.getTime() + (i * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherIcon = `https://openweathermap.org/img/w/${nextHourWeather.weather[0].icon}.png`;
                        const iconCell = document.getElementById(`it${i}`);
                        iconCell.innerHTML = `<img src="${nextWeatherIcon}" alt="Weather Icon" width="50">`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });


    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWeatherDescription = capitalizeFirstLetter(currentHourWeather.weather[0].description);
                const f1Cell = document.getElementById('ft1');
                f1Cell.textContent = currentWeatherDescription;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (i * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherDescription = capitalizeFirstLetter(nextHourWeather.weather[0].description);
                        const nextHourId = `ft${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextWeatherDescription;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentTemperature = Math.round(currentHourWeather.main.temp) + '°';
                const temp1Cell = document.getElementById('tempt1');
                temp1Cell.textContent = currentTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (i * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextTemperature = Math.round(nextHourWeather.main.temp) + '°';
                        const nextHourId = `tempt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentFeelsLikeTemperature = Math.round(currentHourWeather.main.feels_like) + '°';
                const r1Cell = document.getElementById('rt1');
                r1Cell.textContent = currentFeelsLikeTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (i * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextFeelsLikeTemperature = Math.round(nextHourWeather.main.feels_like) + '°';
                        const nextHourId = `rt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextFeelsLikeTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWindSpeed = currentHourWeather.wind.speed;
                const currentWindDegree = currentHourWeather.wind.deg;
                const currentWindDirection = getWindDirection(currentWindDegree);
                const w1Cell = document.getElementById('wt1');
                w1Cell.textContent = `${currentWindSpeed} ${currentWindDirection}`;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (i * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWindSpeed = nextHourWeather.wind.speed;
                        const nextWindDegree = nextHourWeather.wind.deg;
                        const nextWindDirection = getWindDirection(nextWindDegree);
                        const nextHourId = `wt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = `${nextWindSpeed} ${nextWindDirection}`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });


    function getWindDirection(degree) {
        const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round((degree % 360) / 45);
        return sectors[index];
    }
}




function WeatherForNearbyCities(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=4&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const nearbyCities = data.list;
            for (let i = 1; i <= 4; i++) {
                const cityName = nearbyCities[i - 1].name;
                const cityTemperature = Math.round(nearbyCities[i - 1].main.temp);
                const weatherIcon = `https://openweathermap.org/img/w/${nearbyCities[i - 1].weather[0].icon}.png`;

                const placeElement = document.getElementById(`place${i}`);
                placeElement.innerHTML = `<div>${cityName}</div><img src="${weatherIcon}" alt="Weather Icon"><div>${cityTemperature}°C</div>`;
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });
}



function WeatherForecast(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const forecast = data.list;
            const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            const day1Block = document.getElementById('day1');
            const day2Block = document.getElementById('day2');
            const day3Block = document.getElementById('day3');
            const day4Block = document.getElementById('day4');
            const day5Block = document.getElementById('day5');

            const dayBlocks = [day1Block, day2Block, day3Block, day4Block, day5Block];

            for (let i = 0; i < dayBlocks.length; i++) {
                const dayBlock = dayBlocks[i];
                const forecastData = forecast[i * 8];

                const date = new Date(forecastData.dt * 1000);
                const dayOfWeek = weekDays[date.getDay()];
                const month = date.toLocaleString('en', { month: 'long' });
                const dayOfMonth = date.getDate();

                const weatherIcon = `https://openweathermap.org/img/w/${forecastData.weather[0].icon}.png`;

                const temperature = Math.round(forecastData.main.temp);

                const weatherDescription = forecastData.weather[0].description.charAt(0).toUpperCase() + forecastData.weather[0].description.slice(1);

                dayBlock.innerHTML = `
                    <div><br><br>${dayOfWeek}</div>
                    <div>${month} ${dayOfMonth}</div>
                    <img src="${weatherIcon}" alt="Weather Icon">
                    <div>${temperature}°C</div>
                    <div>${weatherDescription}</div>
                `;
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });
}



function OneAhead(latitude, longitude)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                for (let i = 1; i <= 6; i++) {
                    const nextHour = new Date(currentTime.getTime() + (24 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherIcon = `https://openweathermap.org/img/w/${nextHourWeather.weather[0].icon}.png`;
                        const iconCell = document.getElementById(`it${i}`);
                        iconCell.innerHTML = `<img src="${nextWeatherIcon}" alt="Weather Icon" width="50">`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });


        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWeatherDescription = capitalizeFirstLetter(currentHourWeather.weather[0].description);
                const f1Cell = document.getElementById('ft1');
                f1Cell.textContent = currentWeatherDescription;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (24 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherDescription = capitalizeFirstLetter(nextHourWeather.weather[0].description);
                        const nextHourId = `ft${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextWeatherDescription;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });
        
        
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }


        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentTemperature = Math.round(currentHourWeather.main.temp) + '°';
                const temp1Cell = document.getElementById('tempt1');
                temp1Cell.textContent = currentTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (24 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextTemperature = Math.round(nextHourWeather.main.temp) + '°';
                        const nextHourId = `tempt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentFeelsLikeTemperature = Math.round(currentHourWeather.main.feels_like) + '°';
                const r1Cell = document.getElementById('rt1');
                r1Cell.textContent = currentFeelsLikeTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (24 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextFeelsLikeTemperature = Math.round(nextHourWeather.main.feels_like) + '°';
                        const nextHourId = `rt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextFeelsLikeTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWindSpeed = currentHourWeather.wind.speed;
                const currentWindDegree = currentHourWeather.wind.deg;
                const currentWindDirection = getWindDirection(currentWindDegree);
                const w1Cell = document.getElementById('wt1');
                w1Cell.textContent = `${currentWindSpeed} ${currentWindDirection}`;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (24 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWindSpeed = nextHourWeather.wind.speed;
                        const nextWindDegree = nextHourWeather.wind.deg;
                        const nextWindDirection = getWindDirection(nextWindDegree);
                        const nextHourId = `wt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = `${nextWindSpeed} ${nextWindDirection}`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });


        function getWindDirection(degree) {
            const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            const index = Math.round((degree % 360) / 45);
            return sectors[index];
        }
}

function TwoAhead(latitude, longitude)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                for (let i = 1; i <= 6; i++) {
                    const nextHour = new Date(currentTime.getTime() + (48 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherIcon = `https://openweathermap.org/img/w/${nextHourWeather.weather[0].icon}.png`;
                        const iconCell = document.getElementById(`it${i}`);
                        iconCell.innerHTML = `<img src="${nextWeatherIcon}" alt="Weather Icon" width="50">`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });


        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWeatherDescription = capitalizeFirstLetter(currentHourWeather.weather[0].description);
                const f1Cell = document.getElementById('ft1');
                f1Cell.textContent = currentWeatherDescription;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (48 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherDescription = capitalizeFirstLetter(nextHourWeather.weather[0].description);
                        const nextHourId = `ft${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextWeatherDescription;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });
        
        
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }


        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentTemperature = Math.round(currentHourWeather.main.temp) + '°';
                const temp1Cell = document.getElementById('tempt1');
                temp1Cell.textContent = currentTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (48 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextTemperature = Math.round(nextHourWeather.main.temp) + '°';
                        const nextHourId = `tempt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentFeelsLikeTemperature = Math.round(currentHourWeather.main.feels_like) + '°';
                const r1Cell = document.getElementById('rt1');
                r1Cell.textContent = currentFeelsLikeTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (48 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextFeelsLikeTemperature = Math.round(nextHourWeather.main.feels_like) + '°';
                        const nextHourId = `rt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextFeelsLikeTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWindSpeed = currentHourWeather.wind.speed;
                const currentWindDegree = currentHourWeather.wind.deg;
                const currentWindDirection = getWindDirection(currentWindDegree);
                const w1Cell = document.getElementById('wt1');
                w1Cell.textContent = `${currentWindSpeed} ${currentWindDirection}`;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (48 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWindSpeed = nextHourWeather.wind.speed;
                        const nextWindDegree = nextHourWeather.wind.deg;
                        const nextWindDirection = getWindDirection(nextWindDegree);
                        const nextHourId = `wt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = `${nextWindSpeed} ${nextWindDirection}`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });


        function getWindDirection(degree) {
            const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            const index = Math.round((degree % 360) / 45);
            return sectors[index];
        }
}


function ThreeAhead(latitude, longitude)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                for (let i = 1; i <= 6; i++) {
                    const nextHour = new Date(currentTime.getTime() + (72 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherIcon = `https://openweathermap.org/img/w/${nextHourWeather.weather[0].icon}.png`;
                        const iconCell = document.getElementById(`it${i}`);
                        iconCell.innerHTML = `<img src="${nextWeatherIcon}" alt="Weather Icon" width="50">`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });


        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWeatherDescription = capitalizeFirstLetter(currentHourWeather.weather[0].description);
                const f1Cell = document.getElementById('ft1');
                f1Cell.textContent = currentWeatherDescription;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (72 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherDescription = capitalizeFirstLetter(nextHourWeather.weather[0].description);
                        const nextHourId = `ft${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextWeatherDescription;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });
        
        
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }


        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentTemperature = Math.round(currentHourWeather.main.temp) + '°';
                const temp1Cell = document.getElementById('tempt1');
                temp1Cell.textContent = currentTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (72 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextTemperature = Math.round(nextHourWeather.main.temp) + '°';
                        const nextHourId = `tempt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentFeelsLikeTemperature = Math.round(currentHourWeather.main.feels_like) + '°';
                const r1Cell = document.getElementById('rt1');
                r1Cell.textContent = currentFeelsLikeTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (72 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextFeelsLikeTemperature = Math.round(nextHourWeather.main.feels_like) + '°';
                        const nextHourId = `rt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextFeelsLikeTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWindSpeed = currentHourWeather.wind.speed;
                const currentWindDegree = currentHourWeather.wind.deg;
                const currentWindDirection = getWindDirection(currentWindDegree);
                const w1Cell = document.getElementById('wt1');
                w1Cell.textContent = `${currentWindSpeed} ${currentWindDirection}`;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (72 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWindSpeed = nextHourWeather.wind.speed;
                        const nextWindDegree = nextHourWeather.wind.deg;
                        const nextWindDirection = getWindDirection(nextWindDegree);
                        const nextHourId = `wt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = `${nextWindSpeed} ${nextWindDirection}`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });


        function getWindDirection(degree) {
            const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            const index = Math.round((degree % 360) / 45);
            return sectors[index];
        }
}


function FourAhead(latitude, longitude)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                for (let i = 1; i <= 6; i++) {
                    const nextHour = new Date(currentTime.getTime() + (96 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherIcon = `https://openweathermap.org/img/w/${nextHourWeather.weather[0].icon}.png`;
                        const iconCell = document.getElementById(`it${i}`);
                        iconCell.innerHTML = `<img src="${nextWeatherIcon}" alt="Weather Icon" width="50">`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });


        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWeatherDescription = capitalizeFirstLetter(currentHourWeather.weather[0].description);
                const f1Cell = document.getElementById('ft1');
                f1Cell.textContent = currentWeatherDescription;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (96 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWeatherDescription = capitalizeFirstLetter(nextHourWeather.weather[0].description);
                        const nextHourId = `ft${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextWeatherDescription;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });
        
        
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }


        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentTemperature = Math.round(currentHourWeather.main.temp) + '°';
                const temp1Cell = document.getElementById('tempt1');
                temp1Cell.textContent = currentTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (96 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextTemperature = Math.round(nextHourWeather.main.temp) + '°';
                        const nextHourId = `tempt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentFeelsLikeTemperature = Math.round(currentHourWeather.main.feels_like) + '°';
                const r1Cell = document.getElementById('rt1');
                r1Cell.textContent = currentFeelsLikeTemperature;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (96 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextFeelsLikeTemperature = Math.round(nextHourWeather.main.feels_like) + '°';
                        const nextHourId = `rt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = nextFeelsLikeTemperature;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const currentTime = new Date();
            const currentHourWeather = data.list.find(item => new Date(item.dt_txt) > currentTime);

            if (currentHourWeather) {
                const currentWindSpeed = currentHourWeather.wind.speed;
                const currentWindDegree = currentHourWeather.wind.deg;
                const currentWindDirection = getWindDirection(currentWindDegree);
                const w1Cell = document.getElementById('wt1');
                w1Cell.textContent = `${currentWindSpeed} ${currentWindDirection}`;

                for (let i = 1; i <= 5; i++) {
                    const nextHour = new Date(currentTime.getTime() + (96 * 3600 * 1000));
                    const nextHourWeather = data.list.find(item => new Date(item.dt_txt) > nextHour);

                    if (nextHourWeather) {
                        const nextWindSpeed = nextHourWeather.wind.speed;
                        const nextWindDegree = nextHourWeather.wind.deg;
                        const nextWindDirection = getWindDirection(nextWindDegree);
                        const nextHourId = `wt${i + 1}`;
                        const nextHourCell = document.getElementById(nextHourId);
                        nextHourCell.textContent = `${nextWindSpeed} ${nextWindDirection}`;
                    } else {
                        console.error(`Weather data not found for +${i} hour`);
                    }
                }
            } else {
                console.error('Weather data not found for the current hour');
            }
        })
        .catch(error => {
            handleWeatherError(error);
        });


        function getWindDirection(degree) {
            const sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
            const index = Math.round((degree % 360) / 45);
            return sectors[index];
        }
}




function handleWeatherError(error) {
    console.error('An error occurred while fetching weather data:', error);
    document.getElementById('today').style.pointerEvents = 'none'; 
    document.getElementById('fday').style.pointerEvents = 'none';
    document.getElementById('today_panel').style.display = 'none';
    document.getElementById('error_panel').style.display = 'block'; 
    document.getElementById('fday_panel').style.display = 'none';
    document.getElementById('error_panel').textContent = 'An error occurred while receiving weather data or the name of your location is incorrect. Please reload the page.'; 
}




