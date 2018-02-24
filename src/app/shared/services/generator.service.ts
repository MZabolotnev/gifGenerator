import { Injectable } from '@angular/core';
import * as gifshot from 'gifshot';

@Injectable()

export class GeneratorService {


  constructor() {}

  photosConvert(photos: any) {
    return new Promise((resolve, reject) => {

      gifshot.createGIF({
        'images': photos
      }, (obj) => {
        if (obj.error) {
          console.log(obj);
        }

        resolve(obj.img);
      });

    });
  }

}
