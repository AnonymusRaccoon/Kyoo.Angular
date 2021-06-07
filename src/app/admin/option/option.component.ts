import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from "@angular/core";
import { Option } from "../models/option";
import { OptionChanged } from "../models/option-changed";

@Component({
	selector: "app-option",
	templateUrl: "./option.component.html",
	styleUrls: ["./option.component.scss"]
})
export class OptionComponent implements OnInit
{
	value: string;
	@Input() option: Option;
	@Input() config;
	@Output() changed = new EventEmitter<OptionChanged>();
	@ViewChild("input") input: ElementRef<HTMLInputElement>;

	ngOnInit(): void
	{
		this.value = this.getConfig(this.option.slug);
	}

	getConfig(slug: string): string
	{
		const sections: string[] = slug.split(":");
		let conf: any = this.config;

		for (const child of sections)
		{
			if (conf == null)
				throw new Error(`Invalid configuration. No resource at ${slug}`);
			conf = conf[child];
		}
		return conf;
	}

	onValueChanged(): void
	{
		this.changed.emit({
			slug: this.option.slug,
			oldValue: this.value,
			newValue: this.input.nativeElement.value
		});
	}
}
