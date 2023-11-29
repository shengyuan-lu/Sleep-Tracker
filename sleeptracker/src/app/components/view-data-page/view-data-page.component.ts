import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-view-data-page",
    templateUrl: "./view-data-page.component.html",
    styleUrls: ["./view-data-page.component.scss"]
})
export class ViewDataPageComponent implements OnInit {
    selectedSegment = "view-overnight-sleep-data";

    constructor() {}

    ngOnInit() {}
}
