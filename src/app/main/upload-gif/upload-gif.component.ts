import { Component, OnInit } from '@angular/core';
import {GifUploadService} from '../../shared/services/gif-upload.service';

@Component({
  selector: 'app-upload-gif',
  templateUrl: './upload-gif.component.html',
  styleUrls: ['./upload-gif.component.css']
})
export class UploadGifComponent implements OnInit {
  imageUrl: string = '../../../assets/images/default-image.png';
  fileToUpload: File = null;
  constructor(private fileUploadService: GifUploadService) { }
  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  uploadFileToActivity() {
    this.fileUploadService.postFile(this.fileToUpload).subscribe(data => {
      // do something, if upload success
      console.log('Subscribe data', data);
      console.log('done');
      this.imageUrl = '../../../assets/images/default-image.png';
    }, error => {
      console.log(error);
    });
  }

}
