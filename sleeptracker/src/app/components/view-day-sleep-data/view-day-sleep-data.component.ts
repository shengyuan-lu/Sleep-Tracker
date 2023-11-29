import { Component, OnInit } from "@angular/core";
import { SleepService } from "../../services/sleep.service";
import { StanfordSleepinessData } from "../../data/stanford-sleepiness-data";

@Component({
    selector: "app-view-day-sleep-data",
    templateUrl: "./view-day-sleep-data.component.html",
    styleUrls: ["./view-day-sleep-data.component.scss"]
})
export class ViewDaySleepDataComponent implements OnInit {
    daySleepinessData: StanfordSleepinessData[] = [];

    private sleepService: SleepService;

    constructor(sleepService: SleepService) {
        this.sleepService = sleepService;
        this.loadDaySleepData();
    }

    ngOnInit() {
        this.loadDaySleepData();
    }

    loadDaySleepData() {
        this.sleepService.getSleepinessDataArray().then((data) => {
            this.daySleepinessData = data;
        });
    }

    deleteDaySleepData(id: string) {
        this.sleepService.deleteDaySleepData(id);
        this.loadDaySleepData();
    }
}
