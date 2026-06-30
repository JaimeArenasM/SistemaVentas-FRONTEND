import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private http = inject(HttpClient);

  private readonly CLOUD_NAME = 'dobqklwad';
  private readonly UPLOAD_PRESET = 'Imagenes';

  uploadImage(file: File): Observable<any> {

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', this.UPLOAD_PRESET);

    return this.http.post(
      `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`,
      formData
    );
  }

}