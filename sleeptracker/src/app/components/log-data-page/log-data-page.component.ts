import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-log-data-page",
    templateUrl: "./log-data-page.component.html",
    styleUrls: ["./log-data-page.component.scss"]
})
export class LogDataPageComponent implements OnInit {
    selectedSegment = "log-overnight-sleep";

    constructor() {}

    ngOnInit() {}
}
