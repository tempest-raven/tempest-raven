import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { Ability } from './ability';
import { formatPercent, PercentPipe } from '@angular/common';

@Pipe({
  name: 'abilityScale',
  standalone: true
})
export class AbilityScalePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private _locale: string) {}
  
  transform(ability: Ability, digitsInfo = "1.0-2"): string {
    let scalings = [];
    if (ability.strengthScale){
        scalings.push(formatPercent(ability.strengthScale, this._locale, digitsInfo) + " Strength");
    }
    if (ability.instinctScale){
        scalings.push(formatPercent(ability.instinctScale, this._locale, digitsInfo) + " Instinct");
    }
    if (ability.speedScale){
        scalings.push(formatPercent(ability.speedScale, this._locale, digitsInfo) + " Speed");
    }
    if (ability.healthScale){
        scalings.push(formatPercent(ability.healthScale, this._locale, digitsInfo) + " of maximum Health");
    }
    if (ability.flatModifier){
        scalings.push(ability.flatModifier);
    }
    return scalings.join(" + ").replaceAll("_root.hackMove[2]", formatPercent(ability.strengthScale, this._locale, digitsInfo));
  }
}
