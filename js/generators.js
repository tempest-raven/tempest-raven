/**
 * 
 * @param {Array<Ability | string>} abilitiesWithScript 
 */
function generateAbilityScript(abilitiesWithScript){
    return abilitiesWithScript.map(element => {
        if (typeof element === "string") {
            return element;
        } else {
            return element.convertToScript();
        }
    }).join("\r\n");
}