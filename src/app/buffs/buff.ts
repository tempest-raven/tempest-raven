import { languageObject, sonnyElement, sonnyLanguage } from "../shared/types";

export class Buff {
    static attributeMap: Map<number, [string, (_: number) => number | string | null]> = new Map();
    static langStrings: languageObject;
    public attributes: Map<number, string | number> = new Map();

    constructor(
        public id: string, 
        public name: string,
        public element: sonnyElement
    ){

    }

    localizedDescription(language: sonnyLanguage = "ENGLISH"){
        let description = this.attributes.get(25) as string | undefined;
        if (description === undefined) {
            return "No description";
        }
        const replacerFunc = function(this: Buff, _: any, index: string | number, percent: any) {
            const value = this.attributes.get(+index) as number;
            const num = isNaN(value) ? value : Math.round(value * 100);
            return "\"" + num + (percent ? "%" : "") + "\"";
        }.bind(this);
        
        description = description.replaceAll(
                /\(?100 \* _root\.hackMove2\[(\d+)\]( ?\+ "%")?\)?/g, replacerFunc
            ).replaceAll(
                /\(?_root\.hackMove2\[(\d+)\] \* 100\)?()/g, replacerFunc
            );

        let parts = description.split(" + ");
        let parsedParts = parts.map((part: string) => {
            let match = /BUFF_DESC(\d)\[(\d+)\]/.exec(part);
            if (match !== null){
                const aux = "AUX" + match[1] as "AUX1" | "AUX2" | "AUX3";
                return Buff.langStrings[language][aux]![+match[2]];
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

    localizedName(language: sonnyLanguage = "ENGLISH"){
        let match = /BUFF_NAME\[(\d+)\]/.exec(this.name);
        if (match !== null){
            return Buff.langStrings[language]["AU"]![+match[1]];
        }
        return this.name;
    }

    setAttribute(attributeIndex: number, value: string){
        let transformedValue: string | number = value;
        if (attributeIndex !== 25 
            && !value.startsWith("_root") 
            && !value.startsWith("\"")){
            //Except for descriptions, almost everything else is a number
            transformedValue = +value; 
        }
        this.attributes.set(attributeIndex, transformedValue);
    }
}