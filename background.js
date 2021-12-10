/* chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.local.set({ favorites: [] }, function () {
        console.log("Favorites inital as empty");
    });

});

function start(){
    
    gen_list();
    
}

async function get_emotes(){
    fetch("https://api.betterttv.net/3/cached/emotes/global").then(res => res.json()).then(j => console.log(j))
    //const global = await send('https://api.betterttv.net/3/cached/emotes/global');
    //const top = await send('https://betterttv.com/emotes/top');

    

    return [];
}

async function gen_list(){
    console.log( await get_emotes());
}

async function send(url){
    return fetch(url, {
        mode: 'no-cors',
        method:'GET'
    })
    .then(response => response.json())
}


start() */


//https://cdn.betterttv.net/emote/54fa932201e468494b85b555/2x

//Top emotes
//https://api.betterttv.net/3/emotes/shared/top?offset=0&limit=50

//Search
//https://api.betterttv.net/3/emotes/shared/search?query=jijarot&offset=0&limit=50

//Gloval Emotes 
//https://api.betterttv.net/3/cached/emotes/global
//https://api.betterttv.net/3/cached/frankerfacez/emotes/global // Fail emotes

//Chanel Emones (Needed Twitch API)
//https://api.betterttv.net/3/cached/frankerfacez/users/twitch/:chanelId
//https://api.betterttv.net/3/cached/frankerfacez/users/twitch/43899589

//User Info (Needed Twitch API)
//https://api.betterttv.net/3/cached/users/twitch/:chanelId

/* Bg */

/* const activeTabs = {};
let contentScriptRerunner = null;

function runContentScript(tabId) {
    console.log(chrome);
    chrome.tabs.executeScript(tabId, {
        allFrames: true,
        file: 'run.js',
    });
}

function rerunContentScripts() {
    // unfortunately we need to rerun periodically to handle iframes changing..
    // eventually fixed when we require the new host permission or chrome releases a content script api
    for (const tabId of Object.keys(activeTabs)) {
        runContentScript(parseInt(tabId, 10));
    }
} 

function registerDynamicContentScript() {
    chrome.tabs.onUpdated.addListener((tabId, {status}, {url}) => {
        if (!status || !url) {
            return;
        }

        runContentScript(tabId);
        activeTabs[tabId] = true;

        if (contentScriptRerunner == null) {
            contentScriptRerunner = setInterval(rerunContentScripts, 5000);
        }
    });
    chrome.tabs.onRemoved.addListener((tabId) => {
        delete activeTabs[tabId];

        if (contentScriptRerunner != null && Object.keys(activeTabs).length === 0) {
            clearInterval(contentScriptRerunner);
            contentScriptRerunner = null;
        }
    });
}

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case 'CHECK_YOUTUBE_PERMISSION':
            chrome.permissions.contains({
                origins: ['*://*.youtube.com/*'],
            }, (granted) => sendResponse(granted));
            break;
        case 'REQUEST_YOUTUBE_PERMISSION':
            chrome.tabs.create({url: 'permissions_upgrade.html'});
            break;
    }
});

chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason !== 'install') {
        return;
    }

    chrome.permissions.contains({
        origins: ['*://*.youtube.com/*'],
    }, (granted) => {
        if (granted) {
            return;
        }
        chrome.tabs.create({url: 'permissions_upgrade.html'});
    });
});

registerDynamicContentScript();  */


