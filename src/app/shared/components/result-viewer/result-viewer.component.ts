import { Component, Input } from '@angular/core';

@Component({
  selector: 'result-viewer',
  templateUrl: './result-viewer.component.html',
  styleUrls: ['./result-viewer.component.scss']
})
export class ResultViewerComponent {
  @Input()
  title: string;
  @Input()
  content: string;
  @Input()
  error: boolean;
}
