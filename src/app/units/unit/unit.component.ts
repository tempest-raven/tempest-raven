import { booleanAttribute, Component, ComponentDecorator, numberAttribute, OnInit, signal, input } from '@angular/core';
import { UnitService } from '../unit.service';
import { Unit } from '../unit';
import { RouterLink } from '@angular/router';
import { AbilityComponent } from '../../abilities/ability/ability.component';
import { BuffComponent } from '../../buffs/buff/buff.component';
import { Ability } from '../../abilities/ability';
import { PiercingBarComponent } from "../../game-ui/piercing-bar/piercing-bar.component";
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';

@Component({
    selector: 'app-unit',
    imports: [
        RouterLink,
        TooltipDirective,
        PiercingBarComponent,
        AbilityComponent,
        BuffComponent
    ],
    templateUrl: './unit.component.html',
    styleUrl: './unit.component.css'
})
export class UnitComponent implements OnInit {
  readonly elementId = input.required<number, unknown>({ transform: numberAttribute });
  readonly addLink = input<boolean, unknown>(false, { transform: booleanAttribute });
  public unit = signal<Unit | undefined>(undefined);
  public abilityComponent = AbilityComponent;
  public buffComponent = BuffComponent;

  constructor(
    private unitService: UnitService
  ){
    
  }

  ngOnInit(){
    this.unitService.request.then(response => this.unit.set(response.get(this.elementId())));
  }
}
