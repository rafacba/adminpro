import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  };

  constructor(@Inject(DOCUMENT) private _document:any) { 
    this.cargarAjustes();
  }

  guardarAjustes() {
    //console.log('Guardado en el LocalStorage');
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')){
      this.ajustes= JSON.parse(localStorage.getItem('ajustes')!);
      //console.log('Cargando Ajustes');
      this.aplicarTema(this.ajustes.tema);
    } else {
      //console.log('Usando valores por defecto');
      this.aplicarTema(this.ajustes.tema);
    }
  }
  
  aplicarTema(color:string){
    let url:string = `assets/css/colors/${color}.css`
      this._document.getElementById('tema').setAttribute('href', url);
      this.ajustes.tema = color;
      this.ajustes.temaUrl = url;
      this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
