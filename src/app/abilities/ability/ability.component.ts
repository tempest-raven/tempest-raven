import { booleanAttribute, Component, numberAttribute, OnInit, signal, input, inject } from '@angular/core';
import { Ability } from '../ability';
import { AbilityService } from '../ability.service';
import { PercentPipe } from '@angular/common';
import { AbilityScalePipe } from '../ability-scale.pipe';
import { RouterLink } from '@angular/router';
import { SignedPercentPipe } from '../../shared/signed-percent.pipe';
import { BuffComponent } from '../../buffs/buff/buff.component';
import { TooltipDirective } from '../../shared/tooltip/tooltip.directive';

@Component({
    selector: 'app-ability',
    imports: [
    PercentPipe,
    SignedPercentPipe,
    AbilityScalePipe,
    RouterLink,
    TooltipDirective,
    BuffComponent
],
    templateUrl: './ability.component.html',
    styleUrl: './ability.component.css'
})
export class AbilityComponent implements OnInit {
  readonly elementId = input.required<number, unknown>({ transform: numberAttribute });
  readonly addLink = input<boolean, unknown>(false, { transform: booleanAttribute });
  public ability = signal<Ability | undefined>(undefined);
  private abilityService = inject(AbilityService);

  ngOnInit(){
    this.abilityService.request.then(response => this.ability.set(response.get(this.elementId())));
  }
}
