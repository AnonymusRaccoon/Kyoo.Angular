import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, EMPTY} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Page} from "../../models/page";
import {IResource} from "../../models/resources/resource";

type RouteMapper = (route: ActivatedRouteSnapshot, endpoint: string) => string;

@Injectable()
export class PageResolver
{
	public static resolvers: any[] = [];

	static forResource<T extends IResource>(resource: string, copyParams: boolean | string[] | RouteMapper = false)
	{
		@Injectable()
		class Resolver implements Resolve<Page<T>>
		{
			constructor(private http: HttpClient,
			            private snackBar: MatSnackBar)
			{ }

			resolve(route: ActivatedRouteSnapshot): Page<T> | Observable<Page<T>> | Promise<Page<T>>
			{
				let res: string = resource.replace(/:(.*?)(\/|$)/, (x, y) => `${route.paramMap.get(y)}/`);
				let uri: string;
				if (typeof copyParams == "function")
					uri = copyParams(route, res);
				else
				{
					let queryParams: [string, string][] = copyParams == true
						? Object.entries(route.queryParams)
						: Object.entries(route.queryParams).filter(x => copyParams && copyParams.includes(x[0]));
					let params: string = queryParams.length > 0
						? '?' + queryParams.map(x => `${x[0]}=${x[1]}`).join('&')
						: "";
					uri = `api/${res}${params}`;
				}

				return this.http.get<Page<T>>(uri)
					.pipe(
						map(x => Object.assign(new Page<T>(), x)),
						catchError((error: HttpErrorResponse) =>
						{
							console.log(error.status + " - " + error.message);
							this.snackBar.open(`An unknown error occurred: ${error.message}.`, null, {
								horizontalPosition: "left",
								panelClass: ['snackError'],
								duration: 2500
							});
							return EMPTY;
						}));
			}
		}
		PageResolver.resolvers.push(Resolver);
		return Resolver;
	}
}
