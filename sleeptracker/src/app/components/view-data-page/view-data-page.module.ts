import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ViewDataPageComponent } from "./view-data-page.component";

import { IonicModule } from "@ionic/angular";
import { LogDaySleepComponent } from "../log-day-sleep/log-day-sleep.component";
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ViewOvernightSleepDataComponent } from "../view-overnight-sleep-data/view-overnight-sleep-data.component";
import { ViewDaySleepDataComponent } from "../view-day-sleep-data/view-day-sleep-data.component";

@NgModule({
    imports: [
        IonicModule,
        RouterModule.forChild([{ path: "", component: ViewDataPageComponent }]),
        LogDaySleepComponent,
        NgIf,
        FormsModule,
        NgForOf
    ],
    declarations: [
        ViewDataPageComponent,
        ViewOvernightSleepDataComponent,
        ViewDaySleepDataComponent
    ],
    exports: [ViewDataPageComponent]
})
export class ViewDataPageModule {}
