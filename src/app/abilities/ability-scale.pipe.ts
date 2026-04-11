import { LOCALE_ID, Pipe, PipeTransform, inject } from "@angular/core";
import { Ability } from "./ability";
import { formatPercent } from "@angular/common";

@Pipe({
  name: "abilityScale",
  standalone: true,
  pure: false,
})
export class AbilityScalePipe implements PipeTransform {
  private _locale = inject(LOCALE_ID);

  transform(
    abilityLike: Pick<
      Ability,
      "strengthScale" | "instinctScale" | "speedScale" | "healthScale" | "flatModifier"
    >,
    digitsInfo = "1.0-2",
  ): string {
    const scalings = [];
    if (abilityLike.strengthScale) {
      scalings.push(
        formatPercent(abilityLike.strengthScale, this._locale, digitsInfo) + " Strength",
      );
    }
    if (abilityLike.instinctScale) {
      scalings.push(
        formatPercent(abilityLike.instinctScale, this._locale, digitsInfo) + " Instinct",
      );
    }
    if (abilityLike.speedScale) {
      scalings.push(formatPercent(abilityLike.speedScale, this._locale, digitsInfo) + " Speed");
    }
    if (abilityLike.healthScale) {
      scalings.push(
        formatPercent(abilityLike.healthScale, this._locale, digitsInfo) + " of maximum Health",
      );
    }
    if (abilityLike.flatModifier) {
      scalings.push(abilityLike.flatModifier);
    }
    //TODO: improve "hackMove" recognition into something more general
    return scalings
      .join(" + ")
      .replaceAll(
        "_root.hackMove[2]",
        formatPercent(abilityLike.strengthScale, this._locale, digitsInfo),
      );
  }
}
