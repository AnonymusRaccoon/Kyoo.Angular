import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfigurationSection } from "../models/configuration-section";

@Component({
	selector: "app-panel",
	templateUrl: "./panel.component.html",
	styleUrls: ["./panel.component.scss"]
})
export class PanelComponent
{
	items: ConfigurationSection[];
	config: any;

	constructor(private route: ActivatedRoute)
	{
		this.route.data.subscribe(x =>
		{
			this.items = x.items;
			this.config = x.config;
		});
	}

	getChanges(): number
	{
		return 0;
	}
}
