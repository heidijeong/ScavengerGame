import { Component, HostListener, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
import { AiService } from './services/ai.service';
import { CameraService } from './services/camera.service';
import { CollisionService } from './services/collision.service';
import { GameService } from './services/game.service';
import { MapService } from './services/map.service';
import { SpriteService } from './services/sprite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  x: number = 200;
  y: number = 300;

  max_x: number = 2300;
  max_y: number = 5000;

  gameState: string = '';

  constructor(private _spriteService: SpriteService, private _cameraService: CameraService, private _aiService: AiService, private _mapService: MapService, private _collisionService: CollisionService, private _gameService: GameService) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key == 'ArrowLeft') {
      this.x = this.x - 10;
      this._spriteService.sprites[0].direction = 'left';
    }
    if (event.key == 'ArrowUp') {
      this.y = this.y - 10;
    }
    else if (event.key == 'ArrowRight') {
      this.x = this.x + 10;
      this._spriteService.sprites[0].direction = 'right';
    }
    else if (event.key == 'ArrowDown') {
      this.y = this.y + 10
    }
   event.preventDefault();
  }

  ngOnInit(): void {
    let elem = document.getElementById('draw-shapes');
    let params = {
      width: this._mapService.MAX_X,
      height: this._mapService.MAX_Y,
      autostart: true //?
    };
    let two = new Two(params).appendTo(elem);

    document.addEventListener('click', () => {
      if (this.gameState == 'opening') {
        this._gameService.state = 'playing';
      }

      else if (this.gameState == 'gameover') {
        this._gameService.state = 'playing';
      }
      });

    this._cameraService.init(this.max_x, this.max_y) //??

    this.initialize(two);

    this._gameService.stateObservable.subscribe((value) => {
      this.gameState = value;
      switch (value) {
        case 'opening':
          this._gameService.hideScore()
          this._gameService.displayTitle(two)
          break;
        case 'playing':
          this._gameService.hideTitle()
          this.initialize(two)
          break;
        case 'gameover':
          this._gameService.displayGameOver(two)
          break;
        case 'gameclear':
          this._gameService.displayGameClear(two)
          break;
      }
    })

    two.bind('update', (framesPerSecond) => {
      //this.playing(two);
      if (this.gameState == 'opening') {
        this._gameService.animateTitle()
        this.playing(two, true)
      }

      else if (this.gameState == 'playing') {
        this.playing(two, false)
      }
    }).play(); //..
  }

  initialize(two:any) {
    for(let i = this._spriteService.sprites.length-1; i>0; i--) {
      this._spriteService.sprites[i].scale=0;
      if(this._spriteService.sprites[i].spriteReference) {
        this._spriteService.sprites[i].spriteReference.scale=0
      }
      this._spriteService.sprites.splice(i, 1);
    }
   

    this._spriteService.sprites[0].x=200;
    this._spriteService.sprites[0].y=200;
    this._spriteService.sprites[0].state =0;
    if(this._spriteService.sprites[0].spriteReference) this._spriteService.sprites[0].spriteReference.scale=0


    this.x = 200;
    this.y= 200;
    
    this._spriteService.populateBee(15);
    this._spriteService.populateFlower(1);
    this._spriteService.populateCloud(7);
    this._spriteService.populatePlant(9);
    this._mapService.init(two);
    this._gameService.initScore(two);
   
    

    for (let i=this._spriteService.sprites.length-1; i>=0; i--) {
      let sprite = this._spriteService.sprites[i];
      this._spriteService.sprites[i].spriteReference = two.makeSprite(sprite.url, sprite.x, sprite.y, sprite.columns, sprite.rows, sprite.fps);
      this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[1]); // i to 1
      this._spriteService.sprites[i].spriteReference.scale = this._spriteService.sprites[i].scale;
    }
  }

  playing(two: any, auto: boolean = false) {
    if (!auto) {
      if (!this._collisionService.detectBorder(this._spriteService.sprites[0], this._spriteService.sprites[0].x,
        this._spriteService.sprites[0].y, this.x, this.y)) {
        this._spriteService.sprites[0].spriteReference.translation.x = this.x;
        this._spriteService.sprites[0].x = this.x;
        this._spriteService.sprites[0].spriteReference.translation.y = this.y;
        this._spriteService.sprites[0].y = this.y;
        this._cameraService.zoomCamera(this.x, this.y);
      }

      else {
        this.x = this._spriteService.sprites[0].x
        this.y = this._spriteService.sprites[0].y
      }
    }

      for (let i = this._spriteService.sprites.length - 1; i >= 0; i--) {
        if (i > 0 || auto) {
          if (!this._spriteService.sprites[i]) continue
          let oldX = this._spriteService.sprites[i].x
          let oldY = this._spriteService.sprites[i].y
          this._spriteService.sprites[i] = this._aiService.basicAI(this._spriteService.sprites[i]);
          if (!this._collisionService.detectBorder(this._spriteService.sprites[i], oldX, oldY, this._spriteService.sprites[i].x, this._spriteService.sprites[i].y)) {
            this._spriteService.sprites[i].spriteReference.translation.x = this._spriteService.sprites[i].x;
            this._spriteService.sprites[i].spriteReference.translation.y = this._spriteService.sprites[i].y;
            this._spriteService.sprites[i].spriteReference.scale = this._spriteService.sprites[i].scale;
          }
          else {
            this._spriteService.sprites[i].x = oldX
            this._spriteService.sprites[i].y = oldY
          }
          if (!auto) this._collisionService.detectCollision(this._spriteService.sprites[0], this._spriteService.sprites[i]);
        }
        if (this._spriteService.sprites[i].direction != this._spriteService.sprites[i].lastDirection) {
          this._spriteService.sprites[i].lastDirection = this._spriteService.sprites[i].direction;
          if (this._spriteService.sprites[i].direction == 'right') {
            this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0],
              this._spriteService.sprites[i].rightFrames[1])
          }
          else {
            this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].leftFrames[0],
              this._spriteService.sprites[i].leftFrames[1])
          }
        }
      }
      let numberOfFlowers = 0
      for (let sprite of this._spriteService.sprites) {
        if (sprite.type=='prey' && sprite.spriteReference.scale>0) {
          numberOfFlowers++
        }
      }
      if (numberOfFlowers == 0 ) {
        this._gameService.state = 'gameclear'
      }
      if (!auto) this._gameService.displayScore(this.x, this.y, numberOfFlowers);
    }

  title = 'ScavengerGame';

}