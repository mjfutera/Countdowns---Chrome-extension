importScripts('./scripts.js');
importScripts('./chrome_scripts.js');

self.addEventListener("activate", (event) => {
    event.waitUntil(clients.claim()); 
    setAlarmIfNotExist();
});

self.addEventListener("alarm", async (event) => {
    if (event.name === "timers") {
        const timers = await getFromChromeSyncStorage();
        const currentTime = new Date().getTime();
        let isDataModified = false;

        timers.forEach((e) => {
            if (currentTime >= e["end_date"] && e.active) {
                e.active = false;
                isDataModified = true;
                triggerChromeNotification(`Congratulations! Your timer "${e.title}" just finished counting down. What now?`);
                if (e.newTab && e.newTab.active) {
                    createTab(e.newTab.url);
                }
            }
        });

        if (isDataModified) {
            saveToChromeSyncStorage(timers);
        }
        triggerChromeNotification("Alarm test");
    } else {
        triggerChromeNotification("Alarm received: " + event.name);
    }
});

self.addEventListener("fetch", (event) => {
    console.log(event);
});

self.addEventListener("backgroundfetch", (event) => {
    // Obsługa zdarzeń background fetch, jeśli jest to potrzebne
});
