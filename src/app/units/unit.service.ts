import { Injectable } from '@angular/core';
import { requestService } from '../shared/types';
import { SonnyTranslationService } from '../sonny-translation.service';
import { Unit } from './unit';
import { AbilityService } from '../abilities/ability.service';
import { Ability } from '../abilities/ability';

@Injectable({
  providedIn: 'root'
})
export class UnitService implements requestService {
  private static scriptLocation = "assets/data/sonny2/scripts/frame_42/DoAction_13.as";
  public unitList = new Map<number, Unit>();
  request: Promise<typeof this.unitList>;

  constructor(
    private translationService: SonnyTranslationService,
    private abilityService: AbilityService
  ) {
    const requests = Promise.all([
      translationService.request, 
      abilityService.request,
      fetch(UnitService.scriptLocation).then(res => res.text())
    ]).then(([langStrings, _, unitScript]) => {
      Unit.langStrings = langStrings;
      return this.parseUnitScript(unitScript);
    });
    this.request = requests;
  }
  
  parseUnitScript(rawScript: string): Map<number, Unit> {
    rawScript = rawScript.replace(/\r/g, "");
    let lines = rawScript.split("\n");
    let lastUnitId = 0;
    let lastUnit: Unit | null = null;
    for (const line of lines) {
      let match: RegExpMatchArray | null = null;
      
      //jesivie.movesA = [2,3,5];
      if (match = line.match(/^jesivie\.(\w+) ?= ?(.+);/)){
        const unitProp = match[1] as "movesA" | "movesABS" | "movesD" | "agressionArray" | "model" | "skinSetter" | "PER" | "DEF" | "equipment" | "voiceHit" | "voiceDie" ;
        let value: string | string[] | number[] | [number, number][] | Ability[] | [Ability, number][] = JSON.parse(match[2]);
        if (unitProp === "movesA" || unitProp === "movesD"){
          value = (value as number[]).map(v => this.abilityService.abilityList.get(v)!);
        }
        if (unitProp === "movesABS"){
          value = (value as [number, number][]).map(([ab, phase]) => [this.abilityService.abilityList.get(ab)!, phase] as [Ability, number]);
        }
        /* @ts-ignore */
        lastUnit![unitProp] = value;
        continue;
      }

      //createNewUnitKrin("Prison Guard",10,10,5,12,100);
      if (match = line.match(/^createNewUnitKrin\((.+)\);/)){
        let unitParams = [
          lastUnitId, 
          ...match[1].replace(/\\'/g, "'").split(",").map(v => JSON.parse(v))
        ] as ConstructorParameters<typeof Unit>;
        lastUnit = new Unit(...unitParams);
        this.unitList.set(lastUnitId, lastUnit);
        lastUnitId++;
        continue;
      }

      //createUnitKrinCount = 99;
      if (match = line.match(/createUnitKrinCount ?= ?(\d+);/)){
        lastUnitId = +match[1];
      }
    }
    return this.unitList;
  }
  
}
