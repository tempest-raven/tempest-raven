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

  //FIXME: improve detection to match the ingame AI's
  focusMove(){
    const moveArrays = [this.movesD, this.movesA];
    for (let i = 0; i < moveArrays.length; i++) {
      const moves = moveArrays[i];
      for (let index = 0; index < moves.length; index++) {
        const ability = moves[index];
        if (ability.moveType === "Focus"){
          return ability;
        }
      }
    }
    return null;
  }

  phaseMoves(){
    let groups: Ability[][] = [];
    //this.movesABS.sort((a, b) => a[1] - b[1]);
    this.movesABS.forEach(([ab, phasenum]) => {
      if (groups[phasenum] === undefined){
        groups[phasenum] = [];
      }
      groups[phasenum].push(ab);
    });
    return groups;
  }
}
