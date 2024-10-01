import { booleanAttribute, Component, Input, numberAttribute, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { elementComponent } from '../../shared/types';
import { Item } from '../item';
import { RouterLink } from '@angular/router';
import { SignedNumberPipe } from '../../shared/signed-number.pipe';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    RouterLink,
    SignedNumberPipe
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements elementComponent<number>, OnInit {
  @Input({required: true, transform: numberAttribute}) elementId: number = 0;
  @Input({transform: booleanAttribute}) addLink: boolean = false;
  item: Item | undefined;
  
  constructor(private itemService: ItemService){}

  ngOnInit(): void {
    this.itemService.request.then(response => this.item = response.get(this.elementId));
  }
}
