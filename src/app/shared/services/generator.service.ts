import { Injectable } from '@angular/core';
import * as gifshot from 'gifshot';

@Injectable()

export class GeneratorService {


  constructor() {}

  photosConvert(photos: any, speed: any) {
    return new Promise((resolve, reject) => {

      gifshot.createGIF({
        'images': photos,
        'frameDuration': speed,
        'text': 'ololo'
      }, (obj) => {
        if (obj.error) {
          console.log(obj);
        }

        resolve(obj.image);
      });
    });
  }

}
