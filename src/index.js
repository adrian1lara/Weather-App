document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form')
    const cityInput = document.getElementById('city-input')
    const toggleUnit = document.getElementById('toggle-unit')
    let lastCity = 'Lima'

    let isCelsius = true

    async function getWeatherData(location) {
        
        const apiKey = 'f13a84b6cd7b43d8af904715230409'
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`

        try {
            const response = await fetch(url)
            
            if(!response.ok) {
                throw new Error(response.statusText)
            }   

            const weatherData = await response.json()

            console.log(weatherData)

            document.getElementById('city').textContent = `City: ${weatherData.location.name}, ${weatherData.location.country}`	

            document.getElementById('temperature')
            if(isCelsius) {
                document.getElementById('temperature').textContent = `${weatherData.current.temp_c}°C`
            } else {
                document.getElementById('temperature').textContent = `${weatherData.current.temp_f}°F`
            }

            document.getElementById('description').textContent = `${weatherData.current.condition.text}`

            document.getElementById('Humidity').textContent = `Humidity: ${weatherData.current.humidity}%`

            const img = document.querySelector('img')
            img.src = weatherData.current.condition.icon

            document.getElementById('Wind').textContent = `Wind: ${weatherData.current.wind_kph} km/h`

            if(isCelsius) {
                document.getElementById('FeelsLike').textContent = `Feels like: ${weatherData.current.feelslike_c}°C`
            } else {
                document.getElementById('FeelsLike').textContent = `Feels like: ${weatherData.current.feelslike_f}°F`
            }
            
        } catch(error) {
            console.log(error)
        }

    }

    async function updateWeatherData(city) {
        lastCity = city
        getWeatherData(lastCity)
    }

    updateWeatherData(lastCity)

    searchForm.addEventListener('submit', event => {
        event.preventDefault()

        const city = cityInput.value.trim()

        if(city === '') {
            return
        }
            
        updateWeatherData(city)
        
        cityInput.value = '';


    })

    toggleUnit.addEventListener('click', () => {
        isCelsius = !isCelsius
        getWeatherData(lastCity)
    })

})



