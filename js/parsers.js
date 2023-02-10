/**
 * Convert the raw script into `Ability` instances where applicable 
 * while keeping other pieces of the original code
 * @param {string} rawScript The script to be parsed
 * @returns {Array<Ability | string>} The parsed script
 */
function parseAbilityScript(rawScript){
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