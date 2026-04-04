import { Component, inject, OnInit, signal } from '@angular/core';
import { BuffComponent } from "../buff/buff.component";
import { Buff } from '../buff';
import { BuffService } from '../buff.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-buff-list',
  imports: [BuffComponent, MatProgressSpinner],
  templateUrl: './buff-list.component.html',
  styleUrl: './buff-list.component.css',
})
export class BuffListComponent implements OnInit {
  dataList = signal<Buff[]>([]);
  dataService = inject(BuffService)

  ngOnInit(): void {
    this.dataService.request.then(response => {
      this.dataList.set(Array.from(response.values()));
    });
  }
}
