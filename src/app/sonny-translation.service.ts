import { Injectable } from '@angular/core';
import { sonnyLanguage, languageObject } from './shared/types';

@Injectable({
  providedIn: 'root'
})
export class SonnyTranslationService {
  private static scriptLocation = "assets/data/sonny2/scripts/frame_41/DoAction.as";
  public langStrings: languageObject = {
    ENGLISH: {},
    GERMAN: {}
  }
  public request;
  
  constructor() {
    this.request = fetch(SonnyTranslationService.scriptLocation).then(res => res.text()).then(rawScript => this.parseLangScript(rawScript)); 
  }

  /**
   * Parse the language script into an array matching its ActionScript structure
   */
  parseLangScript(rawScript: string){

    rawScript = rawScript.replace(/\r/g, "");
    let lines = rawScript.split("\n");
    
    for (const line of lines) {
      let match: RegExpMatchArray | null = null;
      if (match = line.match(
        /^KrinLang\.(ENGLISH|GERMAN)\.([A-Za-z0-9]+)(?:\[(\d+)\])? ?= ?\"(.+)\";/
      )){
        
        const language: sonnyLanguage = match[1] as sonnyLanguage;
        let parsed = this.langStrings[language];
        const key = match[2];
        const arrayIndex: number | undefined = match[3] === undefined ? undefined : +match[3];
        const value = match[4].replace(/\\'/g, "'");
        if (arrayIndex === undefined){
          parsed[key] = value;
        } else {
          if (parsed[key] === undefined){
            parsed[key] = [] as string[];
          }
          if (Array.isArray(parsed[key])){
            parsed[key][arrayIndex] = value;
          }
        }
      }
    }
    return this.langStrings;
  }
}
