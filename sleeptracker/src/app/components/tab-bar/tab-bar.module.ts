import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";

import { TabBarComponent } from "./tab-bar.component";

@NgModule({
    imports: [
        IonicModule,
        RouterModule.forChild([{ path: "", component: TabBarComponent }])
    ],
    declarations: [TabBarComponent],
    exports: [TabBarComponent]
})
export class TabBarComponentModule {}
