import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {appConfig} from '../../app.config';


@Injectable()
export class GifUploadService {

  constructor(private http: HttpClient) { }

postFile(fileToUpload: File) {
    let params = new HttpParams();
    const endpoint = appConfig.apiUrl + '/image';
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    const options = {
    params: params,
    reportProgress: true
  }
    return this.http.post(endpoint, formData, options);
  }

}
