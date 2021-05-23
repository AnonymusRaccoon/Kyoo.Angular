import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Option } from "../models/option";
import { HttpClient } from "@angular/common/http";

@Component({
	selector: "app-option",
	templateUrl: "./option.component.html",
	styleUrls: ["./option.component.scss"]
})
export class OptionComponent implements OnInit, OnDestroy
{
	value: string;
	@Input() option: Option;
	@Input() config;
	@ViewChild("input") input: ElementRef<HTMLInputElement>;

	constructor(private http: HttpClient)
	{}

	ngOnInit(): void
	{
		this.value = this.getConfig(this.option.slug);
	}

	getConfig(slug: string): string
	{
		const sections = slug.split(':');
		let conf = this.config;

		for (const child of sections)
		{
			if (conf == null)
				throw new Error(`Invalid configuration. No resource at ${slug}`);
			conf = conf[child];
		}
		return conf;
	}
	async ngOnDestroy()
	{
		if (this.value == this.input.nativeElement.value)
			return;
		await this.http.put(`/api/config/${this.option.slug}`, this.input.nativeElement.value);
	}
}
