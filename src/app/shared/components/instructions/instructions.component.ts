import { Component, Input } from '@angular/core';

@Component({
  selector: 'instructions',
  templateUrl: 'instructions.component.html',
  styleUrls: ['instructions.component.scss']
})
export class InstructionsComponent {
  @Input()
  message: string;
}
