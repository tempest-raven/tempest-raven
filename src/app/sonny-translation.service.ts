import { Injectable } from "@angular/core";
import { sonnyLanguage, languageObject } from "./shared/types";

@Injectable({ providedIn: "root" })
export class SonnyTranslationService {
  private static scriptLocation = "assets/data/sonny2/scripts/frame_41/DoAction.as";
  public langStrings: languageObject = {
    ENGLISH: {},
    GERMAN: {},
  };
  public request;

  constructor() {
    this.request = fetch(SonnyTranslationService.scriptLocation)
      .then(res => res.text())
      .then(rawScript => this.parseLangScript(rawScript));
  }

  /**
   * Parse the language script into an array matching its ActionScript structure
   */
  parseLangScript(rawScript: string) {
    rawScript = rawScript.replace(/\r/g, "");
    const lines = rawScript.split("\n");

    for (const line of lines) {
      const langMatch = line.match(
        /^KrinLang\.(ENGLISH|GERMAN)\.([A-Za-z0-9]+)(?:\[(\d+)\])? ?= ?"(.+)";/,
      );
      if (langMatch) {
        const language: sonnyLanguage = langMatch[1] as sonnyLanguage;
        const parsed = this.langStrings[language];
        const key = langMatch[2];
        const arrayIndex: number | undefined =
          langMatch[3] === undefined ? undefined : +langMatch[3];
        const value = langMatch[4].replace(/\\'/g, "'");
        if (arrayIndex === undefined) {
          parsed[key] = value;
        } else {
          if (parsed[key] === undefined) {
            parsed[key] = [] as string[];
          }
          if (Array.isArray(parsed[key])) {
            parsed[key][arrayIndex] = value;
          }
        }
      }
    }
    return this.langStrings;
  }
}
