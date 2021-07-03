import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertBoxComponent } from "./alert-box/alert-box.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingComponent } from "./loading/loading.component";

@NgModule({
    declarations: [
        AlertBoxComponent,
        LoadingComponent,
        DropdownDirective
    ],
    imports: [CommonModule],
    exports: [
        AlertBoxComponent,
        DropdownDirective,
        LoadingComponent
    ]
})

export class SharedModule { }