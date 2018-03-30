import { Component } from '@angular/core';
import { GeneratorService } from './../shared/services/generator.service';
import { Img } from './../shared/models/image.model';
import { Gif } from './../shared/models/gif.model';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent {
  source: Array<Img> = [];
  loader: boolean = false;
  tagsForm: FormControl;
  speedForm: FormControl;
  gif: any;

  constructor(private generatorService: GeneratorService,
              private sanitizer: DomSanitizer
  ) {
    this.tagsForm = new FormControl();
    this.speedForm = new FormControl();

  }

  onDrop(event) {
    this.handleFileInput(event.dataTransfer.files);
    event.preventDefault();
  }

  dragover(event) {
    event.preventDefault();
    console.log(event);
  }


  handleFileInput(files: FileList) {  // Принимаем массив файлов от пользователя

    for (let i = 0; i < files.length; i++) {
      const img = new Img(files[i], this.sanitizer);
      img.state = 'checked';
      this.source.push(img);

    }
    console.log(this.source);
  }
  generateGif() {  // Генерируем гиф на основе оставшихся фото
    console.log(this.speedForm.value);
    const checkedPhotos = this.source.filter(elem => elem.state === 'checked')
      .map(elem => elem.blobUrl);
    this.source = [];
    this.loader = true;
    this.generatorService.photosConvert(checkedPhotos, this.speedForm.value)
      .then(result => {
        this.loader = false;
        this.gif = new Gif(result);
        this.gif.tags = this.tagsForm.value;
        console.log(this.gif);
      });
  }

  delImg(index) { // удаляем ненужные фото
    this.source[index].delImg();
  }
}
