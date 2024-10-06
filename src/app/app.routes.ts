import { Routes } from '@angular/router';
import { AbilityComponent } from './abilities/ability/ability.component';
import { BuffComponent } from './buffs/buff/buff.component';
import { AbilityService } from './abilities/ability.service';
import { elementListData } from './shared/types';
import { BuffService } from './buffs/buff.service';
import { ElementListComponent } from './element-list/element-list.component';
import { ItemComponent } from './items/item/item.component';
import { ItemService } from './items/item.service';
import { UnitService } from './units/unit.service';
import { UnitComponent } from './units/unit/unit.component';

export const routes: Routes = [
    { path: "abilities", component: ElementListComponent, title: "Abilities", 
        data: { 
            navigation: true, 
            component: AbilityComponent, 
            service: AbilityService 
        } as elementListData<number>
    },
    { path: "ability/:elementId/:slug", component: AbilityComponent, title: s => s.params["slug"] },
    { path: "ability/:elementId", component: AbilityComponent, title: s => "Ability ID " + s.params["elementId"] },
    
    { path: "buffs", component: ElementListComponent, title: "Buffs", 
        data: { 
            navigation: true, 
            component: BuffComponent, 
            service: BuffService
        } as elementListData<string>
    },
    { path: "buff/:elementId/:slug", component: BuffComponent, title: s => s.params["slug"] },
    { path: "buff/:elementId", component: BuffComponent, title: s => "Buff ID " + s.params["elementId"] },

    { path: "items", component: ElementListComponent, title: "Items", 
        data: { 
            navigation: true, 
            component: ItemComponent, 
            service: ItemService 
        } as elementListData<number>
    },
    { path: "item/:elementId/:slug", component: ItemComponent, title: s => s.params["slug"] },
    { path: "item/:elementId", component: ItemComponent, title: s => "Item ID " + s.params["elementId"] },

    { path: "units", component: ElementListComponent, title: "Units [WIP]", 
        data: { 
            navigation: true, 
            component: UnitComponent, 
            service: UnitService 
        } as elementListData<number>
    },

    { path: "", redirectTo: "abilities", pathMatch: "full"}
];
