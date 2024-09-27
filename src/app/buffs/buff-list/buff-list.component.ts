import { Component } from '@angular/core';
import { Buff } from '../buff';
import { BuffService } from '../buff.service';
import { BuffComponent } from '../buff/buff.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-buff-list',
  standalone: true,
  imports: [
    BuffComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './buff-list.component.html',
  styleUrl: './buff-list.component.css'
})
export class BuffListComponent {
  buffList: Map<string, Buff> = new Map();

  constructor(private buffService: BuffService){
    
  }

  ngOnInit(): void {
    this.buffService.request.then(response => {
      this.buffList = response;
    });
  }
}
