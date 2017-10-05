import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnChanges {
  private icons: { [key: string]: string };

  @Input()
  score: number;

  roundScore: number;
  stars: string[];

  constructor() {
    this.icons = {
      'empty': 'star_border',
      'half': 'star_half',
      'full': 'star'
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stars = this.toStars(changes.score.currentValue);
  }

  toStars(score: number): string[] {
    const int = Math.floor(score), decimal = score - int;
    const stars: string[] = [];

    for (let i = 0; i < 5; i++) {
      let value = this.icons.empty;

      if (int - i > 0) {
        value = this.icons.full;
      } else if (int - i == 0 && decimal > 0) {
        value = this.icons.half;
      }

      stars.push(value);
    }

    return stars;
  }
}
