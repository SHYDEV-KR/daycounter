const dateForm = document.querySelector("#dateForm");
const dateInput = document.querySelector("#dateForm input");
const todayDate = document.querySelector("#todayDate");
const infoContainer = document.querySelector("#infoContainer");
let dayTextContainer = document.createElement("div");
dayTextContainer.classList.add("dayTextContainer")
dayTextContainer.classList.add("hidden")
let selectedDay = document.createElement("div");

infoContainer.appendChild(selectedDay);
infoContainer.appendChild(dayTextContainer);

function init() {
    printToday(getToday());
    dateForm.addEventListener("submit", handleSubmit);
}

function printToday(today) {
    todayDate.innerText = `오늘 : ${String(today.year)}-${String(today.month).padStart(2, 0)}-${String(today.day).padStart(2, 0)}`
}

function getToday() {
    const dateNow = new Date();
    const today = {};
    today['year'] = dateNow.getFullYear();
    today['month'] = dateNow.getMonth() + 1;
    today['day'] = dateNow.getDate();

    return today;
}


function showDayInfo(target, today) {
    const MAGIC_NUMBER = 86400000;
    const targetDate = new Date(`${String(target.year)}-${String(target.month).padStart(2,0)}-${String(target.day).padStart(2,0)}T00:00:00`);
    const todayDate = new Date(`${String(today.year)}-${String(today.month).padStart(2, 0)}-${String(today.day).padStart(2, 0)}T00:00:00`);
    const theDay = (targetDate - todayDate) / MAGIC_NUMBER;
    
    selectedDay.innerHTML = `
        <h3>선택한 날짜</h3>
        ${target.year}-${String(today.month).padStart(2, 0)}-${String(target.day).padStart(2, 0)}
        `;
    

    if (theDay > 0) {
        dayTextContainer.innerText = `D-${theDay}`;
        dayTextContainer.classList.remove("today");
        dayTextContainer.classList.remove("hidden");
    } else if (theDay < 0) {
        dayTextContainer.innerText = `D+${1 - theDay}`;
        dayTextContainer.classList.remove("today");
        dayTextContainer.classList.remove("hidden");
    } else {
        dayTextContainer.innerText = `오늘!`;
        dayTextContainer.classList.add("today");
        dayTextContainer.classList.remove("hidden");
    }
}


function handleSubmit(event) {
    event.preventDefault();
    const targetDate = dateInput.value;
    const target = {};
    target['year'] = parseInt(targetDate.substr(0, 4));
    target['month'] = parseInt(targetDate.substr(5, 2));
    target['day'] = parseInt(targetDate.substr(8, 2));

    showDayInfo(target, getToday());
}


init();