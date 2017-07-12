import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  withSearch: boolean;
  @Input()
  isLogged: boolean;
  @Input()
  loggedUser: string;
  @Input()
  actualPage: string;

  pageRoute: string;
  accessText: string;

  constructor() {
    this.withSearch = true;
    this.isLogged = true;
    this.loggedUser = '';
    this.actualPage = '';
    this.pageRoute = 'access/login';
    this.accessText = 'Sign in';
  }

  ngOnInit(): void {
    this.withSearch = this.withSearch.toString() === 'true';
    this.isLogged = this.isLogged.toString() === 'true';

    if (this.actualPage.toLowerCase() === 'login') {
      this.accessText = 'Sign up';
      this.pageRoute = '/access/register';
    } else if (this.actualPage.toLowerCase() === 'register') {
      this.accessText = 'Sign in';
      this.pageRoute = '/access/login';
    }
  }
}
