"use strict";
/**
 * Convert the raw script into `Ability` instances where applicable 
 * while keeping other pieces of the original code
 * @param {string} rawScript The script to be parsed
 * @returns {Array<Ability | string>} The parsed script
 */
function parseAbilityScript(rawScript){
    /* 
    Minor injection 
    This will allow defining proper skill names 
    without needing to edit multiple files
    */
    let original =
    `short[17] = _root.KrinLang[KLangChoosen].SKILLNAME[r];`;
    let replacement = 
    `if (r == 0)
    {
        short[17] = a;
    }
    else
    {
        var localisedString = _root.KrinLang[KLangChoosen].SKILLNAME[r];
        short[17] = localizedString;
    }`;
    rawScript = rawScript.replace(original, replacement);
    /* end injection */
    let lines = rawScript.split("\r\n");
    let abilityId = 0;
    let lastAbility = null;
    let parseArray = [];
    for (const line of lines) {
        /** @type {RegExpMatchArray | null} */
        let match = null;
        //Conditions ordered from most common to least commonly encountered
        if (match = line.match(/^_root.hackMove\[(\d+)\] ?= ?(.+);/)){
            lastAbility.setAttribute(+match[1], match[2]);
            continue;
        }
        if (match = line.match(/^addNewMove\((.+)\);/)){
            lastAbility = new Ability(
                match[1].replace("\\'", "'").split(",")
            );
            lastAbility.id = abilityId;
            parseArray.push(lastAbility);
            abilityId++;
            continue;
        }
        if (match = line.match(/^MoveCount ?= ?(\d+);/)){
            abilityId = +match[1];
        }
        parseArray.push(line);
    }
    return parseArray;
}

/**
 * Convert the raw script into `Buff` instances where applicable 
 * while keeping other pieces of the original code
 * @param {string} rawScript The script to be parsed
 * @returns {Array<Buff | string>} The parsed script
 */
function parseBuffScript(rawScript){
    let lines = rawScript.split("\r\n");
    let lastBuff = null;
    let parseArray = [];
    for (const line of lines) {
        /** @type {RegExpMatchArray | null} */
        let match = null;
        //Conditions ordered from most common to least commonly encountered
        if (match = line.match(/^_root.hackMove2\[(\d+)\] ?= ?(.+);/)){
            lastBuff.setAttribute(+match[1], match[2]);
            continue;
        }
        if (match = line.match(/^addNewBuffKrin\((.+)\);/)){
            lastBuff = new Buff(
                match[1].replace("\\'", "'").split(",")
            );
            parseArray.push(lastBuff);
            continue;
        }
        parseArray.push(line);
    }
    return parseArray;
}

function parseLangScript(rawScript){
    let lines = rawScript.split("\r\n");
    let parsed = {};
    for (const line of lines) {
        /** @type {RegExpMatchArray | null} */
        let match = null;
        if (match = line.match(
            /^KrinLang\.ENGLISH\.([A-Za-z0-9]+)(?:\[(\d+)\])? ?= ?\"(.+)\";/
        )){
            const key = match[1];
            const arrayIndex = match[2];
            const value = match[3].replace("\\'", "'");
            if (arrayIndex === undefined){
                parsed[key] = value;
            } else {
                if (parsed[key] === undefined){
                    parsed[key] = [];
                }
                parsed[key][arrayIndex] = value;
            }
        }
    }
    return parsed;
}