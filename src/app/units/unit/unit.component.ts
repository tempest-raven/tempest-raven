import { booleanAttribute, Component, Input, numberAttribute, OnInit } from '@angular/core';
import { UnitService } from '../unit.service';
import { elementComponent } from '../../shared/types';
import { Unit } from '../unit';

@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.css'
})
export class UnitComponent implements elementComponent<number>, OnInit {
  @Input({required: true, transform: numberAttribute}) elementId: number = 0;
  @Input({transform: booleanAttribute}) addLink: boolean = false;
  public unit: Unit | undefined;

  constructor(
    private unitService: UnitService
  ){
    
  }

  ngOnInit(){
    this.unitService.request.then(response => this.unit = response.get(this.elementId));
  }
}
