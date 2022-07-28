
const globalSaveBtn = document.querySelectorAll('.fa');
var currentDay = moment().format("MMM Do, YYYY");
$("#currentDay").text(currentDay);
var currentTime = moment().format("hh:mm:ss");
$("#currentTime").text(currentTime);
var themeSwitcher = document.querySelector("#msg");
var container = document.querySelector(".midContainer");
var messageContainers = Array.from(document.getElementsByClassName('message-container'));
var hour = moment().hour();

function getLocalStorage() {
    return JSON.parse(localStorage.getItem("schedule"));
};

function clearAndSetSchedule(newSchedule) {
    var sch = newSchedule || {};
    messageContainers.forEach((e) => {
        sch[e.id] = '';
        e.getElementsByTagName('textarea')[0].value = '';
    });
    localStorage.setItem("schedule", JSON.stringify(sch));
}

function renderMessage(newSchedule) {
    const storage = getLocalStorage();
    console.log(storage)
    if (storage) {
        messageContainers.forEach((e) => {
            console.log(messageContainers)
            const elementId = e.parentElement.getElementsByClassName('message-container')[0].id;
            e.getElementsByTagName('textarea')[0].value = storage[elementId]
            // storage["10pm"]
        });
    } else {
        clearAndSetSchedule(newSchedule);
    }
}

globalSaveBtn.forEach(fa => {
    fa.addEventListener('click', function (event) {
        const localTextarea = event.target.parentElement.parentElement.getElementsByTagName('textarea')[0];

        if (localTextarea.value) {
            const elementId = event.target.parentElement.parentElement.getElementsByClassName('message-container')[0].id;
            const localSchedule = getLocalStorage();
            const newValue = localTextarea.value + ' Confirmed';
            localTextarea.value = newValue;
            localSchedule[elementId] = newValue;
            localStorage.setItem("schedule", JSON.stringify(localSchedule));
        } else {
            alert("Must enter text to save entry")
        }
    });
});

document.getElementById('clear').addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem('schedule');
    clearAndSetSchedule();
})

renderMessage();


function colorStyle(){
    $(".message-container").each(function (event){
        var rowTime = $(this).data("time")
        var officialRowTime = parseInt(rowTime)
        console.log(officialRowTime);
        var currentTime2 = moment().format('HH');
        var currentTime3 = parseInt(currentTime2)
        console.log(currentTime3)
        if (currentTime3 > officialRowTime){
            $(this).addClass("past")
        } 
        else if (currentTime3 === officialRowTime) {
            $(this).addClass("present")

        }
        else{
            $(this).addClass("future")
        }
        
    })
    
}
colorStyle();



