const maxTimers = 8;
const maxLength = 20;
const maxDescription = 100;

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
// Checks
const titleLengthCheck = () => {
    const titleInput = document.getElementById("title");

    if (titleInput.value.length > maxLength) {
        titleInput.value = titleInput.value.slice(0, maxLength);
    }

    document.getElementById("title_length").innerText = `${titleInput.value.length}/${maxLength}`;
}

const descriptionChecker = () => {
    const descriptionInput = document.getElementById("description");
    const maxLength = 100;

    if (descriptionInput.value.length > maxLength) {
        descriptionInput.value = descriptionInput.value.slice(0, maxLength);
    }

    document.getElementById("description_length").innerText = `${descriptionInput.value.length}/${maxLength}`;
}

const siteOnTime = () => {
    if(document.getElementById("site_on_time").checked){
        const table = document.getElementById("table");
    
        const newTr = document.createElement("tr");
        newTr.setAttribute("id", "pageURLline");
        const firstTd = document.createElement("tr");
        firstTd.innerText = "Enter the website address";
        firstTd.classList.add("min-width-150");
        newTr.appendChild(firstTd); 

        const secondTd = document.createElement("td");
        const urlInput = document.createElement("input");
        urlInput.setAttribute("type", "text");
        urlInput.setAttribute("id", "url_input");
        urlInput.classList.add("padding-10", "border-radius-10");
        secondTd.appendChild(urlInput);
        secondTd.setAttribute("colspan", "2");
        newTr.appendChild(secondTd);

        table.appendChild(newTr);
    } else if (document.getElementById("pageURLline")){
        document.getElementById("pageURLline").remove();
    }
}

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

const isValidUrl = url => url.trim() !== "" && /^(https?:\/\/)([\w-]+(\.[\w-]+)+)\/?([^\s]*)?$/.test(url);

const setDataFormat = (fieldType, timestamp) => {
    const date = timestamp ? new Date(timestamp) : new Date();
    if (fieldType === "datetime-local") {
        return date.toISOString().slice(0, 16);
    } else if (fieldType === "date") {
        return date.toISOString().slice(0, 10);
    }
};

const setNow = () => {
    const field = document.getElementById("start_date");
    field.value = setDataFormat(field.type);
}

const timeFieldChanger = () => {
    const fields = [...document.getElementsByClassName("dates")];
    fields.forEach(field => {
        if (field.type === "datetime-local") {
            field.type = "date";
        } else if (field.type === "date") {
            field.type = "datetime-local";
        }
    });
};


const clearAllFields = () => {
    document.getElementById("title").value = null;
    document.getElementById("start_date").value = null;
    document.getElementById("end_date").value = null;
    document.getElementById("description").value = null;
    document.getElementById("site_on_time").checked = false;
    document.getElementById("site_on_time").checked = false;
    document.getElementById("infos").innerHTML = null;
    document.getElementById("add").disabled = false;
    document.getElementById("addPic").src="img/happy.svg";
}

const allFieldsChecker = () => {
    const timerTitle = document.getElementById("title").value;
    const startDate = document.getElementById("start_date").value;
    const startDateTimeStamp = new Date(startDate).getTime();
    const endDate = document.getElementById("end_date").value;
    const endDateTimeStamp = new Date(endDate).getTime();
    const description = document.getElementById("description").value;
    const infos = document.getElementById("infos");
    const siteOnTime = document.getElementById("site_on_time");
    const checkArray = [];
    const infoArray = [];
    
    if(!timerTitle.length){
        checkArray.push(true);
        infoArray.push("Title can't be empty");
    } else if (timerTitle.length>20) {
        checkArray.push(true);
        infoArray.push("Title too long");
    } else {
        checkArray.push(false);
    }

    if(!startDate){
        checkArray.push(true);
        infoArray.push("Start date can't be empty");
    } else {
        checkArray.push(false);
    }

    if(!endDate){
        checkArray.push(true);
        infoArray.push("End date can't be empty");
    } else if (startDateTimeStamp>=endDateTimeStamp){
        checkArray.push(true);
        infoArray.push("End date can't be ealier than start date");
    } else {
        checkArray.push(false);
    }

    if(description.length>maxLength){
        checkArray.push(true);
        infoArray.push("End date can't be ealier than start date");
    } else {
        checkArray.push(false);
    }

    if(siteOnTime.checked){
        const correctUrl = isValidUrl(document.getElementById("url_input").value);
        if(!correctUrl){
            checkArray.push(true);
            infoArray.push("Page URL is incorrect");
        } else {
            checkArray.push(false);
        }
    }

    const result = checkArray.includes(true);
    if(result) {
        infos.innerHTML = "";
        const list = document.createElement("ol");
        infoArray.forEach(e => {
            const element = document.createElement("li");
            element.innerText = e;
            list.appendChild(element);
        })
        infos.appendChild(list);
        document.getElementById("addPic").src="img/sad.svg";
    } else {
        infos.innerHTML = "";
        document.getElementById("addPic").src="img/happy.svg";
    }
    document.getElementById("add").disabled = result;
    console.log(result);
    return result;
}