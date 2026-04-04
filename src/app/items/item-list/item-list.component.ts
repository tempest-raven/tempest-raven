import { Component, inject, OnInit, signal } from '@angular/core';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { ItemComponent } from "../item/item.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-item-list',
  imports: [ItemComponent, MatProgressSpinner],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent implements OnInit {
  dataList = signal<Item[]>([]);
  dataService = inject(ItemService)

  ngOnInit(): void {
    this.dataService.request.then(response => {
      this.dataList.set(Array.from(response.values()));
    });
  }
}