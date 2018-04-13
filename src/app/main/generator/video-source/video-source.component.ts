import { Component, OnInit } from '@angular/core';
import { GeneratorService } from '../../../shared/services/generator.service';
import { Img } from '../../../shared/models/image.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Gif } from '../../../shared/models/gif.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Options } from '../../../shared/models/video-options.model';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video-source',
  templateUrl: './video-source.component.html',
  styleUrls: ['./video-source.component.css']
})
export class VideoSourceComponent implements OnInit {
  video: any;
  gif: Gif;
  loader = false;
  duration: number;
  cropForm: FormGroup;
  videoPlayer: any;
  start: number;
  finish: number;

  options: Options;
  optionsForm: FormGroup;
  textXCoordinate: any = '20';
  textYCoordinate: any = '20';
  textSize: any;
  textColor: any = '#000000';
  textFont = 'sans-serif';
  exampleGif: object;
  closeResult: string;

  public isCollapsed = true;

  constructor(private generatorService: GeneratorService,
              private sanitizer: DomSanitizer,
              private modalService: NgbModal) {
    this.optionsForm = new FormGroup({
      tags: new FormControl(),
      speed: new FormControl(0.1),
      width: new FormControl(300),
      text: new FormControl(),
      textSize: new FormControl(15),
      textColor: new FormControl()
    });
  }

  ngOnInit() {
    console.log(window);
  }

  handleFileInput(files: FileList) {
    this.video = new Img(files[0], this.sanitizer);
  }

  onMetadata(event, videoplayer) {
    this.duration = event.duration;
    this.cropForm = new FormGroup({
      start: new FormControl(0),
      finish: new FormControl(this.duration),
    });
    this.videoPlayer = videoplayer;
    this.start = 0;
    this.finish = this.duration;
  }

  timeupdate(e) {
    if (this.finish <= e) {
      this.videoPlayer.pause();
    }
  }

  crop(e) {
    this.start = e.from;
    this.finish = e.to;
    this.videoPlayer.currentTime = this.start;
  }
  play() {
    this.videoPlayer.play();
  }

  pause() {
    this.videoPlayer.pause();
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

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  generate(content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.gif = undefined;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.gif = undefined;
    });

    this.options = new Options(
      this.start,
      Math.floor( this.finish * 10 - this.start * 10),
      this.optionsForm.value.speed,
      this.optionsForm.value.width,
      this.optionsForm.value.width / 4 * 3 ,
      this.optionsForm.value.text,
      this.optionsForm.value.textSize + 'px',
      this.textFont,
      this.textColor,
      this.textXCoordinate,
      this.textYCoordinate,
      this.video.blobUrl
    );
    console.log(this.options);

    this.loader = true;
    this.generatorService.videoConvert(this.options)
      .then(result => {
        this.loader = false;
        this.gif = new Gif(result);
        console.log(this.gif);
      });
  }

}
