import { Component, OnDestroy, AfterViewInit, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DomSanitizer, SafeStyle, Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, Validators } from "@angular/forms";
import { BreakpointObserver } from "@angular/cdk/layout";
import { StepperOrientation } from "@angular/material/stepper";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Component({
	selector: "app-quickstart",
	templateUrl: "./quickstart.component.html",
	styleUrls: ["./quickstart.component.scss"]
})
export class QuickstartComponent implements OnDestroy, AfterViewInit {

	private scrollZone: HTMLElement;
	private toolbar: HTMLElement;

	firstFormGroup = this._formBuilder.group({
		firstCtrl: ["", Validators.required]
	});
	secondFormGroup = this._formBuilder.group({
		secondCtrl: ["", Validators.required]
	});
	thirdFormGroup = this._formBuilder.group({
		thirdCtrl: ["", Validators.required]
	});
	stepperOrientation: Observable<StepperOrientation>;

	isShowDivIf = true;

	toggleDisplayDivIf() {

		this.isShowDivIf = !this.isShowDivIf;

	}
	constructor(private route: ActivatedRoute,
				         private snackBar: MatSnackBar,
				         private sanitizer: DomSanitizer,
				         private title: Title,
				         private router: Router,
				         private dialog: MatDialog,
				         private http: HttpClient,
				         private _formBuilder: FormBuilder,
				         breakpointObserver: BreakpointObserver) {
		this.title.setTitle("Quickstart");
		this.stepperOrientation = breakpointObserver.observe("(min-width: 800px)")
			.pipe(map(({matches}) => matches ? "horizontal" : "vertical"));
	}

	ngOnDestroy(): void {

	}

	ngAfterViewInit(): void {
		this.scrollZone = document.getElementById("main");
		this.toolbar = document.getElementById("toolbar");
		this.toolbar.setAttribute("style", `display: none !important`);
		this.scrollZone.style.marginTop = "0";
		this.scrollZone.style.maxHeight = "100vh";
	}
}
