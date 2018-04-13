import { Component } from '@angular/core';
import { GeneratorService } from '../../../shared/services/generator.service';
import { Img } from '../../../shared/models/image.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-source',
  templateUrl: './image-source.component.html',
  styleUrls: ['./image-source.component.css']
})
export class ImageSourceComponent {
  source: Array<Img> = [];
  gif: any;
  page = 1;
  public isCollapsedInput = false;
  public isCollapsedRedactor = false;

  constructor(private generatorService: GeneratorService,
              private sanitizer: DomSanitizer
  ) {

  }


  onDrop(event) {
    this.handleFileInput(event.dataTransfer.files);
    event.preventDefault();
  }

  dragover(event) {
    event.preventDefault();
  }

  handleFileInput(files: FileList) {  // Принимаем массив файлов от пользователя

    for (let i = 0; i < files.length; i++) {
      const img = new Img(files[i], this.sanitizer);
      img.state = 'checked';
      this.source.push(img);

    }
  }

  delImg(index) { // удаляем ненужные фото
    this.source[index].delImg();
  }
}
