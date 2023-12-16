importScripts('./scripts.js');

self.addEventListener("activate", (event) => {
    if(setAlarmIfNotExist()){
      triggerChromeNotification("Extension is now active.");
    };
    clients.claim();
});

self.addEventListener("alarm", async (event) => {
  if (event.name === "timers") {
    const timers = await getFromChromeSyncStorage();
    const currentTime = new Date().getTime();
    timers.forEach((e) => {
      if (currentTime >= e["end_date"]) {
        if (!e.active) return;
        e.active = false;
        triggerChromeNotification(`Congratulations! Your timer "${e.title}" just finished counting down. What now?`);
        if (e.newTab.active) {
          createTab(e.newTab.url);
        }
      }
    });
    if (timers.some((e) => e.active)) {
      saveToChromeSyncStorage(timers);
    }
  }
  triggerChromeNotification("Test alarm");
});

self.addEventListener("fetch", (event) => {
  console.log(event);
});

// self.addEventListener("backgroundfetch", (event) => {
//   if (event.request.method === "GET" && event.request.url === "/timers") {
//     event.respondWith(new Response("Timers"));
//   }
// });
