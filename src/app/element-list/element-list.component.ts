import { Component, inject, Injectable, Injector, OnInit, ProviderToken, Type } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { elementComponent, elementListData, requestService } from '../shared/types';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-element-list',
  standalone: true,
  imports: [
    RouterLink,
    MatProgressSpinnerModule,
    NgComponentOutlet,
  ],
  templateUrl: './element-list.component.html',
  styleUrl: './element-list.component.css'
})
export class ElementListComponent<T extends string | number> implements OnInit {
  public component: Type<elementComponent<T>> | undefined;
  public elementList: Map<string, {id: string}> | Map<number, {id: number}> /*: Awaited<requestService<T>["request"]>*/ = new Map();

  constructor(private activatedRoute: ActivatedRoute){
    let data = this.activatedRoute.data as Observable<elementListData<T>>;
    data.subscribe({
      next: async (data) => {
        this.component = data.component as Type<elementComponent<T>>;
        this.elementList = await inject(data.service as ProviderToken<requestService<T>>).request;
      },
    })
  }

  ngOnInit(): void {
    
  }

}
