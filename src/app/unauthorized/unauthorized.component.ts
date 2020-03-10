import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
 	selector: 'app-unauthorized',
 	templateUrl: './unauthorized.component.html',
 	styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent 
{
 	constructor(private authManager: AuthService) { }

 	isLoggedIn() : boolean
    {
    	return this.authManager.isAuthenticated;
    }
}
