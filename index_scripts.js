window.addEventListener("load", () => {
    const activeTimers = document.getElementById("cdbm_timers_active");
    
    testPattern.forEach((e,i) => {
        const mainTimerDiv = document.createElement("div");
            const borderColor = getRandomIndex(borderColors);
            mainTimerDiv.classList.add("cdbm_timers_singleTimer", "padding-10", "border-radius-10", borderColors[borderColor]);

                const timerTitle = document.createElement("span");
                timerTitle.innerText = e.title;
            mainTimerDiv.appendChild(timerTitle);
                const currentDate = new Date();
                const timestampNow = currentDate.getTime();
                const timestampLeft = e["end_date"] - timestampNow;
                console.log(`Obecny time stamp: ${timestampNow}. Przyszły timestamp ${e["end_date"]}. Różnica: ${timestampLeft}`);
                const timestampObject = convertTimestampToDaysHoursMinutes(timestampLeft);
            
                console.log(timestampObject);
                const days = document.createElement("span");
                days.classList.add("column");
                const daysNumber = document.createElement("span");
                daysNumber.innerText = timestampObject["days"];
                days.appendChild(daysNumber);

                const daysSubtitle = document.createElement("span");
                daysSubtitle.innerText = timestampObject.days<2 ? "day": "days";
                days.appendChild(daysSubtitle);
             mainTimerDiv.appendChild(days);
        activeTimers.appendChild(mainTimerDiv);
    });
})