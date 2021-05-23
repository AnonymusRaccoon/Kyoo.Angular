import { Component, Input } from "@angular/core";
import { ConfigurationSection } from "../models/configuration-section";

@Component({
	selector: "app-section",
	templateUrl: "./section.component.html",
	styleUrls: ["./section.component.scss"]
})
export class SectionComponent
{
	@Input() section: ConfigurationSection;
	@Input() config: any;
}
