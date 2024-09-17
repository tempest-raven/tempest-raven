import { Routes } from '@angular/router';
import { AbilityComponent } from './abilities/ability/ability.component';
import { AbilityListComponent } from './abilities/ability-list/ability-list.component';

export const routes: Routes = [
    { path: "abilities", component: AbilityListComponent },
    { path: "ability/:abilityId/:slug", component: AbilityComponent },
    { path: "ability/:abilityId", component: AbilityComponent },
    { path: "", redirectTo: "abilities", pathMatch: "full"}
];
