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
    console.log(document.getElementById("timeFieldChanger").checked);
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

// document.getElementById("add").addEventListener("click", () => {
//     if(!allFieldsChecker()){
//         const data = {};
//         const timerTitle = document.getElementById("title").value;
//         const startDate = document.getElementById("start_date").value;
//         const startDateTimeStamp = new Date(startDate).getTime();
//         const endDate = document.getElementById("end_date").value;
//         const endDateTimeStamp = new Date(endDate).getTime();
//         const description = document.getElementById("description").value;
//     }
// });

document.getElementById("site_on_time").addEventListener("click", () => {
    if(document.getElementById("site_on_time").checked){
        const table = document.getElementById("table");
    
        const newTr = document.createElement("tr");
        newTr.setAttribute("id", "pageURLline");
        const firstTd = document.createElement("tr");
        firstTd.innerText = "Enter the website address";
        newTr.appendChild(firstTd); 

        const secondTd = document.createElement("td");
        const urlInput = document.createElement("input");
        urlInput.setAttribute("type", "text");
        urlInput.setAttribute("id", "url_input");
        secondTd.appendChild(urlInput);
        secondTd.setAttribute("colspan", "2");
        newTr.appendChild(secondTd);

        table.appendChild(newTr);
    } else if (document.getElementById("pageURLline")){
        document.getElementById("pageURLline").remove();
    }
})