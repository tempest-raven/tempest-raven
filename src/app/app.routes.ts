import { Routes } from '@angular/router';
import { AbilityComponent } from './abilities/ability/ability.component';
import { AbilityListComponent } from './abilities/ability-list/ability-list.component';
import { BuffComponent } from './buffs/buff/buff.component';
import { BuffListComponent } from './buffs/buff-list/buff-list.component';

export const routes: Routes = [
    { path: "abilities", component: AbilityListComponent, title: "Abilities", data: { navigation: true } },
    { path: "ability/:abilityId/:slug", component: AbilityComponent, title: s => s.params["slug"] },
    { path: "ability/:abilityId", component: AbilityComponent, title: s => "Ability ID " + s.params["abilityId"] },
    { path: "buffs", component: BuffListComponent, title: "Buffs", data: { navigation: true } },
    { path: "buff/:buffId/:slug", component: BuffComponent, title: s => s.params["slug"] },
    { path: "buff/:buffId", component: BuffComponent, title: s => "Buff ID " + s.params["buffId"] },
    { path: "", redirectTo: "abilities", pathMatch: "full"}
];
