import { Injectable } from '@angular/core';
import { Buff } from './buff';

@Injectable({
  providedIn: 'root'
})
export class BuffService {
  private static scriptLocation = "assets/data/sonny2/scripts/frame_42/DoAction_10.as";
  public buffList = new Map<string, Buff>();
  public request;

  constructor() {
    this.request = fetch(BuffService.scriptLocation).then(res => res.text()).then(rawScript => this.parseBuffScript(rawScript)); 
  }

  /**
   * Convert the raw script into `Buff` instances
   * @param rawScript The script to be parsed
   * @returns The parsed script
   */
  private parseBuffScript(rawScript: string){
    rawScript = rawScript.replace(/\r/g, "");
    let lines = rawScript.split("\n");
    let lastBuff: Buff | null = null;
    for (const line of lines) {
      let match: RegExpMatchArray | null = null;
      //Conditions ordered from most common to least commonly encountered
      if (match = line.match(/^_root.hackMove2\[(\d+)\] ?= ?(.+);/)){
        lastBuff!.setAttribute(+match[1], match[2]);
        continue;
      }
      if (match = line.match(/^addNewBuffKrin\((.+)\);/)){
        const buffParams = match[1].replace("\\'", "'").split(",").map(v => v.startsWith(`"`) ? JSON.parse(v) : v) as ConstructorParameters<typeof Buff>;
        lastBuff = new Buff(
          ...buffParams
        );
        this.buffList.set(buffParams[0], lastBuff);
        continue;
      }
    }
    return this.buffList;
  }
}
