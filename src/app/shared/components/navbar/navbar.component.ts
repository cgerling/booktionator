import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input('withSearch')
  withSearch: boolean = true;
  @Input('isLogged')
  isLogged: boolean = false;
  @Input('loggedUser')
  username: string = '';
  @Input('actualPage')
  pageName: string = '';

  pageRoute: string = 'access/login';
  accessText: string = 'Sign in';

  ngOnInit(): void {
    this.withSearch = this.withSearch.toString() == 'true';
    this.isLogged = this.isLogged.toString() == 'true';

    if (this.pageName.toLowerCase() === 'login') {
      this.accessText = 'Sign up';
      this.pageRoute = '/access/register';
    } else if (this.pageName.toLowerCase() === 'register') {
      this.accessText = 'Sign in';
      this.pageRoute = '/access/login';
    }
  }
}
