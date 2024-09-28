import { Component, Injectable, Injector, OnInit, ProviderToken, Type } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { elementListData, requestService } from '../shared/types';
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
export class ElementListComponent implements OnInit {
  public component: Type<any> | undefined;
  public elementList: Awaited<requestService["request"]> = new Map();

  constructor(private activatedRoute: ActivatedRoute, private injector: Injector){
    let data = this.activatedRoute.data as Observable<elementListData>;
    data.subscribe({
      next: async (data) => {
        this.component = data.component;
        this.elementList = await this.injector.get(data.service).request;
        
        //if (data.service instanceof AbilityService)
        //data.service.request
        //new value.component()
      },
    })
  }

  ngOnInit(): void {
    
  }

}
