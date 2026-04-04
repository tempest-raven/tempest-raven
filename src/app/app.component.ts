import { Component } from '@angular/core';
import { NavigationComponent } from "./navigation/navigation.component";
import { TooltipComponent } from './shared/tooltip/tooltip.component';

@Component({
    selector: 'app-root',
    imports: [
        NavigationComponent,
        TooltipComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Tempest Raven';
}
