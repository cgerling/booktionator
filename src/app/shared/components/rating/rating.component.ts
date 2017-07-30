import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input()
  score: number;

  roundScore: number;
  stars: string[];


  ngOnInit(): void {
    this.stars = this.toStars(this.score);
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
