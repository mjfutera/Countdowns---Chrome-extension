importScripts('./scripts.js');

self.addEventListener("activate", (event) => {
    setAlarmIfNotExist();
    triggerChromeNotification("Extension is now active.");
  });

self.addEventListener("alarm", async (event) => {
  if (event.name === "timers") {
    const timers = await getFromChromeSyncStorage();
    const currentTime = new Date().getTime();
    timers.forEach((e) => {
      if (currentTime >= e.end_date) {
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
});

// self.addEventListener("fetch", (event) => {
//   // Tutaj możesz dodać obsługę żądań sieciowych, na przykład cache'owanie
//   // lub przekierowywanie żądań do innych źródeł.
//   // Jeśli nie jest wymagane specjalne zachowanie, można to zignorować.
// });

self.addEventListener("backgroundfetch", (event) => {
  if (event.request.method === "GET" && event.request.url === "/timers") {
    event.respondWith(new Response("Timers"));
  }
});
