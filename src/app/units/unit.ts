import { Ability } from "../abilities/ability";
import { languageObject } from "../shared/types";

export class Unit {
  static langStrings: languageObject;

  public movesA: Ability[] = [];
  public movesD: Ability[] = [];
  public movesABS: [ab: Ability, phase: number][] = [];
  public agressionArray: number[] = [0,0,0,0,0];
  public PER: number[] = [];
  public DEF: number[] = [];
  public model: string[] = ["MODEL1","ONE","ONE","M"];
  public equipment = [0,0,0,0,0,0,0];
  public skinSetter: string | 0 = 0;
  public voiceHit: string[] = [];
  public voiceDie?: string;

  constructor(
    public id: number,
    public internalName: string,
    public vitalityScale: number,
    public strengthScale: number,
    public magicScale: number,
    public speedScale: number,
    public focus: number,
  ){

  }


  middleHPrandomness(){
    return this.agressionArray[0];
  }

  agressiveHP(){
    return Math.min(this.agressionArray[1], 100);
  }

  defensiveHP(){
    return Math.max(this.agressionArray[2], 0);
  }

  middleHP(){
    return this.agressiveHP() - this.defensiveHP();
  }

  targestWeakest(){
    return this.agressionArray[3];
  }

  minimumFocus(){
    return this.agressionArray[4];
  }

  //Last defensive move
  focusMove(){
    if (this.movesD.length === 0){
      return null;
    }
    return this.movesD[this.movesD.length - 1];
  }
}
