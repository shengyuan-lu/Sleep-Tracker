import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { TabBarComponent } from "./components/tab-bar/tab-bar.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: "",
                component: TabBarComponent,
                children: [
                    {
                        path: "",
                        pathMatch: "full",
                        redirectTo: "log-data-page"
                    },
                    {
                        path: "log-data-page",
                        loadChildren: () =>
                            import(
                                "./components/log-data-page/log-data-page.module"
                            ).then((m) => m.LogDataPageModule)
                    },
                    {
                        path: "view-data-page",
                        loadChildren: () =>
                            import(
                                "./components/view-data-page/view-data-page.module"
                            ).then((m) => m.ViewDataPageModule)
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
