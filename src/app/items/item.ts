import { languageObject, sonnyLanguage } from "../shared/types";

type equipSlot = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class Item {
  static langStrings: languageObject;
  static elementArray = [
    "Physical",
    "Magic",
    "Ice",
    "Fire",
    "Lightning",
    "Earth",
    "Shadow",
    "Poison"
  ];
  static slotWeights = [0,0,0.14,0.14,0.1,0.14,0.1,0.2,0.2,0.4];
  
  public appearance: string = "NINJA";
  /*public vitalityWeight: number = 0;
  public strengthWeight: number = 0;
  public magicWeight: number = 0;
  public speedWeight: number = 0;
  public focusWeight: number = 0;
  public piercingWeights = [0,0,0,0,0,0,0,0];
  public defenseWeights = [0,0,0,0,0,0,0,0];*/
  public rawStats = {
    HealthUP : 0,
    StrengthUP : 0, 
    MagicUP : 0, //Instinct in Sonny 2
    SpeedUP : 0,
    FocusUP : 0,
    PIU : [0,0,0,0,0,0,0,0],
    DIU : [0,0,0,0,0,0,0,0],
  }
  
  constructor(
    public id: number,
    public internalName: string,
    public equipSlot: equipSlot,
    public rarity: "Common" | "Uncommon" | "Rare",
    public classRequirement: number,
    public levelRequirement: number,
    public sellPriceMultiplier: number
  ){
    
  }

  private className(language: sonnyLanguage = "ENGLISH"){
    if (this.classRequirement === 0){
      return "";
    }
    return Item.langStrings[language]["CLASS"]![this.classRequirement - 1];
  }

  private slotName(language: sonnyLanguage = "ENGLISH"){
    if (this.equipSlot < 2){
      return "";
    }
    return Item.langStrings[language]["ITEMSS"]![this.equipSlot - 2];
  }

  flavorText(language: sonnyLanguage = "ENGLISH"){
    let text = Item.langStrings[language]["ITEMSAY"]![this.id] as string | 0;
    if (text === 0){
      return null;
    }
    return text;
  }

  fullLevelRequirement(language: sonnyLanguage = "ENGLISH"){
    let lang = Item.langStrings[language];
    return `${lang["MENU"]![0]}${this.levelRequirement} ${this.className(language)} ${this.slotName(language)}`;
  }

  itemName(language: sonnyLanguage = "ENGLISH"): string | undefined {
    return Item.langStrings[language]["ITEMNAME"]![this.id];
  }

}
