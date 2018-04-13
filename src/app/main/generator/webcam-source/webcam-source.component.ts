import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {GeneratorService} from '../../../shared/services/generator.service';
import { Gif } from '../../../shared/models/gif.model';
import { Options } from '../../../shared/models/webcam-options.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-webcam-source',
  templateUrl: './webcam-source.component.html',
  styleUrls: ['./webcam-source.component.css']
})
export class WebcamSourceComponent implements OnInit {
  gif: Gif;
  @ViewChild('videoElement') videoElement: ElementRef;
  video: any;

  options: Options;
  optionsForm: FormGroup;
  textXCoordinate: any = '20';
  textYCoordinate: any = '20';
  textSize: any;
  textColor: any = '#000000';
  textFont = 'sans-serif';

  exampleGif: object;
  loader = false;

  closeResult: string;

  constructor(private generatorService: GeneratorService,
              private modalService: NgbModal) {
    this.optionsForm = new FormGroup({
      tags: new FormControl(),
      speed: new FormControl(1),
      width: new FormControl(300),
      text: new FormControl(),
      textSize: new FormControl(15),
      textColor: new FormControl()
    });
    this.exampleChange();
  }

  ngOnInit() {
    if (this.hasGetUserMedia()) {
      // Good to go!
    } else {
      alert('getUserMedia() is not supported in your browser');
    }
    this.video = this.videoElement.nativeElement;
    this.initCamera({ video: true, audio: false });
  }

  hasGetUserMedia() {
    // Note: Opera builds are unprefixed.
    return !!(navigator.getUserMedia );
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

  rec(content) {

    this.modalService.open(content).result.then((result) => {
      console.log('open!');
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.options = new Options(
      this.optionsForm.value.speed,
      this.optionsForm.value.width,
      this.optionsForm.value.width / 4 * 3 ,
      this.optionsForm.value.text,
      this.optionsForm.value.textSize + 'px',
      this.textFont,
      this.textColor,
      this.textXCoordinate,
      this.textYCoordinate
    );
    console.log(this.options);

    this.loader = true;
    this.generatorService.webcamConvert(this.options)
      .then(result => {
        this.gif = new Gif(result);
        this.loader = false;
        console.log(this.gif);
      });
  }

  exampleChange() {
    this.exampleGif = {
      'width': this.optionsForm.value.width + 'px',
      'height': this.optionsForm.value.width / 4 * 3 + 'px'
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

  initCamera(config: any) {
    const browser = <any>navigator;

    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.src = window.URL.createObjectURL(stream);
      this.video.play();
    });
  }
}
