import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Plugin, PluginRepository } from "../../models/plugins";

@Component({
  selector: "app-plugin-section",
  templateUrl: "./plugin-section.component.html",
  styleUrls: ["./plugin-section.component.scss"]
})
export class PluginSectionComponent
{
	repositories: PluginRepository[];

	constructor(private http: HttpClient)
	{
		this.http.get<PluginRepository[]>("/api/plugins")
			.subscribe(x => this.repositories = x);
	}

	install(plugin: Plugin): void
	{
		this.http.put(`/api/plugins`, plugin).subscribe();
	}
}
