import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConfigurationSection } from "../models/configuration-section";
import { OptionChanged } from "../models/option-changed";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: "app-panel",
	templateUrl: "./panel.component.html",
	styleUrls: ["./panel.component.scss"]
})
export class PanelComponent
{
	items: ConfigurationSection[];
	config: any;
	changed: {[key: string]: string} = {};
	get changedCount(): number
	{
		return Object.keys(this.changed).length;
	}

	constructor(private route: ActivatedRoute,
	            private http: HttpClient)
	{
		this.route.data.subscribe(x =>
		{
			this.items = x.items;
			this.config = x.config;
		});
	}

	onOptionChanged(event: OptionChanged): void
	{
		if (event.newValue === event.oldValue)
			this.changed[event.slug] = undefined;
		else
			this.changed[event.slug] = event.newValue;
	}

	onSave(): void
	{
		this.http.put("/api/config", this.changed)
			.subscribe(x => console.log(x));
	}
}
