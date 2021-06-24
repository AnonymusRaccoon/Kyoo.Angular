import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PanelComponent } from "./panel/panel.component";
import { RouterModule } from "@angular/router";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { OptionComponent } from "./option/option.component";
import { SectionComponent } from "./section/section.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { PluginSectionComponent } from "./plugin-section/plugin-section.component";
import { MatCardModule } from "@angular/material/card";

@NgModule({
	declarations: [
		PanelComponent,
		OptionComponent,
		SectionComponent,
		PluginSectionComponent
	],
	imports: [
		CommonModule,
		MatSidenavModule,
		RouterModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatToolbarModule,
		MatTooltipModule,
		MatCardModule
	]
})
export class AdminModule
{ }
