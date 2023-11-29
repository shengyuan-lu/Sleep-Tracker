import { Injectable } from "@angular/core";
import { OvernightSleepData } from "../data/overnight-sleep-data";
import { StanfordSleepinessData } from "../data/stanford-sleepiness-data";
import { Storage } from "@ionic/storage-angular";
import { SleepData } from "../data/sleep-data";

@Injectable({
    providedIn: "root"
})
export class SleepService {
    private _storage: Storage | null = null;

    public overnightSleepDataKey = "overnightSleepData";
    public daySleepinessDataKey = "daySleepinessData";

    // @ts-ignore
    constructor(private storage: Storage) {
        this.initStorage();
    }

    // Initialize the storage
    async initStorage() {
        this._storage = await this.storage.create();

        if (!(await this.hasKey(this.daySleepinessDataKey))) {
            this.set(this.daySleepinessDataKey, []);
        }

        if (!(await this.hasKey(this.overnightSleepDataKey))) {
            this.set(this.overnightSleepDataKey, []);
        }
    }

    private set(key: string, value: any) {
        if (this._storage) {
            this._storage.set(key, value);
        } else {
            console.error("[set] Storage not initialized");
        }
    }

    private get(key: string) {
        if (this._storage) {
            return this._storage.get(key);
        } else {
            console.error("Storage not initialized");
            return null;
        }
    }

    async getOvernightDataArray(): Promise<OvernightSleepData[]> {
        await this.initStorage();

        const storedData = await this.get(this.overnightSleepDataKey);

        if (Array.isArray(storedData)) {
            return storedData.map((item) => {
                return new OvernightSleepData(
                    new Date(item.sleepStart),
                    new Date(item.sleepEnd),
                    item.id
                );
            });
        } else {
            return [];
        }
    }

    // Get an array of StanfordSleepinessData
    async getSleepinessDataArray(): Promise<StanfordSleepinessData[]> {
        await this.initStorage();

        const storedData = await this.get(this.daySleepinessDataKey);

        if (Array.isArray(storedData)) {
            return storedData.map((item) => {
                return new StanfordSleepinessData(
                    item.loggedValue,
                    new Date(item.loggedAt),
                    item.id
                );
            });
        } else {
            return [];
        }
    }

    // Check if a key exists in the storage
    private async hasKey(key: string): Promise<boolean> {
        if (this._storage) {
            const keys = await this._storage.keys();
            return keys.includes(key);
        } else {
            console.error("[hasKey] Storage not initialized");
            return false;
        }
    }

    private async addSleepDataToArray(
        key: string,
        objectToAdd: SleepData
    ): Promise<void> {
        if (this._storage) {
            const existingArray = (await this._storage.get(key)) || [];
            existingArray.push(objectToAdd);
            await this._storage.set(key, existingArray);
        } else {
            console.error("[addSleepDataToArray] Storage not initialized");
        }
    }

    private async deleteSleepDataByIdFromArray(
        key: string,
        id: string
    ): Promise<void> {
        if (this._storage) {
            const existingArray = (await this._storage.get(key)) || [];
            const updatedArray = existingArray.filter(
                (obj: { id: string }) => obj.id !== id
            );
            await this._storage.set(key, updatedArray);
        } else {
            console.error(
                "[deleteSleepDataByIdFromArray] Storage not initialized"
            );
        }
    }

    public logOvernightData(sleepData: OvernightSleepData) {
        this.addSleepDataToArray(this.overnightSleepDataKey, sleepData);
    }

    public logSleepinessData(sleepData: StanfordSleepinessData) {
        this.addSleepDataToArray(this.daySleepinessDataKey, sleepData);
    }

    public deleteOvernightSleepData(id: string) {
        this.deleteSleepDataByIdFromArray(this.overnightSleepDataKey, id);
    }

    public deleteDaySleepData(id: string) {
        this.deleteSleepDataByIdFromArray(this.daySleepinessDataKey, id);
    }

    public static getSampleOvernightDataForDebugging(): OvernightSleepData[] {
        return [
            new OvernightSleepData(
                new Date("February 18, 2021 01:03:00"),
                new Date("February 18, 2021 09:25:00")
            ),
            new OvernightSleepData(
                new Date("February 20, 2021 23:11:00"),
                new Date("February 21, 2021 08:03:00")
            )
        ];
    }

    public static getSampleSleepinessDataForDebugging(): StanfordSleepinessData[] {
        return [
            new StanfordSleepinessData(
                4,
                new Date("February 19, 2021 14:38:00")
            ),
            new StanfordSleepinessData(
                7,
                new Date("February 21, 2021 14:38:00")
            )
        ];
    }
}
