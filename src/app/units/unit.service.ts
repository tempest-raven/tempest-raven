import { Injectable, inject } from "@angular/core";
import { requestService } from "../shared/types";
import { SonnyTranslationService } from "../sonny-translation.service";
import { Unit } from "./unit";
import { AbilityService } from "../abilities/ability.service";
import { Ability } from "../abilities/ability";

@Injectable({ providedIn: "root" })
export class UnitService implements requestService<number> {
  private translationService = inject(SonnyTranslationService);
  private abilityService = inject(AbilityService);

  private static scriptLocation = "assets/data/sonny2/scripts/frame_42/DoAction_13.as";
  public unitList = new Map<number, Unit>();
  request: Promise<typeof this.unitList>;

  constructor() {
    const translationService = this.translationService;
    const abilityService = this.abilityService;

    const requests = Promise.all([
      translationService.request,
      abilityService.request,
      fetch(UnitService.scriptLocation).then(res => res.text()),
    ]).then(([langStrings, , unitScript]) => {
      Unit.langStrings = langStrings;
      return this.parseUnitScript(unitScript);
    });
    this.request = requests;
  }

  parseUnitScript(rawScript: string): Map<number, Unit> {
    rawScript = rawScript.replace(/\r/g, "");
    const lines = rawScript.split("\n");
    let lastUnitId = 0;
    let lastUnit: Unit | null = null;
    for (const line of lines) {
      //jesivie.movesA = [2,3,5];
      const unitMatch = line.match(/^jesivie\.(\w+) ?= ?(.+);/);
      if (unitMatch) {
        const unitProp = unitMatch[1] as
          | "movesA"
          | "movesABS"
          | "movesD"
          | "agressionArray"
          | "model"
          | "skinSetter"
          | "PER"
          | "DEF"
          | "equipment"
          | "voiceHit"
          | "voiceDie";
        let value:
          | string
          | string[]
          | number[]
          | [number, number][]
          | Ability[]
          | [Ability, number][] = JSON.parse(unitMatch[2]);
        if (unitProp === "movesA" || unitProp === "movesD") {
          value = (value as number[])
            .map(v => this.abilityService.abilityList.get(v))
            .filter(v => v !== undefined);
        }
        if (unitProp === "movesABS") {
          value = (value as [number, number][])
            .map(([ab, phase]) => [this.abilityService.abilityList.get(ab), phase])
            .filter(v => v[0] !== undefined) as [Ability, number][];
        }
        /* @ts-expect-error Abusing dynamic types */
        lastUnit![unitProp] = value;
        continue;
      }

      //createNewUnitKrin("Prison Guard",10,10,5,12,100);
      const newUnitMatch = line.match(/^createNewUnitKrin\((.+)\);/);
      if (newUnitMatch) {
        const unitParams = [
          lastUnitId,
          ...newUnitMatch[1]
            .replace(/\\'/g, "'")
            .split(",")
            .map(v => JSON.parse(v)),
        ] as ConstructorParameters<typeof Unit>;
        lastUnit = new Unit(...unitParams);
        this.unitList.set(lastUnitId, lastUnit);
        lastUnitId++;
        continue;
      }

      //createUnitKrinCount = 99;
      const countMatch = line.match(/createUnitKrinCount ?= ?(\d+);/);
      if (countMatch) {
        lastUnitId = +countMatch[1];
      }
    }
    return this.unitList;
  }
}
