import { Routes } from '@angular/router';
import { AbilityComponent } from './abilities/ability/ability.component';
import { BuffComponent } from './buffs/buff/buff.component';
import { AbilityService } from './abilities/ability.service';
import { elementListData } from './shared/types';
import { BuffService } from './buffs/buff.service';
import { ElementListComponent } from './element-list/element-list.component';

export const routes: Routes = [
    { path: "abilities", component: ElementListComponent, title: "Abilities", 
        data: { 
            navigation: true, 
            component: AbilityComponent, 
            service: AbilityService 
        } as elementListData
    },
    { path: "ability/:elementId/:slug", component: AbilityComponent, title: s => s.params["slug"] },
    { path: "ability/:elementId", component: AbilityComponent, title: s => "Ability ID " + s.params["elementId"] },
    { path: "buffs", component: ElementListComponent, title: "Buffs", 
        data: { 
            navigation: true, 
            component: BuffComponent, 
            service: BuffService
        } as elementListData
    },
    { path: "buff/:elementId/:slug", component: BuffComponent, title: s => s.params["slug"] },
    { path: "buff/:elementId", component: BuffComponent, title: s => "Buff ID " + s.params["elementId"] },
    { path: "", redirectTo: "abilities", pathMatch: "full"}
];
