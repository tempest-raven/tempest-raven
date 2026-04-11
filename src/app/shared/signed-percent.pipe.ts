import { formatPercent } from "@angular/common";
import { LOCALE_ID, Pipe, PipeTransform, inject } from "@angular/core";

@Pipe({
  name: "signedPercent",
  standalone: true,
})
export class SignedPercentPipe implements PipeTransform {
  private _locale = inject(LOCALE_ID);

  transform(value: number, digitsInfo?: string): string {
    const formattedNumber = formatPercent(value, this._locale, digitsInfo);
    return value >= 0 ? "+" + formattedNumber : formattedNumber;
  }
}
