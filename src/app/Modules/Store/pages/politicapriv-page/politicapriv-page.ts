import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy',
  templateUrl: './politicapriv-page.html',
  styleUrl: './politicapriv-page.css'
})
export class PoliticaprivPage {

  contactSupport(): void {
    console.log('Soporte solicitado');
  }

}