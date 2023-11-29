import { SleepData } from "./sleep-data";

export class OvernightSleepData extends SleepData {
    private sleepStart: Date;
    private sleepEnd: Date;

    constructor(sleepStart: Date, sleepEnd: Date, existingId: string = "") {
        super();
        this.sleepStart = sleepStart;
        this.sleepEnd = sleepEnd;

        if (!(existingId === "")) {
            this.id = existingId;
        }
    }

    override summaryString(): string {
        var sleepStart_ms = this.sleepStart.getTime();
        var sleepEnd_ms = this.sleepEnd.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = sleepEnd_ms - sleepStart_ms;

        // Convert to hours and minutes
        return (
            Math.floor(difference_ms / (1000 * 60 * 60)) +
            " Hours " +
            Math.floor((difference_ms / (1000 * 60)) % 60) +
            " Minutes"
        );
    }

    getNightOfString(): string {
        return (
            "Night of " +
            this.sleepStart.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            })
        );
    }
}
