import { Component } from '@angular/core';
import { Ability } from '../ability';

@Component({
  selector: 'app-ability',
  standalone: true,
  imports: [],
  templateUrl: './ability.component.html',
  styleUrl: './ability.component.css'
})
export class AbilityComponent {
  abilityList: Ability[] = []
}
