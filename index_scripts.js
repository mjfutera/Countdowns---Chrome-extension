const timersUpdate = timers => {
    const currentDate = new Date();
    const timestampNow = currentDate.getTime();
    timers.forEach((e,i) => {
        if(e["active"]){
            const daysNumberField = document.getElementById("daysNumber-"+i);
            const timestampLeft = e["end_date"] - timestampNow;
            const timestampObject = convertTimestampToDaysHoursMinutes(timestampLeft);
            daysNumberField.innerText = timestampObject.days;
            if(e["show_time"]){
                document.getElementById("hoursNumber-"+i).innerText = timestampObject.hours;
                if(timestampObject.hours<2){
                    document.getElementById("hoursSubtitle-"+i).innerText = "hour";
                } else {
                    document.getElementById("hoursSubtitle-"+i).innerText = "hours";
                };
    
                document.getElementById("minutesNumber-"+i).innerText = timestampObject.minutes;
                if(timestampObject.minutes<2){
                    document.getElementById("minutesSubtitle-"+i).innerText = "minute";
                } else {
                    document.getElementById("minutesSubtitle-"+i).innerText = "minutes";
                };
            }
            const currentProgress = calculateProgress(e["start_date"], e["end_date"], timestampNow);
            const progressBar = document.getElementById("progressBar-"+i); 
            progressBar.setAttribute("value", currentProgress);
            progressBar.innerText = currentProgress;
            if(timestampLeft<=0){
                triggerChromeNotification(`Gratulacje! Twój timer "${e["title"]}" właśnie zakończył odliczanie. Co teraz?`);
                if(e["newTab"]["active"]){
                    createTab(e["newTab"]["url"]);
                }
                e["active"] = false;
                saveToChromeSyncStorage(timers);
            }
        }
    })
    setTimeout(() => timersUpdate(timers), 5000);
}

window.addEventListener("load", async () => {
    // await saveToChromeSyncStorage(testPattern);
    const activeTimers = document.getElementById("cdbm_timers_active");
    const inactiveTimer = document.getElementById("cdbm_timers_inactive");
    // const timers = testPattern;
    const timers = await getFromChromeSyncStorage();
    if(timers.length===0){
        document.getElementById("editField").setAttribute("style", "display: none;");
    }
    const currentDate = new Date();
    const timestampNow = currentDate.getTime();
    timers.forEach((e,i) => {
        if(e["active"]){
            const mainTimerDiv = document.createElement("div");
            mainTimerDiv.setAttribute("id", "mainTimerDiv-"+i);
            const borderColor = getRandomIndex(borderColors);
            mainTimerDiv.classList.add("cdbm_timers_singleTimer", "padding-10", "border-radius-10", borderColors[borderColor], "text-middle");
            
            const timestampLeft = e["end_date"] - timestampNow;
            const timestampObject = convertTimestampToDaysHoursMinutes(timestampLeft);
            mainTimerDiv.setAttribute("title", timestampToDateString(e["end_date"]));
            const timerTitle = document.createElement("span");
            timerTitle.classList.add("font-oswald", "font-size-larger");
            timerTitle.innerText = e.title;
            mainTimerDiv.appendChild(timerTitle);
        
            const days = document.createElement("span");
            days.classList.add("column");
            const daysNumber = document.createElement("span");
            daysNumber.setAttribute("id", "daysNumber-"+i);
            daysNumber.innerText = timestampObject["days"];
            daysNumber.classList.add("text-middle", "text-bold", "font-size-4counter");
            days.appendChild(daysNumber);
            const daysSubtitle = document.createElement("span");
            daysSubtitle.setAttribute("id", "daysSubtitle-"+i);
            daysSubtitle.innerText = timestampObject.days<2 ? "day": "days";
            days.appendChild(daysSubtitle);

            mainTimerDiv.appendChild(days);
            if(e["show_time"]){
                const hours = document.createElement("span");
                hours.classList.add("column");
                const hoursNumber = document.createElement("span");
                hoursNumber.classList.add("text-middle", "text-bold", "font-size-4counter");
                hoursNumber.innerText = timestampObject["hours"];
                hoursNumber.setAttribute("id", "hoursNumber-"+i);
                hours.appendChild(hoursNumber);

                const hoursSubtitle = document.createElement("span");
                hoursSubtitle.setAttribute("id", "hoursSubtitle-"+i);
                hoursSubtitle.innerText = timestampObject.days<2 ? "hour": "hours";
                hours.appendChild(hoursSubtitle);
                mainTimerDiv.appendChild(hours);

                const minutes = document.createElement("span");
                minutes.classList.add("column");
                const minutesNumber = document.createElement("span");
                minutesNumber.setAttribute("id", "minutesNumber-"+i);
                minutesNumber.classList.add("text-middle", "text-bold", "font-size-4counter");
                minutesNumber.innerText = timestampObject["minutes"];
                minutes.appendChild(minutesNumber);

                const minutesSubtitle = document.createElement("span");
                minutesSubtitle.setAttribute("id", "minutesSubtitle-"+i);
                minutesSubtitle.innerText = timestampObject.days<2 ? "minute": "minutes";
                minutes.appendChild(minutesSubtitle);
                mainTimerDiv.appendChild(minutes);
            }
            const progress = calculateProgress(e["start_date"], e["end_date"], timestampNow);
            const progressBar = document.createElement("progress");
            progressBar.setAttribute("id", "progressBar-"+i);
            progressBar.setAttribute("max", "100")
            progressBar.setAttribute("value", progress);
            progressBar.innerText = progress;
            mainTimerDiv.appendChild(progressBar);
            if(e["description"].length>0){
                const description = document.createElement("details");
                const summary = document.createElement("summary");
                summary.innerText = "Description";
                description.appendChild(summary);
                mainTimerDiv.appendChild(description);
                const descriptionText = document.createElement("p");
                descriptionText.innerText = e["description"];
                description.appendChild(descriptionText);
            }
            activeTimers.appendChild(mainTimerDiv);

        } else {
            console.log(e["title"]);
        }
        
    });
    if(timers.length<maxTimers){
        const addTimer = document.createElement("a");
        addTimer.href = "add.html";
        addTimer.classList.add("cdbm_timers_singleTimer", "padding-10", "border-radius-10", borderColors[getRandomIndex(borderColors)], "text-middle", "links");
        addTimer.innerText = "Add Timer";
        const img = document.createElement("img");
        img.setAttribute("src", "img/add.svg");
        addTimer.appendChild(img);
        activeTimers.appendChild(addTimer);
    }
    timersUpdate(timers);
})