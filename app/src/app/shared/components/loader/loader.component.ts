import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'app/shared/services/loader.service';

@Component({
  selector: 'loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading: boolean;

  private loader: LoaderService;

  constructor() {
    this.loader = LoaderService.getInstance();
  }

  ngOnInit(): void {
    this.loader.state.subscribe(this.onLoading.bind(this));
  }

  onLoading(isLoading: boolean): void {
    this.loading = isLoading;
  }
}
