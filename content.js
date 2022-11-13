let script = document.createElement("script");

// install script.js
script = document.createElement("script");
script.type = "module";
script.src = chrome.runtime.getURL("script.js");
(document.head || document.documentElement).appendChild(script);
