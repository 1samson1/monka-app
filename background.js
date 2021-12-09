chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.local.set({ favorites: [] }, function () {
        console.log("Favorites inital as empty");
    });

});

function start(){
    
    gen_list();
    
}

async function get_emotes(){
    const global = await send('https://api.betterttv.net/3/cached/emotes/global');
    const top = await send('https://betterttv.com/emotes/top');

    const favorites = chrome.storage.local.get(['favorites']);

    return [...global, ...top, ...favorites];
}

async function gen_list(){
    console.log( await get_emotes());
}

function send(url){
    return fetch(url, {
        mode: 'no-cors',
        method:'GET'
    })
    .then(response => response.json())
}

//https://cdn.betterttv.net/emote/54fa932201e468494b85b555/2x

start()
