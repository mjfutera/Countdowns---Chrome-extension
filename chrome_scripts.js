const mainMemoryKey = "cdbm_timers_storage";

const getFromChromeSyncStorage = async (key=mainMemoryKey) => {
    return new Promise((resolve) => {
        chrome.storage.sync.get([key], (result) => {
            const dataString = result[key] || "[]";
            const data = JSON.parse(dataString);
            resolve(data);
        });
    });
};

const saveToChromeSyncStorage = async (data, { key = mainMemoryKey, array = true } = {}) => {
    if(!Array.isArray(data) && array){
        data = [];
    }
    return new Promise((resolve) => {
        chrome.storage.sync.set({ [key]: JSON.stringify(data) }, () => {
            console.log(`Data (${key}) is saved`);
            resolve(true);
        });
    });
};


const removeFromChromeSyncStorage = async (key=mainMemoryKey) => {
    return new Promise((resolve) => {
        chrome.storage.sync.remove([key], () => {
            console.log(`Data (${key}) is removed`);
            resolve(true);
        });
    });
};

const getFromChromeLocalStorage = async (key=mainMemoryKey) => {
    return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
            const dataString = result[key] || "[]";
            const data = JSON.parse(dataString);
            resolve(data);
        });
    });
};

const saveToChromeLocalStorage = async (data, key=mainMemoryKey) => {
    if(!Array.isArray(data)){
        data=[];
    }
    return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: JSON.stringify(data) }, () => {
            console.log(`Data (${key}) is saved in local storage`);
            resolve(true);
        });
    });
};

const removeFromChromeLocalStorage = async (key=mainMemoryKey) => {
    return new Promise((resolve) => {
        chrome.storage.local.remove([key], () => {
            console.log(`Data (${key}) is removed from local storage`);
            resolve(true);
        });
    });
};

const triggerChromeNotification = (notificationMessage) => {
    const options = {
        type: 'basic',
        title: 'Countdown timer by Michal',
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
        if (url === "") {
            chrome.tabs.create({}, (tab) => {
                resolve(tab);
            });
        } else {
            chrome.tabs.create({ url }, (tab) => {
                resolve(tab);
            });
        }
    });
};

const closeTab = async (url = "") => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabToClose = tabs[0];
            if (url === "") {
                chrome.tabs.remove(tabToClose.id, () => {
                    resolve(true);
                });
            } else {
                chrome.tabs.query({ url }, (matchingTabs) => {
                    if (matchingTabs.length > 0) {
                        chrome.tabs.remove(matchingTabs[0].id, () => {
                            resolve(true);
                        });
                    } else {
                        resolve(false);
                    }
                });
            }
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

const createAlarm = async (name, delayInMinutes, periodInMinutes) => {
    try {
        await chrome.alarms.create(name, { delayInMinutes, periodInMinutes });
        return true;
    } catch (error) {
        console.error('Error creating alarm:', error);
        return false;
    }
};

const setAlarmIfNotExist = () => {
    if(!checkIfAlarmExists("timers")){
        createAlarm("timers", 1, 1);
        console.log("Alarm is set");
    }
}

const removeAlarm = (name) => {
    return new Promise((resolve) => {
        chrome.alarms.clear(name, (wasCleared) => {
            resolve(wasCleared);
        });
    });
};

//Update JSON

const updateTimers = async () => {
    const timers = await getFromChromeSyncStorage();
    const updated = [];
    timers.forEach(e => {
        if(!e.hasOwnProperty('recurring')){
            e["recurring"] = {
                "active": true,
                "every": 1,
                "time_unit": "week"
            }
            updated.push(true);
        }
    })
    if(updated.includes(true)){
        console.log(timers);
        saveToChromeSyncStorage(timers);
    }
}