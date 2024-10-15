import { booleanAttribute, Component, ComponentDecorator, Input, numberAttribute, OnInit } from '@angular/core';
import { UnitService } from '../unit.service';
import { elementComponent } from '../../shared/types';
import { Unit } from '../unit';
import { RouterLink } from '@angular/router';
import { TooltipDirective, tooltipObj } from '../../shared/tooltip.directive';
import { AbilityComponent } from '../../abilities/ability/ability.component';
import { BuffComponent } from '../../buffs/buff/buff.component';
import { Ability } from '../../abilities/ability';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [
    RouterLink,
    TooltipDirective
  ],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent implements elementComponent<number>, OnInit {
  @Input({required: true, transform: numberAttribute}) elementId: number = 0;
  @Input({transform: booleanAttribute}) addLink: boolean = false;
  public unit: Unit | undefined;
  public abilityComponent = AbilityComponent;
  public buffComponent = BuffComponent;

  constructor(
    private unitService: UnitService
  ){
    
  }

  ngOnInit(){
    this.unitService.request.then(response => this.unit = response.get(this.elementId));
  }

  getAbilityTooltips(ab: Ability): TooltipDirective<elementComponent<number | string>[]>["tooltips"] {
    let tooltips: (tooltipObj<AbilityComponent> | tooltipObj<BuffComponent>)[] = [{
      component: AbilityComponent,
      data: {
        elementId: ab.id
      }
    }]
    if (ab.buffId !== 0){
      tooltips.push({
        component: BuffComponent,
        data: {
          elementId: ab.buffId
        }
      })
    }
    return tooltips;
  }
}
