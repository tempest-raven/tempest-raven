import { Component, OnInit } from '@angular/core';
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
export class AbilityListComponent implements OnInit {
  abilityList: Map<number, Ability> = new Map();

  constructor(private abilityService: AbilityService){
    
  }

  ngOnInit(): void {
    this.abilityService.request.then(response => {
      this.abilityList = response;
    });
  }

}
