import { formatNumber } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'signedNumber',
  standalone: true
})
export class SignedNumberPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private _locale: string) {}

  transform(value: number, digitsInfo?: string): string {
    const formattedNumber = formatNumber(value, this._locale, digitsInfo);
    return value > 0 ? "+" + formattedNumber : formattedNumber;
  }

}
