const dialog = document.getElementById("mainPopUp");

const addEditForm = (timers, timerID) => {
    dialog.innerHTML = null;
    dialog.showModal();
    const edit = Array.isArray(timers) && Number.isInteger(timerID);
        const table = document.createElement("table");
            const firstTr = document.createElement("tr");
                const firstTr_firstTd = document.createElement("td");
                firstTr_firstTd.classList.add("column", "min-width-150");
                    const firstTr_firstTd_title = document.createElement("span");
                    firstTr_firstTd_title.innerText = "Timer title";
                firstTr_firstTd.appendChild(firstTr_firstTd_title);
                    const firstTr_firstTd_subtitle = document.createElement("span");
                    firstTr_firstTd_subtitle.classList.add("smaller-font");
                    firstTr_firstTd_subtitle.innerText = `Maximum ${maxLength} characters`;
                firstTr_firstTd.appendChild(firstTr_firstTd_subtitle);
            firstTr.appendChild(firstTr_firstTd);
                const firstTr_secondTd = document.createElement("td");
                    const titleInput = document.createElement("input");
                    titleInput.type = "text";
                    titleInput.id = "title";
                    titleInput.required = true;
                    titleInput.addEventListener("change", () => {
                        if (titleInput.value.length > maxLength) {
                            titleInput.value = titleInput.value.slice(0, maxLength);
                        }
                    
                        firstTr_thirdTd.innerText = `${titleInput.value.length}/${maxLength}`
                    })
                    titleInput.classList.add("padding-10", "border-radius-10");
                    titleInput.maxLength = "20";
                    titleInput.placeholder = "For ex. winter solstice";
                firstTr_secondTd.appendChild(titleInput);
            firstTr.appendChild(firstTr_secondTd);
                const firstTr_thirdTd = document.createElement("td");
                firstTr_thirdTd.setAttribute("id", "title_length");
                firstTr_thirdTd.innerText = "0/20";
                titleInput.addEventListener("input", () => {
                    if (titleInput.value.length > maxLength) {
                        titleInput.value = titleInput.value.slice(0, maxLength);
                    }
                
                    firstTr_thirdTd.innerText = `${titleInput.value.length}/${maxLength}`
                })
            firstTr.appendChild(firstTr_thirdTd);
        table.appendChild(firstTr);

            const secondTr = document.createElement("tr");
                const secondTr_firstTd = document.createElement("td");
                secondTr_firstTd.classList.add("min-width-150");
                secondTr_firstTd.innerText = "Start date:"
            secondTr.appendChild(secondTr_firstTd);
                const secondTr_secondTd = document.createElement("td");
                    const startDateInput = document.createElement("input");
                    startDateInput.type = "date";
                    startDateInput.id = "start_date";
                    startDateInput.required = true;
                    startDateInput.classList.add("padding-10", "border-radius-10", "dates");
                secondTr_secondTd.appendChild(startDateInput);
            secondTr.appendChild(secondTr_secondTd);
                
                const secondTr_thirdTd = document.createElement("td");
                    const nowButton = document.createElement("button");
                        const nowButtonImg = document.createElement("img");
                        nowButtonImg.src = "img/now.svg";
                    nowButton.appendChild(nowButtonImg);
                        const nowButtonText = document.createElement("span");
                        nowButtonText.innerText = "Now";
                    nowButton.appendChild(nowButtonText);
                    nowButton.classList.add("padding-10", 
                    "border-radius-10", 
                    "myButton-myGold", 
                    "myButton");
                secondTr_thirdTd.appendChild(nowButton);
            secondTr.appendChild(secondTr_thirdTd);
        table.appendChild(secondTr);

            const thirdTr = document.createElement("tr");
                const thirdTr_firstTd = document.createElement("td");
                thirdTr_firstTd.innerText = "End date";
            thirdTr.appendChild(thirdTr_firstTd);

                const thirdTr_secondTd = document.createElement("td");
                thirdTr_secondTd.colSpan = 2;
                    const endDateInput = document.createElement("input");
                    endDateInput.type = "date";
                    endDateInput.id = "end_date";
                    endDateInput.required = true;
                    endDateInput.classList.add("padding-10", "border-radius-10", "dates");
                thirdTr_secondTd.appendChild(endDateInput);
            thirdTr.appendChild(thirdTr_secondTd);
        table.appendChild(thirdTr);
            
            const fourthTr = document.createElement("tr");
                const fourthTr_firstTd = document.createElement("td");
                fourthTr_firstTd.classList.add("min-width-150");
                    const labelForTimeFieldChanger = document.createElement("label");
                    labelForTimeFieldChanger.setAttribute("for", "timeFieldChanger");
                    labelForTimeFieldChanger.innerText = "With time:";
                fourthTr_firstTd.appendChild(labelForTimeFieldChanger);
            fourthTr.appendChild(fourthTr_firstTd);

                const fourthTr_secondTd = document.createElement("td");
                    fourthTr_secondTd.colSpan = 2;
                        const timeFieldChanger = document.createElement("input");
                        timeFieldChanger.type = "checkbox";
                        timeFieldChanger.id = "timeFieldChanger";
                        timeFieldChanger.addEventListener("click", (event) => {
                            if(event.target.checked) {
                                startDateInput.type = "datetime-local";
                                endDateInput.type = "datetime-local";
                            } else {
                                startDateInput.type = "date";
                                endDateInput.type = "date";
                            }
                        })
                fourthTr_secondTd.appendChild(timeFieldChanger);
            fourthTr.appendChild(fourthTr_secondTd);
        table.appendChild(fourthTr);

            const fifthTr = document.createElement("tr");
            fifthTr.classList.add("min-width-150");
                const fifthTr_firstTd = document.createElement("td");
                fifthTr_firstTd.classList.add("column");
                    const fifthTr_firstTd_firstSpan = document.createElement("span");
                    fifthTr_firstTd_firstSpan.innerText = "Description";
                fifthTr_firstTd.appendChild(fifthTr_firstTd_firstSpan);
                    
                    const fifthTr_firstTd_secondSpan = document.createElement("span");
                    fifthTr_firstTd_secondSpan.classList.add("smaller-font");
                    fifthTr_firstTd_secondSpan.innerText = `Maximum ${maxDescription} characters`;
                fifthTr_firstTd.appendChild(fifthTr_firstTd_secondSpan);
            fifthTr.appendChild(fifthTr_firstTd);

                const fifthTr_secondTd = document.createElement("td");
                    const descriptionTextarea = document.createElement("textarea");
                    descriptionTextarea.id = "description";
                    descriptionTextarea.classList.add("padding-10", "border-radius-10");
                    fifthTr_secondTd.appendChild(descriptionTextarea);
            fifthTr.appendChild(fifthTr_secondTd);

                const fifthTr_thirdTd = document.createElement("td");
                fifthTr_thirdTd.id = "description_length";
                fifthTr_thirdTd.innerText = `0/${maxDescription}`;
                descriptionTextarea.addEventListener("input", () => {
                    if (descriptionTextarea.value.length > maxDescription) {
                        descriptionTextarea.value = descriptionTextarea.value.slice(0, maxDescription);
                    }
                
                    fifthTr_thirdTd.innerText = `${descriptionTextarea.value.length}/${maxDescription}`
                })
            fifthTr.appendChild(fifthTr_thirdTd);                     
        table.appendChild(fifthTr);
                
            const sixthTr = document.createElement("tr");
                const sixthTr_firstTd = document.createElement("td");
                sixthTr_firstTd.classList.add("min-width-150");
                    const timeOnSiteLabel = document.createElement("label");
                    timeOnSiteLabel.setAttribute("for", "site_on_time");
                    timeOnSiteLabel.innerText = "Launch site on time:";
                sixthTr_firstTd.appendChild(timeOnSiteLabel);
            sixthTr.appendChild(sixthTr_firstTd);

                const sixthTr_secondtTd = document.createElement("td");
                sixthTr_secondtTd.colSpan = 2;
                    const siteOnTimeInpput = document.createElement("input");
                    siteOnTimeInpput.type = "checkbox";
                    siteOnTimeInpput.id = "site_on_time";
                    siteOnTimeInpput.addEventListener("click", (event) => {
                        if(event.target.checked){
                            const seventhTr = document.createElement("tr");
                            seventhTr.id = "urlRow";
                                const seventhTr_firstTd = document.createElement("td");
                                seventhTr_firstTd.classList.add("min-width-150");
                                seventhTr_firstTd.innerText = "Site URL";
                            seventhTr.appendChild(seventhTr_firstTd);

                                const seventhTr_secondTd = document.createElement("td");
                                seventhTr_secondTd.colSpan = 2;
                                    const urlInput = document.createElement("input");
                                    urlInput.classList.add("padding-10", "border-radius-10");
                                    urlInput.id = "url_input";
                                seventhTr_secondTd.append(urlInput);
                            seventhTr.appendChild(seventhTr_secondTd);
                        table.appendChild(seventhTr);
                        } else {
                            document.getElementById("urlRow").remove();
                        }
                    })
                sixthTr_secondtTd.appendChild(siteOnTimeInpput);
            sixthTr.appendChild(sixthTr_secondtTd);
        table.appendChild(sixthTr);
    dialog.appendChild(table);

        const infosDiv = document.createElement("div");
        infosDiv.id = "infos";
    dialog.appendChild(infosDiv);

        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("flex");
        buttonsDiv.style = "justify-content:center;";
            const saveButton = document.createElement("button");
            saveButton.classList.add("padding-10",
            "border-radius-10",
            "myButton-myGold",
            "myButton",
            "min-width-150");
                const saveButtonImg = document.createElement("img");
                saveButtonImg.src = "img/happy.svg";
                saveButtonImg.id = "addPic";
            saveButton.appendChild(saveButtonImg);

                const saveButtonText = document.createElement("span");
                saveButtonText.innerText = "Save changes";
            saveButton.appendChild(saveButtonText);
        buttonsDiv.appendChild(saveButton);
            
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("padding-10",
            "border-radius-10",
            "myButton-myGold",
            "myButton",
            "min-width-150");
                const deleteButtonImg = document.createElement("img");
                deleteButtonImg.src = "img/close.svg";
                deleteButtonImg.id = "close";
            deleteButton.appendChild(deleteButtonImg);

                const deleteButtonText = document.createElement("span");
                deleteButtonText.innerText = "Close without save";
            deleteButton.appendChild(deleteButtonText);
            deleteButton.addEventListener("click", () => {
                dialog.close();
                dialog.innerHTML = null;
            })
        buttonsDiv.appendChild(deleteButton);
    dialog.appendChild(buttonsDiv);
}

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
    console.log("refresh");
    setTimeout(() => timersUpdate(timers), 1000);
}

const showTimers = async () => {
    const activeTimers = document.getElementById("cdbm_timers_active");
    const inactiveTimer = document.getElementById("cdbm_timers_inactive");
    const timers = await getFromChromeSyncStorage();
    const currentDate = new Date();
    const timestampNow = currentDate.getTime();
    timers.forEach((e,i) => {
        if(e["active"]){
            const mainDiv = document.createElement("div");
            const borderColor = getRandomIndex(borderColors);
            mainDiv.classList.add("mainDiv_singleTimer", "padding-10", "border-radius-10", borderColors[borderColor], "text-middle", "cdbm_timers_singleTimer");
                const upDown = document.createElement("div");
                upDown.classList.add("bg-myBlue", "showMe");
                upDown.innerText = ".";
                mainDiv.appendChild(upDown);

                const timerDiv = document.createElement("div");
                // timerDiv.classList.add("cdbm_timers_singleTimer");
                timerDiv.setAttribute("id", "timerDiv-"+i);
                
                const timestampLeft = e["end_date"] - timestampNow;
                const timestampObject = convertTimestampToDaysHoursMinutes(timestampLeft);
                const timerTitle = document.createElement("span");
                timerTitle.classList.add("font-oswald", "font-size-larger");
                timerTitle.innerText = e.title;
                timerDiv.appendChild(timerTitle);
            
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

                timerDiv.appendChild(days);
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
                    timerDiv.appendChild(hours);

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
                    timerDiv.appendChild(minutes);
                }
                const progress = calculateProgress(e["start_date"], e["end_date"], timestampNow);
                const progressBar = document.createElement("progress");
                progressBar.setAttribute("id", "progressBar-"+i);
                progressBar.setAttribute("max", "100")
                progressBar.setAttribute("value", progress);
                progressBar.innerText = progress;
                timerDiv.appendChild(progressBar);
                if(e["description"].length>0){
                    const description = document.createElement("details");
                    const summary = document.createElement("summary");
                    summary.innerText = "Description";
                    description.appendChild(summary);
                    timerDiv.appendChild(description);
                    const descriptionText = document.createElement("p");
                    descriptionText.innerText = e["description"];
                    description.appendChild(descriptionText);
                }
                mainDiv.appendChild(timerDiv);

                const editDelete = document.createElement("div");
                editDelete.classList.add("bg-myBlue", "showMe");
                editDelete.innerText = ".";
                mainDiv.appendChild(editDelete);

                activeTimers.appendChild(mainDiv);

        } else { 
            console.log(e["title"]);
        }
        
    });
    if(timers.length<maxTimers){
        const addTimer = document.createElement("a");
        addTimer.addEventListener("click", () => {
            addEditForm();
        })
        addTimer.classList.add("cdbm_timers_singleTimer", "padding-10", "border-radius-10", borderColors[getRandomIndex(borderColors)], "text-middle", "links");
        addTimer.innerText = "Add Timer";
        const img = document.createElement("img");
        img.setAttribute("src", "img/add.svg");
        addTimer.appendChild(img);
        activeTimers.appendChild(addTimer);
    }
    timersUpdate(timers);
}

window.addEventListener("load", () => {
    showTimers();
})