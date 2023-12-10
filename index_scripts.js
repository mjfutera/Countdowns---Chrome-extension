const dialog = document.getElementById("mainPopUp");
let timerTimeOut;

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
    document.getElementById("saveButton").disabled = result;
    return result;
}

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
                    
                        firstTr_thirdTd.innerText = `${titleInput.value.length}/${maxLength}`;
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
                
                    firstTr_thirdTd.innerText = `${titleInput.value.length}/${maxLength}`;
                    allFieldsChecker();
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
                    startDateInput.id = "start_date";
                    if(edit){
                        const startTime = timers[timerID]["start_date"];
                        if (timers[timerID]["show_time"]) {
                            startDateInput.type = "datetime-local";
                            const formattedStartTime = new Date(startTime).toISOString().slice(0, 16); // Formatowanie timestampu do formatu datetime-local (YYYY-MM-DDTHH:mm)
                            startDateInput.value = formattedStartTime;
                        } else {
                            startDateInput.type = "date";
                            const formattedStartDate = new Date(startTime).toISOString().slice(0, 10); // Formatowanie timestampu do formatu date (YYYY-MM-DD)
                            startDateInput.value = formattedStartDate;
                        }
                    } else {
                        startDateInput.type = "date";
                    }
                    startDateInput.required = true;
                    startDateInput.classList.add("padding-10", "border-radius-10", "dates");
                    startDateInput.addEventListener("change", () => {
                        allFieldsChecker();
                    })
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
                    "myButton",
                    "cursor-pointer");
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
                    if(edit){
                        const endDate = timers[timerID]["end_date"];
                        if (timers[timerID]["show_time"]) {
                            startDateInput.type = "datetime-local";
                            const formattedStartTime = new Date(endDate).toISOString().slice(0, 16); // Formatowanie timestampu do formatu datetime-local (YYYY-MM-DDTHH:mm)
                            endDateInput.value = formattedStartTime;
                        } else {
                            startDateInput.type = "date";
                            const formattedStartDate = new Date(endDate).toISOString().slice(0, 10); // Formatowanie timestampu do formatu date (YYYY-MM-DD)
                            endDateInput.value = formattedStartDate;
                        }
                    } {
                        endDateInput.id = "end_date";
                    }
                    endDateInput.required = true;
                    endDateInput.addEventListener("change", () => {
                        allFieldsChecker();
                    })
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
                        if(edit){
                            timeFieldChanger.checked = timers[timerID]["show_time"];
                        }
                        timeFieldChanger.addEventListener("click", (event) => {
                            if(event.target.checked) {
                                startDateInput.type = "datetime-local";
                                endDateInput.type = "datetime-local";
                            } else {
                                startDateInput.type = "date";
                                endDateInput.type = "date";
                            }
                            allFieldsChecker();
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
                                    if(edit){
                                        urlInput.value = timers[timerID]["newTab"]["url"];
                                    }
                                    urlInput.addEventListener("click", () => {
                                        allFieldsChecker();
                                    })
                                seventhTr_secondTd.append(urlInput);
                            seventhTr.appendChild(seventhTr_secondTd);
                        table.appendChild(seventhTr);
                        } else {
                            document.getElementById("urlRow").remove();
                        }
                        allFieldsChecker();
                    })
                sixthTr_secondtTd.appendChild(siteOnTimeInpput);
            sixthTr.appendChild(sixthTr_secondtTd);
        table.appendChild(sixthTr);

        if(edit){
            titleInput.value = timers[timerID]["title"];
            if(timers[timerID]["newTab"]["active"]){
                siteOnTimeInpput.checked = true;
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
                            urlInput.value = timers[timerID]["newTab"]["url"];
                            urlInput.addEventListener("click", () => {
                                allFieldsChecker();
                            })
                        seventhTr_secondTd.append(urlInput);
                    seventhTr.appendChild(seventhTr_secondTd);
                table.appendChild(seventhTr);
            }
        }


    dialog.appendChild(table);

        const infosDiv = document.createElement("div");
        infosDiv.id = "infos";
    dialog.appendChild(infosDiv);

        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("flex");
        buttonsDiv.style = "justify-content:center; gap: 5px;";
            const saveButton = document.createElement("button");
            saveButton.addEventListener("click", () => {
                if(!allFieldsChecker() && timers.length<=12){
                    const newData = {};
                    newData["title"] = titleInput.value
                    newData["start_date"] = new Date(startDateInput.value).getTime();
                    newData["end_date"] = new Date(endDateInput.value).getTime();
                    newData["show_time"] = timeFieldChanger.checked;
                    newData["description"] = descriptionTextarea.value;
                    newData["active"] = true;
                    newData["newTab"] = {};
                    if(siteOnTimeInpput.checked){
                        newData["newTab"]["active"] = true;
                        newData["newTab"]["url"] = url_input.value;
                    } else {
                        newData["newTab"]["active"] = false;
                        newData["newTab"]["url"] = "";
                    }

                    if(edit){
                        timers[timerID] = newData;
                    } else {
                        timers.push(newData);
                    }
                saveToChromeSyncStorage(timers);
                showTimers();
                dialog.close();
                dialog.innerHTML = null;
                } else {
                    infos.innerText = null;
                    infos.innerText = "You reached maximum amount of timers"
                }
            })
            saveButton.addEventListener("mouseover", () => {
                allFieldsChecker();
            })
            saveButton.id = "saveButton";
            saveButton.classList.add("padding-10",
            "border-radius-10",
            "myButton-myGold",
            "myButton",
            "min-width-150",
            "cursor-pointer");
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
            "min-width-150",
            "cursor-pointer");
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
            const timestampObject = convertTimestampToDaysHoursMinutes(timestampLeft, e["show_time"]);
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
                showTimers();
            }
        }
    })
    timerTimeOut = setTimeout(() => timersUpdate(timers), 1000);
}

const moveUp = async (timers, currentIndex) => {
    if (currentIndex > 0 && currentIndex < timers.length) {
        const temp = timers[currentIndex];
        timers[currentIndex] = timers[currentIndex - 1];
        timers[currentIndex - 1] = temp;
    }
    saveToChromeSyncStorage(timers);
    showTimers();
};

const moveDown = async (timers, currentIndex) => {
    if (currentIndex >= 0 && currentIndex < timers.length - 1) {
        const temp = timers[currentIndex];
        timers[currentIndex] = timers[currentIndex + 1];
        timers[currentIndex + 1] = temp;
    }
    saveToChromeSyncStorage(timers);
    showTimers();
};

const removeElement = async (timers, currentIndex) => {
    if(confirm("Sure?")){
        if (currentIndex >= 0 && currentIndex < timers.length) {
            timers.splice(currentIndex, 1);
        }
        saveToChromeSyncStorage(timers);
        showTimers();
    }
};

const showTimers = async () => {
    const activeTimers = document.getElementById("cdbm_timers_active");
    activeTimers.innerHTML = null;
    // const inactiveTimer = document.getElementById("cdbm_timers_inactive");
    // inactiveTimer.innerHTML = null;
    const timers = await getFromChromeSyncStorage();
    const currentDate = new Date();
    const timestampNow = currentDate.getTime();
    timers.forEach((e,i) => {
        if(e["active"]){
            const mainDiv = document.createElement("div");
            const borderColor = getRandomIndex(borderColors);
            mainDiv.classList.add("mainDiv_singleTimer", 
            "padding-10",
            "border-radius-10", 
            borderColors[borderColor], 
            "text-middle", 
            "cdbm_timers_singleTimer");
                const upDown = document.createElement("div");
                upDown.classList.add("showMe");
                    const moveUpImg = document.createElement("img");
                    moveUpImg.src = "img/up.svg";
                    moveUpImg.classList.add("cursor-pointer");
                    moveUpImg.addEventListener("click", () => {
                        moveUp(timers, i);
                    })
                upDown.appendChild(moveUpImg);
                    const currentIndex = document.createElement("span");
                    currentIndex.innerText = i+1;
                    currentIndex.classList.add("text-middle", "text-bold", "text-myGreen", "font-size-larger");
                upDown.appendChild(currentIndex);
                    const moveDownImg = document.createElement("img");
                    moveDownImg.src = "img/down.svg";
                    moveDownImg.classList.add("cursor-pointer");
                    moveDownImg.addEventListener("click", () => {
                        moveDown(timers, i);
                    })
                upDown.appendChild(moveDownImg);
            mainDiv.appendChild(upDown);

                const timerDiv = document.createElement("div");
                timerDiv.setAttribute("id", "timerDiv-"+i);
                
                const timestampLeft = e["end_date"] - timestampNow;
                const timestampObject = convertTimestampToDaysHoursMinutes(timestampLeft, e["show_time"]);
                const timerTitle = document.createElement("span");
                timerTitle.classList.add(
                    "font-oswald", 
                "font-size-larger",
                "text-middle"
                );
                timerTitle.innerText = e["title"];
                timerDiv.appendChild(timerTitle);
            
                const days = document.createElement("span");
                days.classList.add("column");
                const daysNumber = document.createElement("span");
                daysNumber.setAttribute("id", "daysNumber-"+i);
                daysNumber.innerText = timestampObject["days"];
                daysNumber.classList.add(
                    "text-middle", 
                    "text-bold", 
                    "font-size-4counter"
                );
                days.appendChild(daysNumber);
                const daysSubtitle = document.createElement("span");
                daysSubtitle.setAttribute("id", "daysSubtitle-"+i);
                daysSubtitle.classList.add("text-middle");
                daysSubtitle.innerText = timestampObject.days<2 ? "day": "days";
                days.appendChild(daysSubtitle);

                timerDiv.appendChild(days);
                if(e["show_time"]){
                    const hours = document.createElement("span");
                    hours.classList.add("column");
                    const hoursNumber = document.createElement("span");
                    hoursNumber.classList.add(
                        "text-middle", 
                        "text-bold", 
                        "font-size-4counter"
                    );
                    hoursNumber.innerText = timestampObject["hours"];
                    hoursNumber.setAttribute("id", "hoursNumber-"+i);
                    hours.appendChild(hoursNumber);

                    const hoursSubtitle = document.createElement("span");
                    hoursSubtitle.setAttribute("id", "hoursSubtitle-"+i);
                    hoursSubtitle.innerText = timestampObject.days<2 ? "hour": "hours";
                    hoursSubtitle.classList.add("text-middle");
                    hours.appendChild(hoursSubtitle);
                    timerDiv.appendChild(hours);

                    const minutes = document.createElement("span");
                    minutes.classList.add("column");
                    const minutesNumber = document.createElement("span");
                    minutesNumber.setAttribute("id", "minutesNumber-"+i);
                    minutesNumber.classList.add(
                        "text-middle", 
                        "text-bold", 
                        "font-size-4counter"
                    );
                    minutesNumber.innerText = timestampObject["minutes"];
                    minutes.appendChild(minutesNumber);

                    const minutesSubtitle = document.createElement("span");
                    minutesSubtitle.setAttribute("id", "minutesSubtitle-"+i);
                    minutesSubtitle.innerText = timestampObject.days<2 ? "minute": "minutes";
                    minutesSubtitle.classList.add("text-middle");
                    minutes.appendChild(minutesSubtitle);
                    timerDiv.appendChild(minutes);
                }
                const progress = calculateProgress(e["start_date"], e["end_date"], timestampNow);
                const progressBar = document.createElement("progress");
                progressBar.setAttribute("id", "progressBar-"+i);
                progressBar.setAttribute("max", "100")
                progressBar.setAttribute("value", progress);
                progressBar.innerText = progress;
                progressBar.style = "width: 100%;"
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
                editDelete.classList.add("showMe");
                    const editPic = document.createElement("img");
                    editPic.src="img/edit.svg";
                    editPic.addEventListener("click", () => {
                        addEditForm(timers, i);
                    })
                    editPic.classList.add("cursor-pointer");
                editDelete.appendChild(editPic);
                    const deletePic = document.createElement("img");
                    deletePic.src="img/delete.svg";
                    deletePic.classList.add("cursor-pointer");
                    deletePic.addEventListener("click", () => {
                        removeElement(timers, i);
                    })
                editDelete.appendChild(deletePic);
            mainDiv.appendChild(editDelete);
        activeTimers.appendChild(mainDiv);

        } else { 
            const mainDiv = document.createElement("div");
            const borderColor = getRandomIndex(borderColors);
            mainDiv.classList.add("mainDiv_singleTimer", 
            "padding-10",
            "border-radius-10", 
            "text-middle", 
            "cdbm_timers_singleTimer");
                const upDown = document.createElement("div");
                upDown.classList.add("showMe");
                    const moveUpImg = document.createElement("img");
                    moveUpImg.src = "img/up.svg";
                    moveUpImg.classList.add("cursor-pointer");
                    moveUpImg.addEventListener("click", () => {
                        moveUp(timers, i);
                    })
                upDown.appendChild(moveUpImg);
                    const currentIndex = document.createElement("span");
                    currentIndex.innerText = i+1;
                    currentIndex.classList.add("text-middle", "text-bold", "text-myGreen", "font-size-larger");
                upDown.appendChild(currentIndex);
                    const moveDownImg = document.createElement("img");
                    moveDownImg.src = "img/down.svg";
                    moveDownImg.classList.add("cursor-pointer");
                    moveDownImg.addEventListener("click", () => {
                        moveDown(timers, i);
                    })
                upDown.appendChild(moveDownImg);
            mainDiv.appendChild(upDown);

            const inactiveTimerDiv = document.createElement("div");
            inactiveTimerDiv.setAttribute("id", "timerDiv-"+i);
                    const inactiveTimerTitle = document.createElement("div");
                    inactiveTimerTitle.classList.add("text-middle", "font-size-larger");
                    inactiveTimerTitle.innerText = e["title"];
                    inactiveTimerDiv.appendChild(inactiveTimerTitle);

                    const inactiveTimerSubtitle = document.createElement("div");
                    inactiveTimerSubtitle.innerText = "Your timer is expired. Please, remove or edit";
                    inactiveTimerSubtitle.classList.add("text-middle");
                    inactiveTimerDiv.appendChild(inactiveTimerSubtitle);

                    const timerImg = document.createElement("img");
                    timerImg.classList.add("text-middle");
                    timerImg.style = "  margin-left: auto; margin-right: auto;"
                    timerImg.src="img/warning.svg";
                inactiveTimerDiv.appendChild(timerImg);
            mainDiv.appendChild(inactiveTimerDiv);

            const editDelete = document.createElement("div");
                editDelete.classList.add("showMe");
                    const editPic = document.createElement("img");
                    editPic.src="img/edit.svg";
                    editPic.addEventListener("click", () => {
                        addEditForm(timers, i);
                    })
                    editPic.classList.add("cursor-pointer");
                editDelete.appendChild(editPic);
                    const deletePic = document.createElement("img");
                    deletePic.src="img/delete.svg";
                    deletePic.classList.add("cursor-pointer");
                    deletePic.addEventListener("click", () => {
                        removeElement(timers, i);
                    })
                editDelete.appendChild(deletePic);
            mainDiv.appendChild(editDelete);
        activeTimers.appendChild(mainDiv);
        }  
    });
    if(timers.length<maxTimers){
        const addTimer = document.createElement("a");
        addTimer.addEventListener("click", () => {
            addEditForm(timers);
        })
        addTimer.classList.add("cdbm_timers_singleTimer", "padding-10", "border-radius-10", borderColors[getRandomIndex(borderColors)], "text-middle", "links", "cursor-pointer");
        addTimer.innerText = "Add Timer";
        const img = document.createElement("img");
        img.setAttribute("src", "img/add.svg");
        addTimer.appendChild(img);
        activeTimers.appendChild(addTimer);
    }
    clearTimeout(timerTimeOut);
    timersUpdate(timers);
}

window.addEventListener("load", () => {
    showTimers();
})

document.getElementById("aboutPlugin").addEventListener("click", () => {
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
        }
    ]

    dialog.innerHTML = null;
    dialog.showModal();
    const firstLine = document.createElement("div");
        firstLine.innerText = "Test";
    dialog.appendChild(firstLine);

    const socialMedia = document.createElement("div");
    socialMedia.classList.add("text-middle");
    const socialMediaText = document.createElement("div");
    socialMediaText.innerText = "Check my Social Media";
    socialMediaText.classList.add("text-middle");
    socialMedia.appendChild(socialMediaText);
    const socialMediaIcons = document.createElement("div");

    socialMediaArray.forEach(e => {
        const image = document.createElement("img");
        image.src="logos/socialMedia/"+e["icon"];
        image.classList.add("social-media-icon", "cursor-pointer");
        image.alt = e["alt"];
        image.addEventListener("click", () => {
            createTab(e["link"]);
        })
        socialMediaIcons.appendChild(image);
    })
    socialMedia.appendChild(socialMediaIcons);

    dialog.appendChild(socialMedia);

})