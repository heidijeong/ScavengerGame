import { Component, HostListener, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
import { AiService } from './services/ai.service.js';
import { CameraService } from './services/camera.service.js';
import { CollisionService } from './services/collision.service.js';
import { MapService } from './services/map.service.js';
import { SpriteService } from './services/sprite.service.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  x: number = 200;
  y: number = 200;

  max_x: number = 2300;
  max_y: number = 5000;
 
  constructor(private _spriteService: SpriteService, private _cameraService: CameraService, private _aiService: AiService, private _mapService: MapService, private _collisionService: CollisionService) {}

  @HostListener('document:keydown',['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.key == 'ArrowLeft') {
      this.x=this.x-10;
    }
    if (event.key == 'ArrowUp') {
      this.y=this.y-10;
    }
    else if (event.key =='ArrowRight') {
      this.x=this.x+10;
    }
    else if (event.key == 'ArrowDown') {
      this.y=this.y+10
    }
    console.log(this.x)
    console.log(this.y)
  }

  ngOnInit(): void {
    let elem = document.getElementById('draw-shapes');
    let params = {
      width: this._mapService.MAX_X,
      height: this._mapService.MAX_Y,
      autostart: true
    };
    let two = new Two(params).appendTo(elem);
    console.log('hi');

    this._spriteService.populateBee(6);
    this._spriteService.populateFlower(15);
    this._spriteService.populateCloud(10);
    this._spriteService.populatePlant(6);
    this._mapService.init(two);

    for (let i=0; i<this._spriteService.sprites.length; i++) {
      let sprite = this._spriteService.sprites[i];
      this._spriteService.sprites[i].spriteReference=two.makeSprite(sprite.url, sprite.x, sprite.y, sprite.columns, sprite.rows, sprite.fps);
      this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0], this._spriteService.sprites[i].rightFrames[i]);
      this._spriteService.sprites[i].spriteReference.scale=this._spriteService.sprites[i].scale;
    }

    this._cameraService.init(this.max_x, this.max_y)

    two.bind('update', (framesPerSecond)=>{
    if(!this._collisionService.detectBorder(this._spriteService.sprites[0], this._spriteService.sprites[0].x, 
      this._spriteService.sprites[0].y, this.x, this.y)) {
        this._spriteService.sprites[0].spriteReference.translation.x = this.x;
        this._spriteService.sprites[0].x = this.x;
        this._spriteService.sprites[0].spriteReference.translation.y = this.y;
        this._spriteService.sprites[0].y = this.y
        this._cameraService.zoomCamera(this.x, this.y);
      }

      else {
        this.x = this._spriteService.sprites[0].x
        this.y = this._spriteService.sprites[0].y
      }
    
      for (let i=0; i<this._spriteService.sprites.length; i++) {
        if (i>0) {
          if(!this._spriteService.sprites[i]) continue
          let oldX = this._spriteService.sprites[i].x
          let oldY = this._spriteService.sprites[i].y 
          this._spriteService.sprites[i]=this._aiService.basicAI(this._spriteService.sprites[i]);
          if (!this._collisionService.detectBorder(this._spriteService.sprites[i], oldX, oldY, this._spriteService.sprites[i].x, this._spriteService.sprites[i].y)) {
            this._spriteService.sprites[i].spriteReference.translation.x = this._spriteService.sprites[i].x;
            this._spriteService.sprites[i].spriteReference.translation.y = this._spriteService.sprites[i].y;
            this._spriteService.sprites[i].spriteReference.scale = this._spriteService.sprites[i].scale;
          }
          else {
            this._spriteService.sprites[i].x = oldX
            this._spriteService.sprites[i].y = oldY
          }
          this._collisionService.detectCollision(this._spriteService.sprites[0], this._spriteService.sprites[i]);
        }
        if (this._spriteService.sprites[i].direction != this._spriteService.sprites[i].lastDirection) {
          this._spriteService.sprites[i].lastDirection=this._spriteService.sprites[i].direction;
          if (this._spriteService.sprites[i].direction=='right') {
            this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].rightFrames[0],
              this._spriteService.sprites[i].rightFrames[1])
          }
          else {
            this._spriteService.sprites[i].spriteReference.play(this._spriteService.sprites[i].leftFrames[0],
              this._spriteService.sprites[i].leftFrames[1])
          }
        }
      }
    });
  }

  title = 'spacecraft';

}