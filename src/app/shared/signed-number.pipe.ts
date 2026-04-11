import { formatNumber } from "@angular/common";
import { LOCALE_ID, Pipe, PipeTransform, inject } from "@angular/core";

@Pipe({
  name: "signedNumber",
  standalone: true,
})
export class SignedNumberPipe implements PipeTransform {
  private _locale = inject(LOCALE_ID);

  transform(value: number, digitsInfo?: string): string {
    const formattedNumber = formatNumber(value, this._locale, digitsInfo);
    return value >= 0 ? "+" + formattedNumber : formattedNumber;
  }
}
