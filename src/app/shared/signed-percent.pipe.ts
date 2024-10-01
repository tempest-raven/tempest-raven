import { formatPercent } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signedPercent',
  standalone: true
})
export class SignedPercentPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private _locale: string) {}

  transform(value: number, digitsInfo?: string): string {
    const formattedNumber = formatPercent(value, this._locale, digitsInfo);
    return value >= 0 ? "+" + formattedNumber : formattedNumber;
  }

}
