import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { Show } from "../../models/resources/show";
import { DomSanitizer, SafeStyle, Title } from "@angular/platform-browser";
import { Season } from "../../models/resources/season";
import { Page } from "../../models/page";
import { Episode } from "../../models/resources/episode";
import { People } from "../../models/resources/people";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { EpisodeService, PeopleService, SeasonService } from "../../services/api.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"]
})
export class HomepageComponent implements AfterViewInit, OnDestroy
{
	show: Show;
	seasons: Season[];
	season = 1;
	episodes: Page<Episode>[] = [];
	people: Page<People>;

	private scrollZone: HTMLElement;
	private toolbar: HTMLElement;
	private backdrop: HTMLElement;

	constructor(private route: ActivatedRoute,
				         private snackBar: MatSnackBar,
				         private sanitizer: DomSanitizer,
				         private title: Title,
				         private router: Router,
				         private dialog: MatDialog,
				         private http: HttpClient,
				         private seasonService: SeasonService,
				         private episodeService: EpisodeService,
				         private peopleService: PeopleService)
	{
		this.route.queryParams.subscribe(params =>
		{
			this.season = params.season ?? 1;
		});

		this.route.data.subscribe(data =>
		{
			this.show = data.show;
			//
			// this.peopleService.getFromShow(this.show.slug).subscribe(x => this.people = x);

			// if (this.show.isMovie)
			// 	return;
		});
	}

	// getThumb(item: Show): SafeStyle
	// {
	// 	return this.sanitizer.bypassSecurityTrustStyle(`url(${item.poster})`);
	// }

  ngAfterViewInit(): void
  {
	  this.scrollZone = document.getElementById("main");
	  this.toolbar = document.getElementById("toolbar");
	  this.backdrop = document.getElementById("backdrop");
	  this.toolbar.setAttribute("style", `background-color: rgba(0, 0, 0, 0) !important`);
	  this.scrollZone.style.marginTop = "0";
	  this.scrollZone.style.maxHeight = "100vh";
	  // this.scrollZone.addEventListener("scroll", () => this.scroll());
  }

  ngOnDestroy(): void
  {
	  this.title.setTitle("Kyoo");
	  this.toolbar.setAttribute("style", `background-color: #000000 !important`);
	  this.scrollZone.style.marginTop = null;
	  this.scrollZone.style.maxHeight = null;
  }
  scroll(): void {
	  const opacity: number = 2 * this.scrollZone.scrollTop / this.backdrop.clientHeight;
  }
}
