import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnChanges {
  @Input()
  score: number;

  roundScore: number;
  stars: string[];

  ngOnChanges(changes: SimpleChanges): void {
    this.stars = this.toStars(changes.score.currentValue);
  }

  toStars(score: number): string[] {
    const int = Math.floor(score), decimal = score - int;
    let stars: string[] = [];

    for (let i = 0; i < 5; i++) {
      let value: string;

      if (int - i > 0)
        value = 'star';
      else if (int - i == 0 && decimal > 0)
        value = 'star_half';
      else
        value = 'star_border';

      stars.push(value);
    }

    return stars;
  }
}
