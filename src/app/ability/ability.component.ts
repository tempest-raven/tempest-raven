import { Component, Input } from '@angular/core';
import { Ability } from '../ability';
import { AbilityService } from '../services/ability.service';
import { PercentPipe } from '@angular/common';
import { AbilityScalePipe } from '../ability-scale.pipe';

@Component({
  selector: 'app-ability',
  standalone: true,
  imports: [PercentPipe, AbilityScalePipe],
  templateUrl: './ability.component.html',
  styleUrl: './ability.component.css'
})
export class AbilityComponent {
  @Input({required: true}) linkedAbility: number = 0;
  public ability: Ability | undefined;

  constructor(private abilityService: AbilityService){}

  ngOnChanges(){
    this.ability = this.abilityService.get(this.linkedAbility);
  }
}
