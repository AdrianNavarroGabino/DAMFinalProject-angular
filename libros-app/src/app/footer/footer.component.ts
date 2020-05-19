import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  autor: any = {nombre:'Adrián', apellidos: 'Navarro Gabino'}

  constructor() { }

}
