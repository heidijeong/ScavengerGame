import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  MAX_X: number = 3500;
  MAX_Y: number = 1500;

  constructor() { }

  init(two: any) {
    let sky = two.makeRectangle(0, 0, 7000, 1500);
    sky.fill = '#6495ED';

    

    let ground = two.makeRectangle(0, 1100, 7000, 800);
    ground.fill = 'green';
 

    let sun = two.makeCircle(620, 300, 150);
    sun.fill = 'yellow';

  }
}
