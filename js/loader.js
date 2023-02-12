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

let langStrings;
let abilitiesWithScript;
let buffsWithScript;
async function initLoad(){
    await loadScriptIntoStorage("langStrings", "data/scripts/frame_1/DoAction.as");
    await loadScriptIntoStorage("abilityScript", "data/scripts/frame_42/DoAction_6.as");
    await loadScriptIntoStorage("buffScript", "data/scripts/frame_42/DoAction_10.as");
    langStrings = parseLangScript(localStorage.getItem("langStrings"));
    abilitiesWithScript = parseAbilityScript(localStorage.getItem("abilityScript"));
    abilitiesWithScript
        .filter(e => typeof e !== "string")
        .forEach(a => renderAbility(a));
    
    buffsWithScript = parseBuffScript(localStorage.getItem("buffScript"));
    buffsWithScript
        .filter(e => typeof e !== "string")
        .forEach(b => renderBuff(b));
}