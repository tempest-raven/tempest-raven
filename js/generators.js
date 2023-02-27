"use strict";
/**
 * 
 * @param {Array<{convertToScript: (() => string)} | string>} mixedScriptArray 
 */
function generateScript(mixedScriptArray){
    return mixedScriptArray.map(element => {
        if (typeof element === "string") {
            return element;
        } else {
            return element.convertToScript();
        }
    }).join("\n");
}