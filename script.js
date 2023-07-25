

const itemForm = document.getElementById('locationForm');
const updateWeatherbtn = document.getElementById('weatherupdatebtn');

function updateLocation() {
    let itemInput = document.getElementById('locationInput');
    const newLocation = itemInput.value;
    fetchData(newLocation);
    itemInput.value = '';
}

function fetchData(city, state) {
    
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=6107145dc32f4017b74221504231507&q=${city}, ${state}&days=7&aqi=no&alerts=no`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.current.temp_f);
        });

    
}


