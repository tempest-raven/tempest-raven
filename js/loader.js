"use strict";
/**
 * Attempts to load the vanilla scripts into localStorage
 * @param {string} key the localStorage key
 * @param {string} filepath The file location
 */
async function loadScriptIntoStorage(key, filepath){
    if (localStorage.getItem(key) === null){
        await fetch(filepath)
            .then(response => response.text())
            .then(script => localStorage.setItem(key, script));
    }
}

async function loadGameScripts(){
    const files = [
        ["langStrings", "data/sonny2/scripts/frame_1/DoAction.as"],
        ["abilityScript", "data/sonny2/scripts/frame_42/DoAction_6.as"],
        ["buffScript", "data/sonny2/scripts/frame_42/DoAction_10.as"]
    ];

    //Load all files in parallel and wait till all are done loading
    await Promise.all(files.map(params => loadScriptIntoStorage(...params)));
}

function loadForms(){
    fetch("abilityForm.html")
        .then(response => response.text())
        .then(html => document.getElementById("editAbility").innerHTML = html)
}