import { Component, OnInit } from "@angular/core";
import { PickerController } from "@ionic/angular";
import { SleepService } from "../../services/sleep.service";
import { OvernightSleepData } from "../../data/overnight-sleep-data";

@Component({
    selector: "app-log-overnight-sleep",
    templateUrl: "./log-overnight-sleep.component.html",
    styleUrls: ["./log-overnight-sleep.component.scss"]
})
export class LogOvernightSleepComponent implements OnInit {
    sleepStartISOString: string = ""; // Variable to store bedtime
    sleepEndISOString: string = ""; // Variable to store wakeup time

    errorMessage: string = "";
    successMessage: string = "";

    private dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "America/Los_Angeles"
    };

    private sleepService: SleepService;

    constructor(sleepService: SleepService) {
        // Inject the SleepService
        this.sleepService = sleepService;

        // Set default values
        const now = new Date();
        this.sleepEndISOString = now.toISOString();

        // Default bedtime is 6 hours earlier
        now.setHours(now.getHours() - 6);
        this.sleepStartISOString = now.toISOString();
    }

    ngOnInit(): void {}

    formatISOStringToDisplay(dateString: string) {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat(
            "en-US",
            this.dateTimeFormatOptions
        ).format(date);
    }

    calculateSleepDurationString(): string {
        const sleepStartDate = new Date(this.sleepStartISOString);
        const sleepEndDate: Date = new Date(this.sleepEndISOString);

        const sleepDuration_ms =
            sleepEndDate.getTime() - sleepStartDate.getTime();

        const hours = Math.floor(sleepDuration_ms / (1000 * 60 * 60));

        const minutes = Math.floor(
            (sleepDuration_ms % (1000 * 60 * 60)) / (1000 * 60)
        );

        let result = "";

        if (hours > 0) {
            result += `${hours} ${hours === 1 ? "Hour" : "Hours"}`;
        }

        if (minutes > 0) {
            if (result.length > 0) {
                result += " ";
            }
            result += `${minutes} ${minutes === 1 ? "Minute" : "Minutes"}`;
        }

        if (result === "") {
            result = "N/A";
        }

        return result;
    }

    clearMessages(): void {
        this.errorMessage = "";
        this.successMessage = "";
    }

    // Event handler for form submission
    logOvernightSleepData(): void {
        // Calculate the duration the user slept
        const sleepStartDate = new Date(this.sleepStartISOString); // Use a common date for calculations
        const sleepEndDate = new Date(this.sleepEndISOString);
        const loggedAtDate = new Date();

        const sleepDuration =
            Math.abs(sleepEndDate.getTime() - sleepStartDate.getTime()) / 36e5;

        // Check if the dates are valid

        if (sleepStartDate > loggedAtDate || sleepEndDate > loggedAtDate) {
            this.errorMessage =
                "Bedtime or wake-up time can't be in the future. Check your inputs for correctness.";
            return;
        } else if (sleepStartDate >= sleepEndDate) {
            this.errorMessage =
                "Bedtime can't be earlier than wake-up time. Check your inputs for correctness.";
            return;
        } else if (sleepDuration > 15) {
            this.errorMessage =
                "Sleep duration is over 15 hours. Check your inputs for correctness.";
            return;
        }

        // Store The Data and Display Success Message

        this.sleepService.logOvernightData(
            new OvernightSleepData(sleepStartDate, sleepEndDate)
        );

        this.successMessage =
            "Your overnight sleep data is successfully recorded.";
    }
}
