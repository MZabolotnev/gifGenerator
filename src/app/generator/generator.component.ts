import { Component, OnInit } from '@angular/core';
import { GeneratorService } from './../shared/services/generator.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import {
  FormArray,
  FormControl, FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {
  rawPhotos: Array<SafeUrl> = [];
  photos: Array<string> = [];
  photoForm: FormArray;
  gif: any;

  constructor(private generatorService: GeneratorService,
              private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

  }
  handleFileInput(files: FileList) {
    this.photoForm = new FormArray([]);
    for (let i = 0; i < files.length; i++) {
      this.photoForm.push(
        new FormControl(),
      );
      const url = window.URL.createObjectURL(files[i]);
      this.photos.push( url );
      this.rawPhotos.push( this.sanitizer.bypassSecurityTrustUrl(url) );
    }

  }
  checkPhotosSubmit() {
    // const checkedPhotos = this.photoForm.value.map( (val, i ) => {
    //   if (val !== null) {
    //     console.log(i);
    //     return this.photos[i];
    //   }
    // });
    const checkedPhotos = [];
    for (let i = 0; i < this.photoForm.value.length; i++) {
      if (this.photoForm.value[i] !== null) {
        checkedPhotos.push(this.photos[i]);
          }
    }
    console.log(checkedPhotos);
    this.generatorService.photosConvert(checkedPhotos)
      .then(result => {
        this.gif = result;
      });
  }
}
