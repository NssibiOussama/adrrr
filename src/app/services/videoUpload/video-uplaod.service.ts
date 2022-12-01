import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoUplaodService {
  loading = false;
  constructor(private http: HttpClient) { }

  async uploadFile(file: any): Promise<Observable<any>> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "adrenaline");
    formData.append("cloud_name", "elife-k");
    return this.http.post('https://api.cloudinary.com/v1_1/elife-k/video/upload', formData);


  }
}