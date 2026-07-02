import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private readonly CLOUD_NAME = 'dobqklwad';
  private readonly UPLOAD_PRESET = 'Imagenes';

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.UPLOAD_PRESET);

   const uploadPromise = fetch(`https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    }).then(response => {
      if (!response.ok) throw new Error('Falló la subida a Cloudinary');
      return response.json();
    });

    return from(uploadPromise);
  }
}
