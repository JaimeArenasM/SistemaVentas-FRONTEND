import { Component } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terminos-page.html',
  styleUrls: ['./terminos-page.css']
})
export class TermsComponent {

  contactSupport(): void {
    console.log('Contactar soporte');
  }

}