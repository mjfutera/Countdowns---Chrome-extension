importScripts('./scripts.js');

chrome.runtime.onStartup.addListener(() => {
    if(createAlarm("timers", 1, 1)){
        console.log("Alarm created");
    } else {
        console.log("Alarm already exist");
    };
})
let number = 1;
  
  // Dodaj funkcję do listenera alarmu
chrome.alarms.onAlarm.addListener((alarm) => {
    if(alarm.name === "timers"){
        triggerChromeNotification("Test notifiaction "+number);
        number++;
    }
});