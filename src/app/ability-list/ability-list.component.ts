import { Component } from '@angular/core';
import { AbilityService } from '../services/ability.service';
import { Ability } from '../ability';
import { AbilityComponent } from "../ability/ability.component";

@Component({
  selector: 'app-ability-list',
  standalone: true,
  imports: [AbilityComponent],
  templateUrl: './ability-list.component.html',
  styleUrl: './ability-list.component.css'
})
export class AbilityListComponent {
  abilityList: Map<number, Ability>;

  constructor(private abilityService: AbilityService){
    this.abilityList = abilityService.getAll();
    console.log(this.abilityList);
  }
}
