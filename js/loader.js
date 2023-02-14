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

async function initLoad(){
    await loadScriptIntoStorage("langStrings", "data/scripts/frame_1/DoAction.as");
    await loadScriptIntoStorage("abilityScript", "data/scripts/frame_42/DoAction_6.as");
    await loadScriptIntoStorage("buffScript", "data/scripts/frame_42/DoAction_10.as");
    
    let langStrings = parseLangScript(localStorage.getItem("langStrings"));
    /** @type {Map<number, Ability>} */
    let abilityList = new Map();
    /** @type {Map<string, Buff>} */
    let buffList = new Map();

    
    let abilitiesWithScript = parseAbilityScript(localStorage.getItem("abilityScript"));
    abilitiesWithScript
        .filter(e => typeof e !== "string")
        .forEach(a => {
            abilityList.set(a.id, a);
        });
    
    let buffsWithScript = parseBuffScript(localStorage.getItem("buffScript"));
    buffsWithScript
        .filter(e => typeof e !== "string")
        .forEach(b => {
            buffList.set(b.id, b);
        });
    return {
        langStrings: langStrings,
        abilities: abilityList,
        abilityScript: abilitiesWithScript,
        buffs: buffList,
        buffScript: buffsWithScript
    };
}