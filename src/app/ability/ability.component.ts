import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { Ability } from '../ability';
import { AbilityService } from '../services/ability.service';
import { PercentPipe } from '@angular/common';
import { AbilityScalePipe } from '../pipes/ability-scale.pipe';

@Component({
  selector: 'app-ability',
  standalone: true,
  imports: [PercentPipe, AbilityScalePipe],
  templateUrl: './ability.component.html',
  styleUrl: './ability.component.css'
})
export class AbilityComponent implements OnInit {
  @Input({required: true, transform: numberAttribute}) abilityId: number = 0;
  public ability: Ability | undefined;

  constructor(private abilityService: AbilityService){
    
  }

  ngOnInit(){
    this.abilityService.request.then(response => this.ability = response.get(this.abilityId));
  }
}
