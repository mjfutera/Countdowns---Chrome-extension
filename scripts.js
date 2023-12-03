const maxTimers = 8;

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
    if(!Array.isArray(data))data=[];
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
      iconUrl: 'logos/logo128.png', // Zmień ścieżkę do odpowiedniego obrazka ikony
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

  const createTab = async (url = "") => {
    return new Promise((resolve) => {
        chrome.tabs.create({ url }, (tab) => {
            resolve(tab);
        });
    });
};

const checkIfAlarmExists = async (name) => {
    return new Promise((resolve) => {
        chrome.alarms.get(name, (alarm) => {
            resolve(!!alarm);
        });
    });
};

const createAlarm = (name, delayInMinutes) => {
    return new Promise((resolve) => {
        chrome.alarms.create(name, { delayInMinutes }, () => {
            resolve(true);
        });
    });
};

const removeAlarm = (name) => {
    return new Promise((resolve) => {
        chrome.alarms.clear(name, (wasCleared) => {
            resolve(wasCleared);
        });
    });
};

//Other functions
const getRandomIndex = (array) => Math.floor(Math.random() * array.length); //Colors

const convertTimestampToDaysHoursMinutes = timestamp => {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    const days = Math.floor(timestamp / oneDay)+1;
    const hours = Math.floor((timestamp % oneDay) / oneHour);
    const minutes = Math.floor((timestamp % oneHour) / oneMinute);

    return {
        days,
        hours,
        minutes
    };
}

const calculateProgress = (startTimestamp, endTimestamp, currentTimestamp) => {
    const totalDuration = endTimestamp - startTimestamp;
    const elapsedDuration = currentTimestamp - startTimestamp;

    if (totalDuration <= 0 || elapsedDuration <= 0) {
        return 0;
    }

    const progressPercentage = (elapsedDuration / totalDuration) * 100;
    return Math.min(100, progressPercentage);
};

const isValidUrl = url => /^(https?:\/\/)([\w-]+(\.[\w-]+)+)\/?([^\s]*)?$/.test(url);

const timestampToDateString = timestamp => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const dateString = `${year}-${month}-${day} ${hours}:${minutes}`;

    return dateString;
};