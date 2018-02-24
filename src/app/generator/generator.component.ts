import { Component, OnInit } from '@angular/core';
import { GeneratorService } from './../shared/services/generator.service';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  photos: Array<string> = [];
  gif: any;

  constructor(private generatorService: GeneratorService) { }

  ngOnInit() {

  }
  handleFileInput(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.photos.push( window.URL.createObjectURL(files[i]) );
    }
    this.generatorService.photosConvert(this.photos).then(result => {
      console.log(result);
    });
    console.log(this.gif);
  }
}
