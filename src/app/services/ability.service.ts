import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';
import { Ability } from '../ability';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {
  private static scriptLocation = "assets/data/sonny2/scripts/frame_42/DoAction_6.as";
  public abilityList = new Map<number, Ability>();

  constructor(private http: HttpClient) {
    http.get(AbilityService.scriptLocation, {responseType: "text"}).pipe(
      retry({
        count: 2,
        delay: 500
      })
    ).subscribe({
      next: res => {
        this.parseAbilityScript(res);
      },
      error(err) {
        //TODO
      },
    });
  }

  get(id: number){
    return this.abilityList.get(id);
  }

  getAll(){
    return this.abilityList;
  }

  private parseAbilityScript(rawScript: string){
    rawScript = rawScript.replace(/\r/g, "");
    let lines = rawScript.split("\n");
    let lastAbilityId = 0;
    let lastAbility: Ability | null = null;
    for (const line of lines) {
      let match: ReturnType<String["match"]> = null;
      //Conditions ordered from most common to least commonly encountered

      //Ability edition
      if (match = line.match(/^_root.hackMove\[(\d+)\] ?= ?(.+);/)){
        //lastAbility existing is enforced in the actionScript itself
        lastAbility!.setAttribute(+match[1], match[2]);
        continue;
      }
      //New Ability
      if (match = line.match(/^addNewMove\((.+)\);/)){
        if (match[1] !== '"None"'){
          let abilityParams: ConstructorParameters<typeof Ability> = [
            lastAbilityId, 
            ...match[1].replace(/\\'/g, "'").split(",").map(v => JSON.parse(v))
          ] as ConstructorParameters<typeof Ability>;
          lastAbility = new Ability(...abilityParams);
          this.abilityList.set(lastAbilityId, lastAbility);
        }
        lastAbilityId++;
        continue;
      }
      //Skip ID holes
      if (match = line.match(/^MoveCount ?= ?(\d+);/)){
          lastAbilityId = +match[1];
      }
    }
  }
}

