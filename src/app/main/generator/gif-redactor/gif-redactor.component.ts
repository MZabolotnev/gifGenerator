import { Component, Input} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {GeneratorService} from '../../../shared/services/generator.service';
import { Img } from '../../../shared/models/image.model';
import { Gif } from '../../../shared/models/gif.model';
import { Options } from '../../../shared/models/images-options.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gif-redactor',
  templateUrl: './gif-redactor.component.html',
  styleUrls: ['./gif-redactor.component.css']
})
export class GifRedactorComponent {
  @Input() source: Array<Img>;

  options: Options;
  optionsForm: FormGroup;
  textXCoordinate: any = '20';
  textYCoordinate: any = '20';
  textSize: any;
  textColor: any = '#000000';
  textFont = 'sans-serif';

  exampleGif: object;
  loader = false;
  gif: any;

  closeResult: string;

  constructor(private generatorService: GeneratorService,
              private modalService: NgbModal) {
    this.optionsForm = new FormGroup({
      tags: new FormControl(),
      speed: new FormControl(1),
      width: new FormControl(200),
      height: new FormControl(200),
      text: new FormControl(),
      textSize: new FormControl(15),
      textColor: new FormControl()
    });
    this.exampleChange();
    this.options = new Options();

  }

  exampleChange() {
    this.exampleGif = {
      'width': this.optionsForm.value.width + 'px',
      'height': this.optionsForm.value.height + 'px'
    };
  }

  textSizeChange() {
    this.textSize = {
      'font-size': this.optionsForm.value.textSize + 'px',
    };
  }

  textColorChange(event) {
    this.textColor = event;
  }

  selectFont(event) {
    this.textFont = event.target.id;
  }

  onMoveEnd(event) {
    this.textXCoordinate = event.x + 15;
    this.textYCoordinate = event.y + 15;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  generateGif(content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    const checkedPhotos = this.source.filter(elem => elem.state === 'checked')
      .map(elem => elem.blobUrl);
    console.log(checkedPhotos);

    this.options = new Options(
      this.optionsForm.value.speed,
      this.optionsForm.value.width,
      this.optionsForm.value.height,
      this.optionsForm.value.text,
      this.optionsForm.value.textSize + 'px',
      this.textFont,
      this.textColor,
      this.textXCoordinate,
      this.textYCoordinate,
      checkedPhotos
    );

    console.log(this.options);

    this.loader = true;
    this.generatorService.photosConvert(this.options)
      .then(result => {
        this.loader = false;
        this.gif = new Gif(result);
        this.gif.tags = this.optionsForm.value.tags;
        console.log(this.gif);
      });
  }

}
