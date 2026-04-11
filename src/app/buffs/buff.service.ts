import { Injectable, inject } from "@angular/core";
import { Buff } from "./buff";
import { SonnyTranslationService } from "../sonny-translation.service";
import { requestService } from "../shared/types";

@Injectable({ providedIn: "root" })
export class BuffService implements requestService<string> {
  private translationService = inject(SonnyTranslationService);

  private static scriptLocation = "assets/data/sonny2/scripts/frame_42/DoAction_10.as";
  public buffList = new Map<string, Buff>();
  public request;

  constructor() {
    const translationService = this.translationService;

    const requests = Promise.all([
      translationService.request,
      fetch(BuffService.scriptLocation).then(res => res.text()),
    ]).then(([langStrings, buffScript]) => {
      Buff.langStrings = langStrings;
      return this.parseBuffScript(buffScript);
    });
    this.request = requests;
  }

  /**
   * Convert the raw script into `Buff` instances
   * @param rawScript The script to be parsed
   * @returns The parsed script
   */
  private parseBuffScript(rawScript: string) {
    rawScript = rawScript.replace(/\r/g, "");
    const lines = rawScript.split("\n");
    let lastBuff: Buff | null = null;
    for (const line of lines) {
      //Conditions ordered from most common to least commonly encountered
      const hackMoveMatch = line.match(/^_root.hackMove2\[(\d+)\] ?= ?(.+);/);
      if (hackMoveMatch) {
        lastBuff!.setAttribute(+hackMoveMatch[1], hackMoveMatch[2]);
        continue;
      }
      const newBuffMatch = line.match(/^addNewBuffKrin\((.+)\);/);
      if (newBuffMatch) {
        const buffParams = newBuffMatch[1]
          .replace("\\'", "'")
          .split(",")
          .map(v => (v.startsWith(`"`) ? JSON.parse(v) : v)) as ConstructorParameters<typeof Buff>;
        lastBuff = new Buff(...buffParams);
        this.buffList.set(buffParams[0], lastBuff);
        continue;
      }
    }
    return this.buffList;
  }
}
