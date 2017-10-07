import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loading: boolean;

  private loader: LoaderService;

  constructor(loader: LoaderService) {
    this.loader = loader;

    this.loading = false;
  }

  ngOnInit(): void {
    this.loader.loading$.subscribe(this.onLoad.bind(this));
  }

  onLoad(isLoading: boolean): void {
    this.loading = isLoading;
  }
}
