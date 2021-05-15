import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: "app-quickstart",
	templateUrl: "./quickstart.component.html",
	styleUrls: ["./quickstart.component.scss"]
})
export class QuickstartComponent
{
	setupForm: FormGroup;
	userForm: FormGroup;
	libraryForm: FormGroup;

	constructor(private formBuilder: FormBuilder)
	{
		this.setupForm = formBuilder.group({
			url: ["", Validators.required],
			psqlServer: ["", Validators.required],
			psqlPort: ["", Validators.required],
			psqlDb: ["", Validators.required],
			psqlUser: ["", Validators.required],
			psqlPassword: ["", Validators.required]
		});
		this.userForm = formBuilder.group({});
		this.libraryForm = formBuilder.group({});
	}
}
