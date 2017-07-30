import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input()
  exec: Function;

  term: string;
  mode: string;

  constructor() {
    this.term = '';
    this.mode = 'search';
  }

  isEmpty(): boolean {
    return this.term.trim() === '';
  }

  clear(): void {
    this.term = '';
  }

  submit(): void {
    this.exec();
  }
}
