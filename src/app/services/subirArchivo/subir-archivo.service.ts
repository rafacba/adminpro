import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }
  
  //sirve para subir cualquier tipo de archivo -- Es todo Vanilla xq no existe en TypeScript
  // tipo es medico,usuario u hospital y id lo necesito para formar el nombre de la imagen a guardar segun el backend
  subirArchivo(archivo: File, tipo: string, id:string) {
    //Para que pueda ver todo lo que pasa desde otro lado lo hago como una promesa para poder subscribirme
    return new Promise((resolve,reject) =>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      
      // en imagen pongo la key que puse en el body del backend para subir imagenes
      formData.append('imagen',archivo, archivo.name);
      //Configurar la peticion AJAX
      xhr.onreadystatechange = function(){
        //El 4 implica cuando termine de subir el archivo
        if(xhr.readyState === 4) {
          if(xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response))
          } else {
            console.log('Fallo la subida');
            reject(xhr.response);
          }
        }
      };
      
      let url= URL_SERVICES + '/upload/'+ tipo +'/'+ id;
      xhr.open('PUT',url, true);
      xhr.send(formData);
    });
  }  
}
