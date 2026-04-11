import { Component, inject, OnInit, signal } from "@angular/core";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { AbilityService } from "../ability.service";
import { Ability } from "../ability";
import { AbilityComponent } from "../ability/ability.component";

@Component({
  selector: "app-ability-list",
  imports: [MatProgressSpinner, AbilityComponent],
  templateUrl: "./ability-list.component.html",
  styleUrl: "./ability-list.component.css",
})
export class AbilityListComponent implements OnInit {
  dataList = signal<Ability[]>([]);
  dataService = inject(AbilityService);

  ngOnInit(): void {
    this.dataService.request.then(response => {
      this.dataList.set(Array.from(response.values()));
    });
  }
}
