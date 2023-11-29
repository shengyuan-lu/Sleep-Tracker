import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LogDataPageComponent } from "./log-data-page.component";

import { IonicModule } from "@ionic/angular";
import { LogDaySleepComponent } from "../log-day-sleep/log-day-sleep.component";
import { LogOvernightSleepComponent } from "../log-overnight-sleep/log-overnight-sleep.component";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@NgModule({
    imports: [
        IonicModule,
        RouterModule.forChild([{ path: "", component: LogDataPageComponent }]),
        LogDaySleepComponent,
        FormsModule,
        NgIf
    ],
    declarations: [LogDataPageComponent, LogOvernightSleepComponent],
    exports: [LogDataPageComponent]
})
export class LogDataPageModule {}
