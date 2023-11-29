import { nanoid } from "nanoid";

export class SleepData {
    id: string;
    loggedAt: Date;

    private dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "America/Los_Angeles"
    };

    constructor() {
        //Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
        this.id = nanoid();
        this.loggedAt = new Date();
    }

    getId(): string {
        return this.id;
    }

    summaryString(): string {
        return "Unknown sleep data";
    }

    loggedAtString(): string {
        return (
            "Logged At " +
            this.loggedAt.toLocaleDateString(
                "en-US",
                this.dateTimeFormatOptions
            )
        );
    }
}
