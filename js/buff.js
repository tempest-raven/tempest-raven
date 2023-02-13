//Defined in frame_42/DoAction_10

class Buff {
    constructor(params){
        this.id = JSON.parse(params[0]);
        this.name = params[1];
        this.type = JSON.parse(params[2]);
        this.attributes = new Map();
        //Internal
        this.attributeOrder = [];
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
        this.attributes.set(attributeIndex, value);
    }
}