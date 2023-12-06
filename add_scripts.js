document.getElementById("title").addEventListener("input", () => {titleLengthCheck();});
document.querySelectorAll('input[type="text"]').forEach(e => {
    e.addEventListener("input", () => {
        allFieldsChecker();
    })
})
document.getElementById("timeFieldChanger").addEventListener("click", () => {timeFieldChanger();});
document.getElementById("add").addEventListener("mouseenter", () => {allFieldsChecker();});
document.getElementById("clear").addEventListener("click", () => {clearAllFields()});
document.getElementById("now_button").addEventListener("click", () => {
    setNow();
    allFieldsChecker();
});
document.getElementById("description").addEventListener("input", () => {descriptionChecker();});
document.getElementById("site_on_time").addEventListener("click", () => {
    siteOnTime();
    allFieldsChecker();
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
                setTimeout(() => {
                    clearAllFields();
                }, 5000)
            } else {
                infos.innerText = "Error";
            }
        } else {
            infos.innerText = `You have reached maximum of ${maxTimers}. Timer is not added. To add new timer, remove old one`;
        }
    }
});

document.getElementById("return").addEventListener("click", () => {
    closeTab();
    createTab();
})