import { Component, numberAttribute, input } from "@angular/core";
import { sonnyElement } from "../../shared/types";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: "app-piercing-bar",
  imports: [DecimalPipe],
  templateUrl: "./piercing-bar.component.html",
  styleUrl: "./piercing-bar.component.css",
})
export class PiercingBarComponent {
  readonly value = input.required<number, unknown>({ transform: numberAttribute });
  readonly element = input.required<sonnyElement>();
  readonly level = input.required<number, unknown>({ transform: numberAttribute });

  piercingRatio() {
    let ratio = this.value() / (100 + 15 * this.level());
    if (ratio > 10) {
      ratio = 10;
    }
    return ratio;
  }

  critDamage() {
    const ratio = this.piercingRatio();
    return (
      0.016666667 * Math.pow(ratio + 1, 4) -
      0.25 * Math.pow(ratio + 1, 3) +
      1.233333 * Math.pow(ratio + 1, 2) -
      1.9 * (ratio + 1) +
      1.9
    );
  }

  critChance() {
    return this.piercingRatio() * 0.15;
  }

  nonCritDamage() {
    return this.piercingRatio() < 1 ? this.piercingRatio() - 1 : 0.07 * (this.piercingRatio() - 1);
  }
}
