import { Routes } from '@angular/router';
import { AbilityComponent } from './abilities/ability/ability.component';
import { BuffComponent } from './buffs/buff/buff.component';
import { ItemComponent } from './items/item/item.component';
import { UnitComponent } from './units/unit/unit.component';
import { AbilityListComponent } from './abilities/ability-list/ability-list.component';
import { BuffListComponent } from './buffs/buff-list/buff-list.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { UnitListComponent } from './units/unit-list/unit-list.component';

export const routes: Routes = [
    { 
        path: "sonny2", 
        data: { navigation: true }, 
        title: "Sonny 2",
        children: [
            { path: "abilities", component: AbilityListComponent, title: "Abilities", data: { navigation: true } },
            { path: "ability/:elementId/:slug", component: AbilityComponent, title: s => s.params["slug"] },
            { path: "ability/:elementId", component: AbilityComponent, title: s => "Ability " + s.params["elementId"] },
            
            { path: "buffs", component: BuffListComponent, title: "Buffs", data: { navigation: true } },
            { path: "buff/:elementId/:slug", component: BuffComponent, title: s => s.params["slug"] },
            { path: "buff/:elementId", component: BuffComponent, title: s => "Buff " + s.params["elementId"] },
            
            { path: "items", component: ItemListComponent, title: "Items", data: { navigation: true } },
            { path: "item/:elementId/:slug", component: ItemComponent, title: s => s.params["slug"] },
            { path: "item/:elementId", component: ItemComponent, title: s => "Item " + s.params["elementId"] },
            
            { path: "units", component: UnitListComponent, title: "Units", data: { navigation: true } },
            { path: "unit/:elementId/:slug", component: UnitComponent, title: s => s.params["slug"] },
            { path: "unit/:elementId", component: UnitComponent, title: s => "Unit " + s.params["elementId"] },
        ]
    },

    { path: "", redirectTo: "sonny2/abilities", pathMatch: "full"}
];
