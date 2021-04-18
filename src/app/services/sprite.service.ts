
import { Injectable } from '@angular/core';

export interface Sprite {
  name: string;
  visibility: boolean;
  state: number;
  direction: string;
  lastDirection: string;
  maxSpeed: number;
  acceleration: number;
  scale: number;
  playable: boolean;

  url: string;
  fps: number;
  x: number;
  y: number;

  rows: number;
  columns: number;

  spriteReference: any;

  leftFrames: number[];
  rightFrames: number[];
}
@Injectable({
  providedIn: 'root'
})
export class SpriteService {
  sprites:Sprite[]=[{
    name: 'Butterfly',
    visibility: true,
    state: 0,
    direction: 'right',
    lastDirection: 'right',
    maxSpeed: 12,
    acceleration: 2,
    scale: 10,
    playable: true, 
    url: '../assets/sprites/butterfly.png',
    fps: 7,
    x: 200,
    y: 200,
    rows: 1,
    columns: 18,
    spriteReference: null,
    leftFrames: [0, 17],
    rightFrames: [0,17]
  }];

  bee:Sprite = {
    name: 'bee',
    visibility: true,
    state: 0,
    direction: 'right',
    lastDirection: 'right',
    maxSpeed: 12,
    acceleration: 2,
    scale: 10,
    playable: true, 
    url: '../assets/sprites/bee.png',
    fps: 7,
    x: 200,
    y: 200,
    rows: 1,
    columns: 18,
    spriteReference: null,
    leftFrames: [0, 17],
    rightFrames: [0,17]
  }

    flower:Sprite = {
      name: 'flower',
      visibility: true,
      state: 0,
      direction: 'right',
      lastDirection: 'right',
      maxSpeed: 12,
      acceleration: 2,
      scale: 10,
      playable: true, 
      url: '../assets/sprites/flower.png',
      fps: 7,
      x: 200,
      y: 200,
      rows: 1,
      columns: 18,
      spriteReference: null,
      leftFrames: [0, 17],
      rightFrames: [0,17]
    }
  
  constructor() { }

  populateBee(numberToPopulate: number) {
    for(let i=0; i<numberToPopulate; i++) {
      let bee = this.bee;
      bee.x = 200 + i
      bee.y = 200 + i
      this.sprites.push(JSON.parse(JSON.stringify(bee)))
    }
  }

  populateFlower(numberToPopulate: number) {
    for(let i=0; i<numberToPopulate; i++) {
      let flower = this.flower;
      flower.x = 200 + i
      flower.y = 200 + i
      this.sprites.push(JSON.parse(JSON.stringify(flower)))
    }
  }

}

