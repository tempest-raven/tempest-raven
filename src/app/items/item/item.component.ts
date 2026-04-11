import { Component, numberAttribute, OnInit, signal, input, inject } from "@angular/core";
import { ItemService } from "../item.service";
import { Item } from "../item";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { SignedNumberPipe } from "../../shared/signed-number.pipe";

@Component({
  selector: "app-item",
  imports: [RouterLink, RouterLinkActive, SignedNumberPipe],
  templateUrl: "./item.component.html",
  styleUrl: "./item.component.css",
})
export class ItemComponent implements OnInit {
  readonly elementId = input.required<number, unknown>({ transform: numberAttribute });
  public item = signal<Item | undefined>(undefined);
  private itemService = inject(ItemService);

  ngOnInit(): void {
    this.itemService.request.then(response => this.item.set(response.get(this.elementId())));
  }
}
