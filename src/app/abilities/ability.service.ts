import { Injectable, inject } from "@angular/core";
import { Ability } from "./ability";
import { SonnyTranslationService } from "../sonny-translation.service";
import { requestService } from "../shared/types";

@Injectable({ providedIn: "root" })
export class AbilityService implements requestService<number> {
  private translationService = inject(SonnyTranslationService);

  private static scriptLocation = "assets/data/sonny2/scripts/frame_42/DoAction_6.as";
  public abilityList = new Map<number, Ability>();
  public request;

  constructor() {
    const translationService = this.translationService;

    const requests = Promise.all([
      translationService.request,
      fetch(AbilityService.scriptLocation).then(res => res.text()),
    ]).then(([langStrings, abilityScript]) => {
      Ability.langStrings = langStrings;
      return this.parseAbilityScript(abilityScript);
    });
    this.request = requests;
  }

  /**
   * Convert the raw script into `Ability` instances
   * @param rawScript The script to be parsed
   * @returns The parsed script
   */
  private parseAbilityScript(rawScript: string): Map<number, Ability> {
    rawScript = rawScript.replace(/\r/g, "");
    const lines = rawScript.split("\n");
    let lastAbilityId = 0;
    let lastAbility: Ability | null = null;
    for (const line of lines) {
      //Conditions ordered from most common to least commonly encountered

      //Ability edition
      const hackMoveMatch = line.match(/^_root.hackMove\[(\d+)\] ?= ?(.+);/);
      if (hackMoveMatch) {
        //lastAbility existing is enforced in the actionScript itself
        lastAbility!.setAttribute(+hackMoveMatch[1], hackMoveMatch[2]);
        continue;
      }
      //New Ability
      const newMoveMatch = line.match(/^addNewMove\((.+)\);/);
      if (newMoveMatch) {
        if (newMoveMatch[1] !== '"None"') {
          const abilityParams: ConstructorParameters<typeof Ability> = [
            lastAbilityId,
            ...newMoveMatch[1]
              .replace(/\\'/g, "'")
              .split(",")
              .map(v => JSON.parse(v)),
          ] as ConstructorParameters<typeof Ability>;
          lastAbility = new Ability(...abilityParams);
          this.abilityList.set(lastAbilityId, lastAbility);
        }
        lastAbilityId++;
        continue;
      }
      //Skip ID holes
      const moveCountMatch = line.match(/^MoveCount ?= ?(\d+);/);
      if (moveCountMatch) {
        lastAbilityId = +moveCountMatch[1];
      }
    }
    return this.abilityList;
  }
}
