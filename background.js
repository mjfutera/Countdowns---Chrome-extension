import { maxTimers } from './scripts';

chrome.runtime.onInstalled.addListener(() => {
    console.log(maxTimers);
});

chrome.runtime.onUninstalled.addListener(() => {

});

chrome.runtime.onStartup.addListener(() => {
    
});
  