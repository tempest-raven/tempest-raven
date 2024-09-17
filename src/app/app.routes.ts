import { Routes } from '@angular/router';
import { AbilityComponent } from './ability/ability.component';
import { AbilityListComponent } from './ability-list/ability-list.component';

export const routes: Routes = [
    { path: "abilities", component: AbilityListComponent },
    { path: "ability/:abilityId/:slug", component: AbilityComponent },
    { path: "ability/:abilityId", component: AbilityComponent },
    { path: "", redirectTo: "abilities", pathMatch: "full"}
];
