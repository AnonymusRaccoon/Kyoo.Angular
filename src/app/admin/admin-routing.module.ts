import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PanelComponent } from "./panel/panel.component";
import { ItemResolver } from "../services/item-resolver.service";

const routes: Routes = [
	{path: "admin", component: PanelComponent,
		resolve: {
			items: ItemResolver.forResource("config/panel"),
			config: ItemResolver.forResource("config")
		}
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
