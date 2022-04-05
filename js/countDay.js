const dateForm = document.querySelector("#dateForm");
const dateInput = document.querySelector("#dateForm input");
const todayDate = document.querySelector("#todayDate");
const infoContainer = document.querySelector("#infoContainer");
let dayTextContainer = document.createElement("div");
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
    const targetDate = new Date(`${target.year}-${target.month}-${target.day}`);
    const todayDate = new Date(`${today.year}-${today.month}-${today.day}`);
    const theDay = (targetDate - todayDate) / MAGIC_NUMBER;
    

    if (theDay > 0) {
        dayTextContainer.innerText = `D-${theDay}`
    } else if (theDay < 0) {
        dayTextContainer.innerText = `D+${1-theDay}`
    } else {
        dayTextContainer.innerText = `오늘이네요🙂!!`
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