import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { HeaderComponent } from "./header/header.component";
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from "./sidebar/sidebar.component";


@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NopagefoundComponent
    ],
    imports: [
        RouterModule,
        CommonModule
    ]
})
export class SharedModule {}

