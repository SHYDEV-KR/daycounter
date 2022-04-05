const dateForm = document.querySelector("#dateForm");
const dateInput = document.querySelector("#dateForm input");
const todayDate = document.querySelector("#todayDate");
const infoContainer = document.querySelector("#infoContainer");
const anniversaries = document.querySelector("#anniversaries");

let dayTextContainer = document.createElement("div");
dayTextContainer.classList.add("dayTextContainer")
dayTextContainer.classList.add("hidden")
infoContainer.classList.add("hidden")

let selectedDay = document.createElement("div");
infoContainer.appendChild(selectedDay);
infoContainer.appendChild(dayTextContainer);

const MAGIC_NUMBER = 86400000;


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

function paintMinusAnniversaries(date) {
    const hr = document.createElement("hr");
    anniversaries.appendChild(hr);

    date = date.getTime();

    for (let i = 6; i >= 0; i--) {
        const anivContainer = document.createElement("div");
        anniversaries.appendChild(anivContainer);
        anivContainer.id = `minus${i * 50}`
        
        const anivName = document.createElement("div");
        const anivDate = document.createElement("div");
        anivContainer.appendChild(anivName);
        anivContainer.appendChild(anivDate);
        
        const t = date - (i * 50) * MAGIC_NUMBER;
        const aniv = new Date(t);
        if (i === 0) {
            anivName.innerHTML = `D-Day`;
            anivContainer.id = `theDay`
        } else {
            anivName.innerHTML = `D-${i * 50}`;
        }
        anivDate.innerHTML = `${aniv.getFullYear()}-${String(aniv.getMonth()+1).padStart(2, 0)}-${String(aniv.getDate()).padStart(2, 0)}`;


        const hr = document.createElement("hr");
        anniversaries.appendChild(hr);
    }
}

function paintPlusAnniversaries(date) {
    const hr = document.createElement("hr");
    anniversaries.appendChild(hr);

    date = date.getTime();

    for (let i = 1; i < 37; i++) {
        const anivContainer = document.createElement("div");
        anniversaries.appendChild(anivContainer);
        anivContainer.id = `plus${i * 100}`
        
        const anivName = document.createElement("div");
        const anivDate = document.createElement("div");
        anivContainer.appendChild(anivName);
        anivContainer.appendChild(anivDate);
        
        const t = date + (i * 100 - 1) * MAGIC_NUMBER;
        const aniv = new Date(t);
        
        anivName.innerHTML = `${i * 100}일`;
        anivDate.innerHTML = `${aniv.getFullYear()}-${String(aniv.getMonth()+1).padStart(2, 0)}-${String(aniv.getDate()).padStart(2, 0)}`;


        const hr = document.createElement("hr");
        anniversaries.appendChild(hr);
    }

}

function showDayInfo(target, today) {
    const targetDate = new Date(`${String(target.year)}-${String(target.month).padStart(2,0)}-${String(target.day).padStart(2,0)}T00:00:00`);
    const todayDate = new Date(`${String(today.year)}-${String(today.month).padStart(2, 0)}-${String(today.day).padStart(2, 0)}T00:00:00`);
    const theDay = (targetDate - todayDate) / MAGIC_NUMBER;
    
    selectedDay.innerHTML = `
        <h3>선택한 날짜</h3>
        ${target.year}-${String(target.month).padStart(2, 0)}-${String(target.day).padStart(2, 0)}`;
    

    if (theDay > 0) {
        dayTextContainer.innerText = `D-${theDay}`;
        dayTextContainer.classList.remove("today");
        dayTextContainer.classList.remove("hidden");
        paintMinusAnniversaries(targetDate);
    } else if (theDay < 0) {
        dayTextContainer.innerText = `D+${1 - theDay}`;
        dayTextContainer.classList.remove("today");
        dayTextContainer.classList.remove("hidden");
        paintPlusAnniversaries(targetDate);
    } else {
        dayTextContainer.innerText = `오늘!`;
        dayTextContainer.classList.add("today");
        dayTextContainer.classList.remove("hidden");
    }

    infoContainer.classList.remove("hidden");

}


function handleSubmit(event) {
    event.preventDefault();
    const targetDate = dateInput.value;
    const target = {};
    target['year'] = parseInt(targetDate.substr(0, 4));
    target['month'] = parseInt(targetDate.substr(5, 2));
    target['day'] = parseInt(targetDate.substr(8, 2));

    anniversaries.innerHTML = "";
    showDayInfo(target, getToday());
}


init();