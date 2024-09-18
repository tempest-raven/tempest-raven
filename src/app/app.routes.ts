import { Routes } from '@angular/router';
import { AbilityComponent } from './abilities/ability/ability.component';
import { AbilityListComponent } from './abilities/ability-list/ability-list.component';
import { BuffComponent } from './buffs/buff/buff.component';
import { BuffListComponent } from './buffs/buff-list/buff-list.component';

export const routes: Routes = [
    { path: "abilities", component: AbilityListComponent },
    { path: "ability/:abilityId/:slug", component: AbilityComponent },
    { path: "ability/:abilityId", component: AbilityComponent },
    { path: "buffs", component: BuffListComponent },
    { path: "buff/:buffId/:slug", component: BuffComponent },
    { path: "buff/:buffId", component: BuffComponent },
    { path: "", redirectTo: "abilities", pathMatch: "full"}
];
