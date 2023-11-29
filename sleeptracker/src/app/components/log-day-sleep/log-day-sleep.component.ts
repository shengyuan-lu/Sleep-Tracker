import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms"; // Import FormsModule
import { SleepService } from "../../services/sleep.service";
import { StanfordSleepinessData } from "../../data/stanford-sleepiness-data";

@Component({
    selector: "app-log-day-sleep",
    standalone: true,
    imports: [CommonModule, IonicModule],
    templateUrl: "./log-day-sleep.component.html",
    styleUrl: "./log-day-sleep.component.css",
    providers: [FormsModule] // Add this line if needed
})
export class LogDaySleepComponent {
    public sliderValue = 1;
    public successMessage = "";
    private sleepService: SleepService;

    constructor(sleepService: SleepService) {
        // Inject the SleepService
        this.sleepService = sleepService;
    }

    onIonChange(ev: Event) {
        this.sliderValue = (ev as CustomEvent).detail.value as number;
    }

    getSleepinessScaleValue(): string {
        return StanfordSleepinessData.ScaleValues[this.sliderValue - 1];
    }

    clearMessages(): void {
        this.successMessage = "";
    }

    logDaySleepinessData() {
        const sleepinessData = new StanfordSleepinessData(this.sliderValue);
        this.sleepService.logSleepinessData(sleepinessData);

        this.successMessage =
            "Your day sleepiness data is successfully recorded.";
    }

    getCurrentDateTimeString() {
        // Format it in MM/DD/YYYY hh:mm AM/PM
        const now = new Date();
        return now.toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true
        });
    }
}
