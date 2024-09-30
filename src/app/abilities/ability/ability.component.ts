import { booleanAttribute, Component, Input, numberAttribute, OnInit } from '@angular/core';
import { Ability } from '../ability';
import { AbilityService } from '../ability.service';
import { NgClass, PercentPipe } from '@angular/common';
import { AbilityScalePipe } from '../ability-scale.pipe';
import { RouterLink } from '@angular/router';
import { SignedPercentPipe } from '../../shared/signed-percent.pipe';
import { BuffComponent } from '../../buffs/buff/buff.component';
import { TooltipDirective } from '../../shared/tooltip.directive';
import { BuffService } from '../../buffs/buff.service';
import { elementComponent } from '../../shared/types';

@Component({
  selector: 'app-ability',
  standalone: true,
  imports: [
    NgClass,
    PercentPipe, 
    SignedPercentPipe, 
    AbilityScalePipe, 
    RouterLink, 
    BuffComponent, 
    TooltipDirective
  ],
  templateUrl: './ability.component.html',
  styleUrl: './ability.component.css'
})
export class AbilityComponent implements elementComponent<number>, OnInit {
  @Input({required: true, transform: numberAttribute}) elementId: number = 0;
  @Input({transform: booleanAttribute}) addLink: boolean = false;
  public ability: Ability | undefined;
  buffComponent = BuffComponent;

  constructor(
    private abilityService: AbilityService,
    private buffService: BuffService
  ){
    
  }

  ngOnInit(){
    this.abilityService.request.then(response => this.ability = response.get(this.elementId));
  }
}
