import { sonnyElement } from "./sonnyElement";
import { pseudoBool } from "./types";

export class Ability {

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
    ] as const;

    static secondArrayMap: Map<number, keyof Ability> = new Map();

    element: sonnyElement = "Physical"; //0
    strengthBonus = 0; //1 (unused)
    strengthScale = 0; //2
    instinctBonus = 0; //3 (unused)
    instinctScale = 0; //4
    speedBonus = 0; //5 (unused)
    speedScale = 0; //6
    critChanceBonus = 0; //7
    critChanceMultiplier = 1; //8 (unused)
    flatModifier = 0; //9
    globalMultiplier = 1; //10 (unused)
    focusScale = 0; //11 (goes alongside 25)
    healthScale = 0; //12
    buffId: 0 | string = 0; //13
    buffApplyChance = 1; //14
    dispelElementArray: [0] | sonnyElement[] = [0]; //15
    dispelCount = 0; //16
    descriptionCode = "No Tooltip assigned"; //17
    //normally auto-generated, but can be overriden
    rawCostString: string; //18
    dispelPositive: -1 | 1 = 1; //19
    multiTarget: pseudoBool = 0; //20 (unused)
    buffSelfTarget: pseudoBool = 0; //21
    dispelChance = 1; //22
    buffElementRequirement: sonnyElement = "Physical"; //23
    buffElementReqCount = 0; //24
    baseMultiplier = 1; //25

    customAttributes: Map<number, any> = new Map();
    
	constructor(
        public id: number,
        public internalName: string,
        public canTargetSelf: pseudoBool,
        public canTargetEnemy: pseudoBool,
        public canTargetAlly: pseudoBool,
        public focusCost: number,
        public flatHPCost: number,
        public cooldown: number,
        public skillAmount: number,
        public accuracyMultiplier: number,
        public projectileType: "Melee" | "Shock" | "Missile",
        public color: string,
        public animation: string,
        public animationVFX: string,
        public moveType: "Full Damage" | "Focus" | "Heal" | "Attack", //attack is unintended
        public unknownParam14: any, //unknown but it's always 1
        public percentHPCost: number,
        public localeNameId: number,
        public soundFX: string
    ){

        //we do this one because the cost string could be overwrote in theory
        this.rawCostString = this.getCostString();
        //this.initializeData(parameters);
    }

    getCostString(){
        const cdString = this.cooldown ? `. (CD: ${this.cooldown})` : "";
        //Accepts any falsy values
        if (!this.focusCost
            && !this.flatHPCost
            && !this.percentHPCost){
                return "This move costs nothing" + cdString;
            }
        let tmpStringBits: string[] = [];
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

    /*initializeData(parameters: string[]){
        for (let index = 0; index < parameters.length; index++) {
            const paramName = Ability.parameterArray[index];
            const paramValue = parameters[index];
            this[paramName] = JSON.parse(paramValue);
        }
    }*/

    localizedDescription(langStrings: { [x: string]: { [x: string]: any; }; }){
        if (!this.descriptionCode) {
            return "No Tooltip assigned";
        }
        const replacerFunc = function(this:Ability, _: unknown, index: string, percent: string) {
            const value = this[Ability.secondArrayMap.get(+index)!];
            const num = isNaN(value) ? value : Math.round(value * 100);
            return "\"" + num + (percent ? "%" : "") + "\"";
        }.bind(this);
        let description = this.descriptionCode;
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
                return this[Ability.secondArrayMap.get(+match[1])!];
            }
            if (/^[A-Za-z_]/.test(part)){
                return part;
            }
            return JSON.parse(part);
        });
        
        return parsedParts.join("");
    }

    localizedName(langStrings: { [x: string]: { [x: string]: any; }; }){
        return langStrings["SKILLNAME"][this.localeNameId];
    }

    /**
     * Sets an attribute defined using `_root.hackMove[]` assignments
     * @param {number} attributeIndex The array index for the attribute
     * @param {string} value The raw value to be assigned
     */
    setAttribute(attributeIndex: number, value: string){
        const attributeName = Ability.secondArrayMap.get(attributeIndex);
        if (attributeName === undefined){
            this.customAttributes.set(attributeIndex, value);
            return;
        }
        //Add some robustness if values are pulled from *other* hackMoves
        let match: ReturnType<String["match"]>;
        if (match = value.match(/^_root.hackMove\[(\d+)\]/)){
            let attributeName = Ability.secondArrayMap.get(+match[1])!;
            value = "" + this[attributeName];
        }
        let tmpVal = value;
        try {
            /*
            This is used to detect variable use,
            as this will throw for assignments using variables
            such as in most descriptions and some shadow/ice moves
            */
            tmpVal = JSON.parse(value);
        } catch (e) {
            //Nothing to do here
        } finally {
            /** @ts-expect-error */
            this[attributeName] = tmpVal;
        }
    }
}

Ability.secondArrayMap
    .set(0, "element")
    .set(2, "strengthScale")
    .set(4, "instinctScale")
    .set(6, "speedScale")
    .set(7, "critChanceBonus")
    .set(9, "flatModifier")
    .set(11, "focusScale")
    .set(12, "healthScale")
    .set(13, "buffId")
    .set(14, "buffApplyChance")
    .set(15, "dispelElementArray")
    .set(16, "dispelCount")
    .set(17, "descriptionCode")
    .set(19, "dispelPositive")
    .set(21, "buffSelfTarget")
    .set(22, "dispelChance")
    .set(23, "buffElementRequirement")
    .set(24, "buffElementReqCount")
    .set(25, "baseMultiplier")
