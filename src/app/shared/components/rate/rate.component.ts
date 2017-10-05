import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RatingComponent implements OnInit, OnChanges {
  private icons: { [key: string]: string };

  @Input()
  score: number;
  @Input()
  disabled: string;

  @Output()
  rated: EventEmitter<number>;

  roundScore: number;
  stars: string[];

  constructor() {
    this.icons = {
      'empty': 'star_border',
      'half': 'star_half',
      'full': 'star'
    };

    this.rated = new EventEmitter<number>(true);
  }

  ngOnInit(): void {
    const score = Number.parseFloat(this.score.toString()) || 0;
    this.setScore(score);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setScore(changes.score.currentValue);
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

  rate(event, saveScore = false): void {
    if (this.isDisabled()) return;

    const note = Number.parseInt(event.target.attributes.index.value) + 1;
    this.updateStars(note);

    if (saveScore) {
      this.setScore(note);
      this.rated.emit(note);
    }
  }

  updateStars(score = this.score): void {
    this.stars = this.toStars(score);
  }

  setScore(score: number): void {
    this.score = score;
    this.updateStars();
  }

  private isDisabled(): boolean {
    return typeof this.disabled === 'string' && this.disabled.length >= 0;
  }
}
