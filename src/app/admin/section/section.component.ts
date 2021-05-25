import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ConfigurationSection } from "../models/configuration-section";
import { OptionChanged } from "../models/option-changed";

@Component({
	selector: "app-section",
	templateUrl: "./section.component.html",
	styleUrls: ["./section.component.scss"]
})
export class SectionComponent
{
	@Input() section: ConfigurationSection;
	@Input() config: any;
	@Output() changed = new EventEmitter<OptionChanged>();
}
