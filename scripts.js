const testPattern = [
    {
        "title": "Test timerek",
        "start_date": 1641573660000,
        "end_date": 1641746400000,
        "show_time": false,
        "description": "Test"
    },
    {
        "title": "Test timerek 1",
        "start_date": 1641573660000,
        "end_date": 1641746400000,
        "show_time": false,
        "description": "Test"
    }
]

const borderColors = [
    "border-myGreen", 
    "border-myYellow", 
    "border-myGold", 
    "border-myBlue", 
    "border-myLime", 
    "border-mySilver", 
    "border-myRed", 
    "border-myBlack", 
    "border-myGrey", 
    "border-fiverrGreen", 
    "border-fiverrBlack"
];

//Chrome  extension functions
const getFromChromeSyncStorage = async (key="cdbm_timers_storage") => {
    return new Promise((resolve) => {
        chrome.storage.sync.get([key], (result) => {
            const dataString = result[key] || "[]";
            const data = JSON.parse(dataString);
            resolve(data);
        });
    });
};

const saveToChromeSyncStorage = async (data, key="cdbm_timers_storage") => {
    return new Promise((resolve) => {
        chrome.storage.sync.set({ [key]: JSON.stringify(data) }, () => {
            console.log(`Data (${key}) is saved`);
            resolve(true);
        });
    });
};

const removeFromChromeSyncStorage = async (key="cdbm_timers_storage") => {
    return new Promise((resolve) => {
        chrome.storage.sync.remove([key], () => {
            console.log(`Data (${key}) is removed`);
            resolve(true);
        });
    });
};

const triggerChromeNotification = (notificationMessage) => {
    const options = {
      type: 'basic',
      title: 'My Extension Notification',
      message: notificationMessage,
      iconUrl: 'path/to/icon.png', // Zmień ścieżkę do odpowiedniego obrazka ikony
    };
  
    chrome.notifications.create(options, (notificationId) => {
      if (chrome.runtime.lastError) {
        console.error('Error creating notification:', chrome.runtime.lastError.message);
        return false;
      } else {
        console.log('Notification created with ID:', notificationId);
        return true;
      }
    });
  };

//Other functions
const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

const changeDateInputType = fieldID => {
    const field = document.getElementById(fieldID);
    if (field.type === "datetime-local") {
        field.type = "date";
    } else {
        field.type = "datetime-local";
    }
};

const convertTimestampToDaysHoursMinutes = timestamp => {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    const days = Math.floor(timestamp / oneDay);
    const hours = Math.floor((timestamp % oneDay) / oneHour);
    const minutes = Math.floor((timestamp % oneHour) / oneMinute);

    return {
        days,
        hours,
        minutes
    };
}

//Triggers
window.addEventListener("load", () => {
    const activeTimers = document.getElementById("cdbm_timers_active");
    
    testPattern.forEach((e,i) => {
        const mainTimerDiv = document.createElement("div");
            const borderColor = getRandomIndex(borderColors);

            mainTimerDiv.classList.add("cdbm_timers_singleTimer", "padding-10", "border-radius-10", borderColors[borderColor]);
            const timerTitle = document.createElement("span");
            timerTitle.setAttribute("id", "cdbm_timers_singleTimer-"+i);
            timerTitle.innerText = e.title;
        mainTimerDiv.appendChild(timerTitle);
             
        activeTimers.appendChild(mainTimerDiv);
    });
})
