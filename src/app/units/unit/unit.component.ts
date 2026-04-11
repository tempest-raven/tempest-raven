import { Component, numberAttribute, OnInit, signal, input, inject } from "@angular/core";
import { UnitService } from "../unit.service";
import { Unit } from "../unit";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AbilityComponent } from "../../abilities/ability/ability.component";
import { BuffComponent } from "../../buffs/buff/buff.component";
import { PiercingBarComponent } from "../../game-ui/piercing-bar/piercing-bar.component";
import { TooltipDirective } from "../../shared/tooltip/tooltip.directive";

@Component({
  selector: "app-unit",
  imports: [
    RouterLink,
    RouterLinkActive,
    TooltipDirective,
    PiercingBarComponent,
    AbilityComponent,
    BuffComponent,
  ],
  templateUrl: "./unit.component.html",
  styleUrl: "./unit.component.css",
})
export class UnitComponent implements OnInit {
  readonly elementId = input.required<number, unknown>({ transform: numberAttribute });
  public unit = signal<Unit | undefined>(undefined);
  private unitService = inject(UnitService);

  ngOnInit() {
    this.unitService.request.then(response => this.unit.set(response.get(this.elementId())));
  }
}
