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

let abilitiesWithScript;
async function initLoad(){
    await loadScriptIntoStorage("abilityScript", "data/scripts/frame_42/DoAction_6.as");
    await loadScriptIntoStorage("buffScript", "data/scripts/frame_42/DoAction_10.as");
    abilitiesWithScript = parseAbilityScript(localStorage.getItem("abilityScript"));
    abilitiesWithScript
        .filter(e => typeof e !== "string")
        .forEach(a => renderAbility(a));
}