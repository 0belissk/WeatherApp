var searchInput = 'search_input';
const searchId = document.getElementById('search_input');
const forecast = document.getElementById('showcase');
const form = document.getElementById('form__group');
const card = document.querySelector('#main');
let img = document.getElementById('img');
let h1Img = document.getElementById('h1Img');
const sky = document.getElementById('sky');

$(document).ready(function () {
    
    
    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
        types: ['geocode'],
    });
	
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var near_place = autocomplete.getPlace();
        var arrayLength = near_place.address_components.length;
        const city = near_place.address_components[0].long_name;
        const state = near_place.address_components[arrayLength-2].long_name;
        document.getElementById('loc_lat').value = near_place.geometry.location.lat();
        document.getElementById('loc_long').value = near_place.geometry.location.lng();
        document.getElementById('latitude_view').innerHTML = near_place.geometry.location.lat();
        document.getElementById('longitude_view').innerHTML = near_place.geometry.location.lng();
        fetchData(city, state);
        searchId.value  = '';
    });
});

function fetchData(city, state) {
    forecast.innerHTML = '';
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=6107145dc32f4017b74221504231507&q=${city}, ${state}&days=7&aqi=no&alerts=no`)
        .then((res) => res.json())
        .then((data) => {
            storeData(data);
        });

    
}

function storeData(data) {
    data.forecast.forecastday.forEach(createSevenDay);
    createCurrent(data);
    locationDisplay(data)
    
    
}

function createCurrent(data) {
    const w = window.innerWidth;
    const conditions = data.current.condition.text.toLowerCase();
    const dayNight = data.current.is_day;
    if(dayNight === 1) {
        //if day display conditions ex. rain, cloudy...
        if(conditions.includes("thunder")) {
            img.src = "thundern.jpg";
        } else if (!(conditions.includes("thunder")) && conditions.includes("rain")) {
            img.src = "raina.jpg";
        } else if (conditions.includes("partly cloudy")) {
            img.src = "clouds.jpg";
        } else if (conditions.includes("sunny") || conditions.includes("clear")) {
            img.src = "sunny2.jpg";
        } else {
            console.log('idk');
        }
    } else {
        if(w < 500) {
            img.src = "stars.jpg"
            img.style.height = "2800px";
        } else if (w > 800 && w < 1080) {
            img.src = "stars.jpg";
            img.style.height = "2000px";
        } else {
            img.src = "night.jpg";
            img.style.height = "120vh";
            
        }

        
        
        
    } 

    
    

    

    
}

function createSevenDay(data) {
    const tempHigh = data.day.maxtemp_f;
    const tempLow = data.day.mintemp_f;
    const precip = data.day.totalprecip_in;
    const humidity = data.day.avghumidity;
    const conditionDay = data.day.condition.text;
    const conditions = data.day.condition.text.toLowerCase();
    const day = document.createElement('main');
    const date = data.date;
    const a = data.date;
    const currentDay = a.substring(8,10);
    const n = a.substring(5,7);
    const monthInt = parseInt(n)-1;
    let month = '';

    switch (monthInt) {
        case 0: 
            month = 'January';
            break;
        case 1:
            month = 'Febuary';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5: 
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8: 
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10: 
            month = 'November'
            break;
        case 11:
            month = 'December';
            break;
    }


    day.innerHTML = 
   
    `<main id="main">
    
    <section class="sky" id="sky">
    
    
</section>
<section class="content">
    <p class="date">${month}, ${currentDay}</p>
    <h1 class="contenth1">${tempHigh}</h1>
    <h3>${conditionDay}</h3>

    <div class="details">
        <div>
            <p class="value">${tempLow}</p>
            <p class="label">Minimum</p>
        </div>
        <div>
            <p class="value">${tempHigh};</p>
            <p class="label">Maximum</p>
        </div>
        <div>
            <p class="value">${precip}</p>
            <p class="label">Precipitation</p>
        </div>
        <div>
            <p class="value">${humidity}</p>
            <p class="label">Humidity</p>
        </div>
    </div>
</section>
</main>`;

    

    forecast.appendChild(day);
    forecast.classList.add('hi');
    day.classList.add('space');
    console.log(tempHigh);


    
    
    
    
    

}



function locationDisplay(data) {
    const h1 = document.getElementById('locationh1');
    h1.innerHTML= '';
    const state = data.location.name;
    const region = data.location.region;
    const location = document.createElement('h1');
    
    location.innerHTML = 
    `<h1>${state}, ${region}</h1>`;
    h1.appendChild(location);
    location.classList.add('location');

    const temp = data.current.temp_f;
    const precip = data.current.precip_in;
    const humidity = data.current.humidity;
    const uv = data.current.uv;
    const displayDiv = document.getElementById('currentDisplay');
    const a = data.current.last_updated;
    const day = a.substring(8,10);
    const c = a.substring(11,13);
    let hour = parseInt(c);
    const minutes = a.substring(14,16);
    console.log(minutes);
    const n = a.substring(6,7);
    const monthInt = parseInt(n)-1;
    let time = '';

    if (hour > 12) {
        hour -= 12;
        time = 'pm';
    } else {
        time = 'am';
    }
    
    let month = '';

    switch (monthInt) {
        case 0: 
            month = 'January';
            break;
        case 1:
            month = 'Febuary';
            break;
        case 2:
            month = 'March';
            break;
        case 3:
            month = 'April';
            break;
        case 4:
            month = 'May';
            break;
        case 5: 
            month = 'June';
            break;
        case 6:
            month = 'July';
            break;
        case 7:
            month = 'August';
            break;
        case 8: 
            month = 'September';
            break;
        case 9:
            month = 'October';
            break;
        case 10: 
            month = 'November'
            break;
        case 11:
            month = 'December';
            break;
    }

    
    

    

    
    displayDiv.innerHTML = '';
    const currentDiv = document.createElement('h1');
    currentDiv.innerHTML =
    `
    <div class="spaceBetween">
        <div class="divT">
            <p class="currentp">Current Weather: </p>
            <h1 class="temph1">${temp}</h1>
            <div class="ptags">
                <p>Precipitation: ${precip}</p>
                <p>Humidity: ${humidity}%</p>
                <p>UV: ${uv}</p>
            </div>
        <div>
        <div class="w">
            <p>${month} ${day}<p>
            <p>${hour}:${minutes} ${time}</p>
        </div>
    </div>  
    
    
    `;
    

    displayDiv.appendChild(currentDiv);
    currentDiv.classList.add('currentH1');
    displayDiv.classList.add('currentDisplay');

    const conditions = data.current.condition.text.toLowerCase();

    const currentDisplayDiv = document.getElementById('currentDisplay');
    currentDisplayDiv.style.top = "38vh";

    if(conditions.includes("thunder")) {
        h1Img.src = '389.png';
    } else if (!(conditions.includes("thunder")) && conditions.includes("rain")) {
        h1Img.src = '308.png';

    } else if (conditions.includes("partly cloudy")) {
        h1Img.src = '116.png';
    } else if (conditions.includes("sunny") || conditions.includes("clear")) {
        h1Img.src = '113.png';
    } else {
        console.log('idk');
    }

    if(data.current.is_day === 0) {
        h1Img.src = "119.png";
    }
    
    
}

function details() {
    console.log('hi');
    const day = document.createElement('div');
    day.innerHTML = 'hi';
    form.appendChild(day);
}




