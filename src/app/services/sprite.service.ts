
import { Injectable } from '@angular/core';
import { MapService } from './map.service';

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
  type: string;

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
    type: 'self',
    url: '../assets/sprites/butterfly.png',
    fps: 7,
    x: 200,
    y: 200,
    rows: 2,
    columns: 4,
    spriteReference: null,
    leftFrames: [0, 3],
    rightFrames: [4,7]
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
    type: 'predator',
    url: '../assets/sprites/bee.png',
    fps: 7,
    x: 200,
    y: 200,
    rows: 2,
    columns: 6,
    spriteReference: null,
    leftFrames: [0, 5],
    rightFrames: [6, 11]
  }

    flower:Sprite = {
      name: 'flower',
      visibility: true,
      state: 0,
      direction: 'right',
      lastDirection: 'right',
      maxSpeed: 0,
      acceleration: 2,
      scale: 10,
      playable: true, 
      type: 'food',
      url: '../assets/sprites/flower.png',
      fps: 7,
      x: 200,
      y: 200,
      rows: 1,
      columns: 6,
      spriteReference: null,
      leftFrames: [0, 17],
      rightFrames: [0,17]
    }
  
    cloud:Sprite = {
    name: 'cloud',
    visibility: true,
    state: 0,
    direction: 'none',
    lastDirection: 'none',
    maxSpeed: 0,
    acceleration: 2,
    scale: 10,
    playable: true, 
    type: 'object',
    url: '../assets/sprites/cloud.png',
    fps: 7,
    x: 200,
    y: 200,
    rows: 1,
    columns: 4,
    spriteReference: null,
    leftFrames: [0, 1],
    rightFrames: [0, 1]
    }

    plant:Sprite = {
      name: 'plant',
      visibility: true,
      state: 0,
      direction: 'none',
      lastDirection: 'none',
      maxSpeed: 0,
      acceleration: 2,
      scale: 7,
      playable: true, 
      type: 'object',
      url: '../assets/sprites/plant.png',
      fps: 7,
      x: 200,
      y: 200,
      rows: 2,
      columns: 1,
      spriteReference: null,
      leftFrames: [0, 1],
      rightFrames: [0, 1]
      }

  constructor(private _mapService: MapService) { }

  populateBee(numberToPopulate: number) {
    for(let i=0; i<numberToPopulate; i++) {
      let bee = this.bee;
      bee.x = Math.floor(Math.random() * 750 * i)+300; // if u end up with decimals, the floor function rounds it down
      bee.y = Math.floor(Math.random() * 300 * i)+100;
      this.sprites.push(JSON.parse(JSON.stringify(bee)))
    }
  }

  populateFlower(numberToPopulate: number) {
    for(let i=0; i<numberToPopulate; i++) {
      let flower = this.flower;
      flower.x = Math.floor(Math.random() * 1000 * i)+300; // + i only separates the sprites by 1 pixel... so use * to make the difference 200 +
      flower.y = Math.floor(Math.random() * 120 * i)+600; 
      this.sprites.push(JSON.parse(JSON.stringify(flower)))
    }
  }

  populateCloud(numberToPopulate: number) {
    for(let i=0; i<numberToPopulate; i++) {
      let cloud = this.cloud;
      cloud.x = Math.floor(Math.random() * 1200 * i)+300;
      cloud.y = Math.floor(Math.random() * 100 * i)+80;
      this.sprites.push(JSON.parse(JSON.stringify(cloud)))
    }
  }

  populatePlant(numberToPopulate: number) {
    for(let i=0; i<numberToPopulate; i++) {
      let plant = this.plant;
      plant.x = Math.floor(Math.random() * 1000 * i)+300;
      plant.y = Math.floor(Math.random() * 120 * i)+600;
      this.sprites.push(JSON.parse(JSON.stringify(plant)))
    }
  }

}

