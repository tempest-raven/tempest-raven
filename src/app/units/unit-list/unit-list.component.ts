import { Component, inject, OnInit, signal } from '@angular/core';
import { Unit } from '../unit';
import { UnitService } from '../unit.service';
import { UnitComponent } from "../unit/unit.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-unit-list',
  imports: [UnitComponent, MatProgressSpinner],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.css',
})
export class UnitListComponent implements OnInit {
  dataList = signal<Unit[]>([]);
  dataService = inject(UnitService)

  ngOnInit(): void {
    this.dataService.request.then(response => {
      this.dataList.set(Array.from(response.values()));
    });
  }
}