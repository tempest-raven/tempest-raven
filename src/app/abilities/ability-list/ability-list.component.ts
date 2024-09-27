import { Component, OnInit } from '@angular/core';
import { AbilityService } from '../ability.service';
import { Ability } from '../ability';
import { AbilityComponent } from "../ability/ability.component";
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-ability-list',
  standalone: true,
  imports: [
    AbilityComponent, 
    RouterLink,
    MatProgressSpinnerModule
  ],
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
