"use strict";
//Defined in frame_42/DoAction_10

class Buff {
    /** @type {Map<number, [string, (number) => number | string]>} */
    static attributeMap = new Map();

    constructor(params){
        this.id = JSON.parse(params[0]);
        this.name = params[1];
        this.element = JSON.parse(params[2]);
        this.attributes = new Map();
        //Internal
        this.attributeOrder = [];
    }

    convertToScript(){
        let script = "addNewBuffKrin(" 
            + JSON.stringify(this.id)
            + ","
            + this.name
            + ","
            + JSON.stringify(this.element)
            + ");";

        for (const index of this.attributeOrder){
            let value = this.attributes.get(index);
            if (value !== undefined && value !== null) {
                //Avoid adding extra quotes to strings
                if (typeof value !== "string"){
                    value = JSON.stringify(value);
                }
                script += "\r\n"
                + `_root.hackMove2[${index}] = ${value};`;
            }
        }

        return script;
    }

    localizedDescription(langStrings){
        if (this.attributes.get(25) === undefined) {
            return "No description";
        }
        const replacerFunc = function(_, index, percent) {
            const value = this.attributes.get(+index);
            const num = isNaN(value) ? value : Math.round(value * 100);
            return "\"" + num + (percent ? "%" : "") + "\"";
        }.bind(this);
        let description = this.attributes.get(25);
        description = description.replaceAll(
                /\(?100 \* _root\.hackMove2\[(\d+)\]( ?\+ "%")?\)?/g, replacerFunc
            ).replaceAll(
                /\(?_root\.hackMove2\[(\d+)\] \* 100\)?()/g, replacerFunc
            );

        let parts = description.split(" + ");
        let parsedParts = parts.map(part => {
            let match = /BUFF_DESC(\d)\[(\d+)\]/.exec(part);
            if (match !== null){
                return langStrings["AUX" + match[1]][match[2]];
            }
            match = /_root\.hackMove2\[(\d+)\]/.exec(part);
            if (match !== null){
                return this.attributes.get(+match[1]);
            }
            if (/^[A-Za-z_]/.test(part)){
                return part;
            }
            return JSON.parse(part);
        });
        
        return parsedParts.join("");
    }

    localizedName(langStrings){
        let match = /BUFF_NAME\[(\d+)\]/.exec(this.name);
        if (match !== null){
            return langStrings["AU"][+match[1]];
        }
        return this.name;
    }

    setAttribute(attributeIndex, value){
        if (!this.attributeOrder.includes(attributeIndex)){
            this.attributeOrder.push(attributeIndex);
        }
        if (attributeIndex !== 25 
            && !value.startsWith("_root") 
            && !value.startsWith("\"")){
            //Except for descriptions, almost everything else is a number
            value = +value; 
        }
        this.attributes.set(attributeIndex, value);
    }
}

const identity = (_) => _;
let toPercentSigned = v => (v > 0 ? "+" : "") + toPercent(v);
let scaleFunction = v => v > 0 ? `${toPercent(v)} damage` : `${toPercent(-v)} healing`;
//We do not need to set 0 and 1 because they're built-in
Buff.attributeMap
    .set(3, ["Strength modifier", toPercentSigned])
    .set(5, ["Instinct modifier", toPercentSigned])
    .set(7, ["Speed modifier", toPercentSigned])
    .set(9, ["Health modifier", toPercentSigned])
    .set(10, ["Flat direct damage dealt", identity])
    .set(11, ["Direct damage dealt", toPercentSigned])
    .set(12, ["Flat direct damage taken", identity])
    .set(13, ["Direct damage taken", toPercentSigned])
    .set(14, ["Flat effect over time", 
        v => v > 0 ? `${v} damage` : `${-v} healing`])
    .set(15, ["Focus granted", v => -v])
    .set(16, ["Duration", v => v > 0 ? `${v} turn(s)` : "Passive"]) //mandatory
    .set(17, ["Stunned", _ => null])
    .set(19, ["Flat shield", identity])
    .set(20, ["Buff or debuff", v => v === 1 ? "buff" : "debuff"])
    .set(23, ["Element piercing", toPercentSigned])
    .set(24, ["Element defence", toPercentSigned])
    //Skip 25
    .set(26, ["Subversion", _ => "Swaps healing and damage"])
    .set(27, ["Unstackable", _ => null])
    .set(28, ["Strength scale", scaleFunction])
    .set(29, ["Instinct scale", scaleFunction])
    .set(30, ["Speed scale", scaleFunction])
    .set(31, ["Apply visual effect", identity]) //TODO: list them
    .set(32, ["Dispel resistance", toPercent])
    .set(33, ["Health scale", scaleFunction])
    .set(35, ["Healing received", toPercentSigned])
    .set(36, ["Healing received reduction", toPercent])
    .set(37, ["Healing done", toPercentSigned])
    .set(38, ["Shield strength scale", toPercent])
    .set(39, ["Shield instinct scale", toPercent])
    .set(40, ["Shield speed scale", toPercent])
    .set(41, ["Shield health scale", toPercent])
    .set(42, ["Target's strength scale", toPercent])
    .set(43, ["Target's instinct scale", toPercent])
    .set(44, ["Target's speed scale", toPercent])
    .set(45, ["Target's health scale", scaleFunction])
    .set(46, ["Periodic damage taken", toPercentSigned])
    .set(47, ["Periodic healing received", toPercentSigned])
    .set(48, ["Periodic damage done", toPercentSigned])
    .set(49, ["Maximum focus", identity])
    .set(50, ["Silenced", v => null])
