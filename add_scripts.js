// document.getElementById("add").addEventListener("click", () => {
//     const title = document.getElementById("title").value;
//     const startDateField = document.getElementById("start_date").value;
//     const endDateField = document.getElementById("end_date").value;
//     if(!title || !startDateField || !endDateField){
//         alert("Please, complete all fields");
//         return;
//     }
//     const startDate = new Date(startDateField);
//     const endDate = new Date(endDateField);
//     const startDateTimestamp = startDate.getTime();
//     const endDateTimestamp = endDate.getTime();

// })

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
    const maxLength = 20;

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

// document.getElementById("add").addEventListener("mouseenter", () => {
//     const button = document.getElementById("add");
//     if(button.disabled){
//         button.disabled = false;
//     } else {
//         button.disabled = true;
//     }
// })

