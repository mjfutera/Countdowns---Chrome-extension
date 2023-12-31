const manifest = chrome.runtime.getManifest();
const maxTimers = 12;
const maxLength = 20;
const maxDescription = 100;
const utmParams = "??utm_source="+manifest["name"]+"&utm_content="+manifest["version"];

const socialMediaArray = [
    {
        "icon": "buyMeACoffee.png",
        "name": "Buy Me A Coffee",
        "link": "https://www.buymeacoffee.com/mjfutera/",
        "alt": "Like my extension? Buy me a coffee"
    },
    {
        "icon": "gitHub.png",
        "name": "GitHub",
        "link": "https://www.buymeacoffee.com/mjfutera/",
        "alt": "All my programming repositories"
    },
    {
        "icon": "linkedIn.png",
        "name": "Linked In",
        "link": "https://www.linkedin.com/in/michalfutera/",
        "alt": "Join me in my business network"
    },
    {
        "icon": "twitter.png",
        "name": "X (Twitter)",
        "link": "https://twitter.com/mjfutera",
        "alt": "Follow me on Twitter"
    },
    {
        "icon": "linkTree.png",
        "name": "LinkTree",
        "link": "https://linktr.ee/mjfutera",
        "alt": "All my links in one place"
    },
    {
        "icon": "threads.png",
        "name": "Instagram Threads",
        "link": "https://www.threads.net/@mjf86.pl",
        "alt": "Instagram threads"
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


//Other functions
const getData = async (url) => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    };
  
    const response = await fetch(url, {
      headers: headers
    });
  
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Failed to fetch data from ${url}: ${response.status}`);
    }
  };
  

const getRandomIndex = (array) => Math.floor(Math.random() * array.length); //Colors

const convertTimestampToDaysHoursMinutes = (timestamp, showTime) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    let days = Math.floor(timestamp / oneDay);
    if(!showTime){
        days = days+1;
    }
    const hours = Math.floor((timestamp % oneDay) / oneHour);
    const minutes = Math.floor((timestamp % oneHour) / oneMinute);

    return {
        days,
        hours,
        minutes
    };
}

const getTimeZone = async () => {
    const timeZones = await getData("timezones.json");
    const date = new Date();
    const offset = date.getTimezoneOffset();
    return timeZones.find(zone => zone["offsetMinutes"] === offset)["name"];
};

const getCurrentTimeFromApi = async () => {
    const timeZone = await getTimeZone();
    const apiUrl = "https://timeapi.io/api/Time/current/zone?timeZone="+timeZone;
    const timeObject = await getData(apiUrl);
    return timeObject;
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

const playSound = () => {
    const audio = new Audio("sound/ring.mp3");
    audio.play();
  };
  
  
  