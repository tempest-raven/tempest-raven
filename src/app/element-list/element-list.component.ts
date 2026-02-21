import { ChangeDetectorRef, Component, inject, Injectable, Injector, OnInit, ProviderToken, signal, Type } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { elementComponent, elementListData, requestService } from '../shared/types';
import { NgComponentOutlet } from '@angular/common';

@Component({
    selector: 'app-element-list',
    imports: [
      MatProgressSpinnerModule,
      NgComponentOutlet
    ], 
    templateUrl: './element-list.component.html',
    styleUrl: './element-list.component.css'
})
export class ElementListComponent<T extends string | number> implements OnInit {
  public component = signal<Type<elementComponent<T>> | undefined>(undefined);
  public elementList = signal<Map<string, {id: string}> | Map<number, {id: number}>>(new Map()); /*: Awaited<requestService<T>["request"]>*/

  constructor(private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef){
    let data = this.activatedRoute.data as Observable<elementListData<T>>;
    data.subscribe({
      next: async (data) => {
        this.component.set(data.component as Type<elementComponent<T>>);
        const list = await inject(data.service as ProviderToken<requestService<T>>).request;
        this.elementList.set(list);
      },
    })
  }

  ngOnInit(): void {
    
  }

}
