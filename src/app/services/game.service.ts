import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import Two from '../../assets/two.min.js';
import { SpriteService } from './sprite.service.js';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _flower: any;
  private _score: any;
  private _defaultX: number = 1400;
  private _defaultY: number = 20;
  private _scoreXOffset: number = 60;
  private _scoreYOffset: number = 5;
  private _maxX: number = 3400;
  private _maxY: number = 330;

  constructor(private _spriteService: SpriteService) {}

  private _title: any
  private _subtitle: any
  private _increment = 0.02

  private _state = new BehaviorSubject<string>('opening')
  public stateObservable = this._state.asObservable()

  get state() {
    return this._state.getValue()
  }

  set state(value) {
    this._state.next(value)
  }

  initScore(two: any) {
    this._flower = two.makeSprite(this._spriteService.flower.url, this._defaultX, this._defaultY, this._spriteService.flower.columns, this._spriteService.flower.rows, this._spriteService.flower.fps);
    this._flower.scale = .3;
    this._flower.play(0,0);
    this._score = new Two.Text('X', this._defaultX+this._scoreXOffset, this._defaultY+this._scoreYOffset, 'normal');
    this._score.fill = '#ddddFF';
    this._score.stroke = '#FFFFFF';
    this._score.scale = 1.75;
    two.add(this._score);
  }

  displayScore(x: number, y: number, num: number) {
    y=y-285 // top right corner
    if (y<this._defaultY) y=this._defaultY
    if (y<this._maxY) y=this._maxY
    x=x+680
    if (x<this._defaultX) x=this._defaultX
    if (x<this._maxX) x=this._maxX

    

    this._flower.translation.x=x
    this._flower.translation.y=y
    this._score.translation.x=x+this._scoreXOffset
    this._score.translation.y=y+this._scoreYOffset
    this._score.value = 'X' + num
  }

  displayTitle(two: any) {
    this._title = new Two.Text('- natureland -', 1750, 500, 'normal')
    this._title.fill = 'purple'
    this._title.stroke = 'blue'
    this._title.scale = 12
    two.add(this._title);
    this._subtitle = new Two.Text('Click to Begin', 1750, 750, 'normal')
    this._subtitle.fill = 'purple'
    this._subtitle.stroke = 'blue'
    this._subtitle.scale = 6
    two.add(this._subtitle)
  }

  hideScore() {
    if(this._flower) this._flower.scale=0
    if (this._score) this._score.scale=0
  }

  displayGameOver(two: any) {
    this._title = new Two.Text('The End', 1750, 500, 'normal')
    this._title.fill = 'purple'
    this._title.stroke = 'blue'
    this._title.scale = 12
    two.add(this._title); //adds it to screen and downloading it into two
    this._subtitle = new Two.Text('GAME OVER', 1750, 750, 'normal')
    this._subtitle.fill = 'purple'
    this._subtitle.stroke = 'blue'
    this._subtitle.scale = 6
    two.add(this._subtitle)
  }

  displayGameClear(two: any) {
    this._title = new Two.Text('game cleared', 1750, 500, 'normal')
    this._title.fill = 'purple'
    this._title.stroke = 'blue'
    this._title.scale = 12
    two.add(this._title); //adds it to screen and downloading it into two
    this._subtitle = new Two.Text('good job', 1750, 750, 'normal')
    this._subtitle.fill = 'purple'
    this._subtitle.stroke = 'blue'
    this._subtitle.scale = 6
    two.add(this._subtitle)
  }

  hideTitle() {
    this._title.scale=0
    this._subtitle.scale=0

  }


  animateTitle() {
    if (this._title.scale > 12) {
      this._increment = -0.02
    }
    else if (this._title.scale < 11) {
      this._increment = 0.02
    }
    this._title.scale = this._title.scale + this._increment
    this._subtitle.scale = this._subtitle.scale + this._increment
  }

}
