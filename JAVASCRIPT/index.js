let myRow = document.getElementById("myRow");
let myRowPlus = document.getElementById('myRowPlus');
let myRowNext = document.getElementById('myRowNext');
let searchBar = document.getElementById('searchBar');
let result = [];
let resultplus = [];
let resultNext = [];
let nonTimeOut;

// searchBar input 
searchBar.addEventListener('input', () => {
    clearTimeout(nonTimeOut);
    nonTimeOut = setTimeout(() => {
        let inputValue = searchBar.value;
        getWeather(inputValue);
        getWeatherPlus(inputValue);
        getWeatherNext(inputValue);
    }, 300)
});

// Calendar 
function getCurrentDay() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    const currentDayNumber = currentDate.getDate();
    const currentDayIndex = currentDate.getDay();
    const currentDay = daysOfWeek[currentDayIndex];
    const tomorrowDay = daysOfWeek[(currentDayIndex + 1) % 7];
    const afterTomorrowDay = daysOfWeek[(currentDayIndex + 2) % 7];
    const currentMonthIndex = currentDate.getMonth();
    const currentMonth = months[currentMonthIndex];
    return { currentDay, tomorrowDay, afterTomorrowDay, currentMonth, currentDayNumber };
}

// First Day
async function getWeather(location) {
    try {
        var res = await fetch(`https://api.weatherapi.com/v1/current.json?key=35d0a5f27779406e875180440240304&q=${location}`);
        var data = await res.json();
        result = [data];
        console.log(data);
        displayWeather();
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

// Display first day 
getWeather('cairo');
function displayWeather() {
    const { currentDay, currentMonth, currentDayNumber } = getCurrentDay();
    if (!result) {
        console.error('error');
        return;
    }
    var box = '';
    for (let i = 0; i < result.length; i++) {
        box += `
        <div class="bg-transparent text-white py-1 d-flex justify-content-between">
            <p class="mt-3 ps-2">${currentDay}</p>
            <p class="mt-3 pe-2">${currentDayNumber} ${currentMonth}</p>
        </div>
        <div class="inner p-4">
            <h5 class="text-white">${result[i].location.name}</h5>
            <div class="d-flex">
                <div class="degree">
                    <div class="num position-relative text-white">${result[i].current.temp_c}<span>o</span>C</div>
                </div>
                <div class="w-100 pt-4 ps-4"><img src="http://${result[i].current.condition.icon}" alt="" class="w-100 pt-3"></div>
            </div>
            <div>
                <p style="color: #009ad8;">${result[i].current.condition.text}</p>
            </div>
            <div class="icons d-flex">
                <div class="icon1 d-flex me-3">
                    <div class="icon-img"><img src="pics/icon-umberella.png" alt="" class="w-100 pe-2"></div>
                    <p>${result[i].current.wind_mph}%</p>
                </div>
                <div class="icon1 d-flex me-3">
                    <div class="icon-img"><img src="pics/icon-wind.png" alt="" class="w-100 pe-2"></div>
                    <p>${result[i].current.wind_kph}/h</p>
                </div>
                <div class="icon1 d-flex">
                    <div class="icon-img"><img src="pics/icon-compass.png" alt="" class="w-100 pe-2"></div>
                    <p>${result[i].current.wind_dir}</p>
                </div>
            </div>
        </div>
        `;
    }
    myRow.innerHTML = box;
}

// Second Day
async function getWeatherPlus(location) {
    try {
        var res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=35d0a5f27779406e875180440240304&q=${location}&days=2`);
        var dataPlus = await res.json();
        resultplus = [dataPlus];
        console.log(dataPlus);
        displayWeatherPlus();
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}
getWeatherPlus('cairo');

// Display second day 
function displayWeatherPlus() {
    const { tomorrowDay } = getCurrentDay();
    if (!resultplus) {
        console.error('error');
        return;
    }
    var boxPlus = '';
    for (let i = 0; i < resultplus.length; i++) {
        boxPlus += `
            <div class="bg-transparent text-white p-2 text-center">
                <h5 class="mt-3">${tomorrowDay}</h5>
            </div>
            <div class="inner d-flex flex-column pt-5 justify-content-center align-items-center">
                <div><img src="http://${resultplus[i].forecast.forecastday[1].day.condition.icon}" alt=""></div>
                <p class="text-white" style="font-size: 24px;font-weight: 700;">${resultplus[i].forecast.forecastday[1].day.avgtemp_c}<span class="small-span">o</span>C</p>
                <p style="font-size: 16px;color: #BFC1C8;">${resultplus[i].forecast.forecastday[1].day.mintemp_c}<span class="small-span">o</span></p>
                <p style="color: #009ad8;">${resultplus[i].forecast.forecastday[1].day.condition.text}</p>
            </div>
        `;
    }
    myRowPlus.innerHTML = boxPlus;
}

// Third Day
async function getWeatherNext(location) {
    try {
        var res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=35d0a5f27779406e875180440240304&q=${location}&days=3`);
        var dataNext = await res.json();
        resultNext = [dataNext];
        console.log(dataNext);
        displayWeatherNext();
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}
getWeatherNext('cairo');

// Display third day 
function displayWeatherNext() {
    const { afterTomorrowDay } = getCurrentDay();
    if (!resultNext) {
        console.error('Error');
        return;
    }
    var box = '';
    for (let i = 0; i < resultNext.length; i++) {
        box += `
            <div class="bg-transparent text-white p-2 text-center">
                <h5 class="mt-3">${afterTomorrowDay}</h5>
            </div>
            <div class="inner d-flex flex-column pt-5 justify-content-center align-items-center">
                <div><img src="http://${resultNext[i].forecast.forecastday[2].day.condition.icon}" alt=""></div>
                <p class="text-white" style="font-size: 24px;font-weight: 700;">${resultNext[i].forecast.forecastday[2].day.maxtemp_c}<span class="small-span">o</span>C</p>
                <p style="font-size: 16px;color: #BFC1C8;">${resultNext[i].forecast.forecastday[2].day.mintemp_c}<span class="small-span">o</span></p>
                <p style="color: #009ad8;">${resultNext[i].forecast.forecastday[2].day.condition.text}</p>
            </div>
        `;
    }
    myRowNext.innerHTML = box;
}
