import { languageObject, sonnyLanguage } from "../shared/types";

type equipSlot = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export class Item {
  static langStrings: languageObject;
  elementArray = [
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
    public level: number,
    public valueMultiplier: number
  ){
    
  }
  
  localizedName(language: sonnyLanguage = "ENGLISH"): string | undefined {
    return Item.langStrings[language]["ITEMNAME"]![this.id];
  }
  
  private static getStat(s_ratio: number, s_level: number, s_mode: boolean){
    let s_a = 0;
    let s_r = 0;
    if(s_level <= 0){
      return 0;
    }
    if(s_level <= 5){
      s_a = (9.25 * s_level + 45.75) / 4 * (s_ratio / 10);
    }
    else{
      s_a = (-0.0000213 * Math.pow(s_level,5) + 0.002 * Math.pow(s_level,4) - 0.0693 * Math.pow(s_level,3) + 1.43 * Math.pow(s_level,2) - 8.8533 * s_level + 39.5) * (s_ratio / 10);
    }
    if(s_level < 20){
      s_r = -0.01929824 * s_level + 0.71596;
    }
    else{
      s_r = 0.33;
    }
    if(s_mode == true){
      s_a *= s_r / 2;
    }
    if(s_mode == false){
      s_a *= 1 - s_r;
    }
    return s_a;
  }

  //Math.ceil(getStat(40,e + 3,false) * secondRatio[b] * (_root["KRINITEM" + itemKrinIDnow].statUpdater2[a_i] / 100))
  get vitality(){
    return Math.ceil(Item.getStat(40, this.level + 3, false) * this.weight() * this.rawStats.HealthUP / 100);
  }
  get strength(){
    return Math.ceil(Item.getStat(40, this.level + 3, false) * this.weight() * this.rawStats.StrengthUP / 100);
  }
  get magic(){
    return Math.ceil(Item.getStat(40, this.level + 3, false) * this.weight() * this.rawStats.MagicUP / 100);
  }
  get speed(){
    return Math.ceil(Item.getStat(40, this.level + 3, false) * this.weight() * this.rawStats.SpeedUP / 100);
  }
  get focus(){
    return this.rawStats.FocusUP;
  }
  get piercing(){
    return this.rawStats.PIU.map(per => Math.round((100 + 15 * (this.level + 3)) * this.weight() * (per / 70)));
  }
  get defense(){
    return this.rawStats.DIU.map(def => Math.round((100 + 15 * (this.level + 3)) * this.weight() * (def / 70)));
  }

  weight(){
    return Item.slotWeights[this.equipSlot];
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
  
  fullLevelRequirement(language: sonnyLanguage = "ENGLISH"){
    let lang = Item.langStrings[language];
    return `${lang["MENU"]![0]}${this.level} ${this.className(language)} ${this.slotName(language)}`;
  }
  
  flavorText(language: sonnyLanguage = "ENGLISH"){
    let text = Item.langStrings[language]["ITEMSAY"]![this.id] as string | 0;
    if (text === 0){
      return null;
    }
    return text;
  }
  
  respecValue(level: number){
    return 10 * Math.pow(level,1.5);
  }
  
  buyPrice(){
    if(this.equipSlot < 2){
      return Math.round(this.valueMultiplier * this.respecValue(this.level) * 3);
    } else {
      return Math.round(this.valueMultiplier * (this.weight() * 2.5) * this.respecValue(this.level) * 3);
    }
  }
  
  sellPrice(){
    return Math.ceil(this.buyPrice() * 0.15);
  }
  
}
