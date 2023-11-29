/* from the Stanford Sleepiness Scale */
/* https://web.stanford.edu/~dement/sss.html */

import { SleepData } from "./sleep-data";

export class StanfordSleepinessData extends SleepData {
    public static ScaleValues = [
        "Feeling active, vital, alert, or wide awake.", //1
        "Functioning at high levels, but not at peak; able to concentrate.", //2
        "Awake, but relaxed; responsive but not fully alert.", //3
        "Somewhat foggy, let down.", //4
        "Foggy; losing interest in remaining awake; slowed down.", //5
        "Sleepy, woozy, fighting sleep; prefer to lie down.", //6
        "No longer fighting sleep, sleep onset soon; having dream-like thoughts." //7
    ];

    private loggedValue: number; // between 1 and 7 (inclusive)

    constructor(
        loggedValue: number,
        loggedAt: Date = new Date(),
        existingId: string = ""
    ) {
        super();
        this.loggedValue = loggedValue;
        this.loggedAt = loggedAt;

        if (!(existingId === "")) {
            this.id = existingId;
        }
    }

    override summaryString(): string {
        return StanfordSleepinessData.ScaleValues[this.loggedValue - 1];
    }

    levelString(): string {
        return "Level " + this.loggedValue.toString();
    }
}
