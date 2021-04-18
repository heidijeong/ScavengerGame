import { Component, HostListener, OnInit } from '@angular/core';
import Two from '../assets/two.min.js';
import { CameraService } from './services/camera.service.js';
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
 
  constructor(private _spriteService: SpriteService, private _cameraService: CameraService) {}

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
      width: this.max_x+'px',
      height: this.max_y+'px',
      autostart: true
    };
    let two = new Two(params).appendTo(elem);
    console.log('hi');

    this._cameraService.init(this.max_x, this.max_y)
  
    let x = 1000;
    let y = 300;
    let x1 = 500;
    let y1 = 200;

    let startTime = Date.now();

    let scaleDelta=.05;

    this._spriteService.sprites[0].spriteReference = two.makeSprite(this._spriteService.sprites[0].url,
      this._spriteService.sprites[0].x,
      this._spriteService.sprites[0].y,
      this._spriteService.sprites[0].columns,
      this._spriteService.sprites[0].rows,
      this._spriteService.sprites[0].fps);
      this._spriteService.sprites[0].spriteReference.scale = this._spriteService.sprites[0].scale;
      this._spriteService.sprites[0].spriteReference.play()

    two.bind('update', (framesPerSecond)=>{
     this._spriteService.sprites[0].spriteReference.translation.x = this.x;
     this._spriteService.sprites[0].spriteReference.translation.y = this.y;

      this._cameraService.zoomCamera(this.x, this.y);
    
      for (let i=0; i<this._spriteService.sprites.length; i++) {
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