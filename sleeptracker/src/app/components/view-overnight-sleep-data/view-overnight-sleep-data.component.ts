import { Component, OnInit } from "@angular/core";
import { SleepService } from "../../services/sleep.service";
import { OvernightSleepData } from "../../data/overnight-sleep-data";

@Component({
    selector: "app-view-overnight-sleep-data",
    templateUrl: "./view-overnight-sleep-data.component.html",
    styleUrls: ["./view-overnight-sleep-data.component.scss"]
})
export class ViewOvernightSleepDataComponent implements OnInit {
    overnightSleepData: OvernightSleepData[] = [];

    private sleepService: SleepService;

    constructor(sleepService: SleepService) {
        this.sleepService = sleepService;
        this.loadOvernightSleepData();
    }

    ngOnInit() {
        this.loadOvernightSleepData();
    }

    loadOvernightSleepData() {
        this.sleepService.getOvernightDataArray().then((data) => {
            this.overnightSleepData = data;
        });
    }

    deleteOvernightData(id: string) {
        this.sleepService.deleteOvernightSleepData(id);
        this.loadOvernightSleepData();
    }
}
