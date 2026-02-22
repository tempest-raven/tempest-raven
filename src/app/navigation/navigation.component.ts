import { Component, inject, input } from '@angular/core';            
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { routes } from '../app.routes';
import { appName } from '../app.config';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        AsyncPipe,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
    ]
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  public activatedRoute = inject(ActivatedRoute);

  public routes = routes
  .filter(r => r.data?.["navigation"])
  .map(r => ({
    title: r.title as string,
    children: (r.children ?? [])
      .filter(child => child.data?.["navigation"])
      .map(child => ({
        fullPath: `${r.path}/${child.path}`,
        title: typeof child.title === "string"
          ? child.title 
          : "No title"
      }))
  }));

  protected readonly appName = appName;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
