"use strict";
//Defined in frame_42/DoAction_6

class Ability {

    /** @type {Array<keyof Ability>} */
    static parameterArray = [
        "name",
        "canTargetSelf",
        "canTargetEnemy",
        "canTargetAlly",
        "focusCost",
        "flatHPCost",
        "cooldown",
        "skillAmount",
        "accuracyMultiplier",
        "projectileType",
        "color",
        "animation",
        "animationVFX",
        "moveType",
        "unknownParam14", //unknown but it's always 1
        "percentHPCost",
        "localeNameId",
        "soundFX"
    ];

    /** @type {Map<number, keyof Ability>} */
    static secondArrayMap = new Map();

	constructor(parameters = []){
        //Identifiers
        this.name = null; //Internal name
        this.id = null; //Not explicitly defined, auto-incremented

        //Internal
        this.attributeOrder = [];

        //Important data
        this.element = null; //Physical by default
        this.cooldown = null;
        this.skillAmount = null;
        this.moveType = null; //Full Damage, Focus, Heal

        //Targeters
        this.canTargetSelf = null; //1 or 0
        this.canTargetEnemy = null; //1 or 0
        this.canTargetAlly = null; //1 or 0

        //Costs and requirements
        this.focusCost = null;
        this.flatHPCost = null;
        this.percentHPCost = null;
        this.buffElementRequirement = null;
        this.buffElementReqCount = null;

        //Scalings
        this.strengthScale = null;
        this.instinctScale = null;
        this.speedScale = null;
        this.healthScale = null; //max HP, not vitality
        this.flatModifier = null; //focus gain/loss or flat damage bonus
        this.accuracyMultiplier = null;
        this.critChanceMultiplier = null;
        this.baseMultiplier = null;
        this.focusScale = null; //additive with baseMultiplier

        //Buff effects
        this.buffId = null;
        this.buffApplyChance = null;
        this.buffTarget = null;//1 for self, 0 for target

        //Dispel effects
        this.dispelElementArray = [];
        this.dispelCount = null;
        this.dispelPositive = null;//1 for buffs, -1 for debuffs

        //Other skill data
        this.unknownParam14; //Unused
        this.unknownParam22; //Set to 1 in rare skills
        
        //Localized text
        this.localeNameId = null;
        this.description = null;
        
        //Visuals and sounds
        this.projectileType = null; //Melee, Shock, Missile
        this.color = null; //in 0x000000 format
        this.animation = null;
        this.animationVFX = null;
        this.soundFX = null;

        this.initializeData(parameters);
    }

    convertToScript(){
        let baseParamList = Ability.parameterArray
            .map(attribute => this[attribute])
            .filter(value => value !== undefined && value !== null);

        let script = "addNewMove(" 
            + JSON.stringify(baseParamList).slice(1,-1)
            + ");";
        
        let orderedIndexes = this.attributeOrder;
        for (const index of Ability.secondArrayMap.keys()){
            if (!orderedIndexes.includes(index)){
                orderedIndexes.push(index);
            }
        }

        for (const index of orderedIndexes){
            let attribute = Ability.secondArrayMap.get(index);
            let value = this[attribute];
            //Exclude undefined, null and empty arrays
            if (value !== undefined && value !== null
                && (!Array.isArray(value) || value.length > 0)) {
                //Avoid adding extra quotes to strings
                if (typeof value !== "string"){
                    value = JSON.stringify(value);
                }
                script += "\r\n"
                + `_root.hackMove[${index}] = ${value};`;
            }
        }

        return script;
    }

    getCostString(){
        const cdString = this.cooldown ? `. (CD: ${this.cooldown})` : "";
        //Accepts any falsy values
        if (!this.focusCost
            && !this.flatHPCost
            && !this.percentHPCost){
                return "This move costs nothing" + cdString;
            }
        let tmpStringBits = [];
        if (this.focusCost){
            tmpStringBits.push(`${this.focusCost} Focus`);
        }
        if (this.flatHPCost){
            tmpStringBits.push(`${this.flatHPCost} Health`);
        }
        if (this.percentHPCost){
            tmpStringBits.push(`${100 * this.percentHPCost}% of Total Health`);
        }
        return "Costs " + tmpStringBits.join(" and ") + cdString;
    }

    initializeData(parameters){
        for (let index = 0; index < parameters.length; index++) {
            const paramName = Ability.parameterArray[index];
            const paramValue = parameters[index];
            this[paramName] = JSON.parse(paramValue);
        }
    }

    localizedDescription(langStrings){
        if (!this.description) {
            return "No Tooltip assigned";
        }
        const replacerFunc = function(_, index, percent) {
            const value = this[Ability.secondArrayMap.get(+index)];
            const num = isNaN(value) ? value : Math.round(value * 100);
            return "\"" + num + (percent ? "%" : "") + "\"";
        }.bind(this);
        let description = this.description;
        description = description.replaceAll(
                /\(?100 \* _root\.hackMove\[(\d+)\]( ?\+ "%")?\)?/g, replacerFunc
            ).replaceAll(
                /\(?_root\.hackMove\[(\d+)\] \* 100\)?()/g, replacerFunc
            );

        let parts = description.split(" + ");
        let parsedParts = parts.map(part => {
            let match = /krinABC(\d)\[(\d+)\]/.exec(part);
            if (match !== null){
                if (match[1] === "1"){
                    match[1] = "";
                }
                return langStrings["SKILLTIP" + match[1]][match[2]];
            }
            match = /_root\.hackMove\[(\d+)\]/.exec(part);
            if (match !== null){
                return this[Ability.secondArrayMap.get(+match[1])];
            }
            if (/^[A-Za-z_]/.test(part)){
                return part;
            }
            return JSON.parse(part);
        });
        
        return parsedParts.join("");
    }

    localizedName(langStrings){
        return langStrings["SKILLNAME"][this.localeNameId];
    }

    /**
     * Sets an attribute defined using `_root.hackMove[]` assignments
     * @param {number} attributeIndex The array index for the attribute
     * @param {string} value The raw value to be assigned
     */
    setAttribute(attributeIndex, value){
        if (!this.attributeOrder.includes(attributeIndex)){
            this.attributeOrder.push(attributeIndex);
        }
        const attributeName = Ability.secondArrayMap.get(attributeIndex);
        let tmpVal = value;
        try {
            /*
            This is used to detect variable use,
            as this will throw for assignments using variables
            such as in most descriptions and some shadow/ice moves
            */
            JSON.parse(value);
            /*
            Preserve quotes around simple string assignments
            while still processing numbers and arrays
            */
            if (!value.startsWith('"')){
                tmpVal = JSON.parse(value);
            }
        } catch (e) {
            //Nothing to do here
        } finally {
            this[attributeName] = tmpVal;
        }
    }
}

Ability.secondArrayMap
    .set(0, "element")
    .set(2, "strengthScale")
    .set(4, "instinctScale")
    .set(6, "speedScale")
    .set(7, "critChanceMultiplier")
    .set(9, "flatModifier")
    .set(11, "focusScale")
    .set(12, "healthScale")
    .set(13, "buffId")
    .set(14, "buffApplyChance")
    .set(15, "dispelElementArray")
    .set(16, "dispelCount")
    .set(17, "description")
    .set(19, "dispelPositive")
    .set(21, "buffTarget")
    .set(22, "unknownParam22")
    .set(23, "buffElementRequirement")
    .set(24, "buffElementReqCount")
    .set(25, "baseMultiplier")