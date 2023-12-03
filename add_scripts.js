const maxLength = 20;

document.getElementById("timeFieldChanger").addEventListener("click", () => {
    const fields = [...document.getElementsByClassName("dates")];
    fields.forEach(e => {
        if (e.type === "datetime-local") {
            e.type = "date";
        } else {
            e.type = "datetime-local";
        }
    });
});

document.getElementById("title").addEventListener("input", () => {
    const titleInput = document.getElementById("title");

    if (titleInput.value.length > maxLength) {
        titleInput.value = titleInput.value.slice(0, maxLength);
    }

    document.getElementById("title_length").innerText = `${titleInput.value.length}/${maxLength}`;
});

document.getElementById("description").addEventListener("input", () => {
    const descriptionInput = document.getElementById("description");
    const maxLength = 100;

    if (descriptionInput.value.length > maxLength) {
        descriptionInput.value = descriptionInput.value.slice(0, maxLength);
    }

    document.getElementById("description_length").innerText = `${descriptionInput.value.length}/${maxLength}`;
});


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
            checkArray.push(correctUrl);
            infoArray.push("Page URL is incorrect");
        } else {
            checkArray.push(correctUrl);
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
    } else {
        infos.innerHTML = "";
    }
    document.getElementById("add").disabled = result;
    return result;
}

document.getElementById("add").addEventListener("mouseenter", () => {
    allFieldsChecker();
});

document.querySelectorAll('input[type="text"]').forEach(e => {
    e.addEventListener("input", () => {
        allFieldsChecker();
    })
})


document.getElementById("site_on_time").addEventListener("click", () => {
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
})

document.getElementById("add").addEventListener("click", async () => {
    if(!allFieldsChecker()){
        const data = {};
        data["title"] = document.getElementById("title").value;
        data["start_date"]= new Date(document.getElementById("start_date").value).getTime();
        data["end_date"] = new Date(document.getElementById("end_date").value).getTime();
        data["show_time"] = document.getElementById("timeFieldChanger").checked;
        data["description"] = document.getElementById("description").value;
        data["active"] = true;
        const siteOnTime = document.getElementById("site_on_time").checked;
        data["newTab"] = {};
        if(siteOnTime){
            data["newTab"]["active"] = true;
            data["newTab"["url"]] = document.getElementById("url_input").value;
        } else {
            data["newTab"]["active"] = false;
            data["newTab"]["url"] = "";
        }
        const timers = await getFromChromeSyncStorage();
        const infos = document.getElementById("infos");
        if(timers.length<=maxTimers){
            timers.push(data);
            if(saveToChromeSyncStorage(timers)){
                infos.innerText = "Timer added";
            } else {
                infos.innerText = "Error";
            }
        } else {
            infos.innerText = `You have reached maximum of ${maxTimers}. Timer is not added. To add new timer, remove old one`;
        }
    }
});