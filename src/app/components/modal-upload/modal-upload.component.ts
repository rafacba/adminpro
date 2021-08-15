import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: [
  ]
})
export class ModalUploadComponent implements OnInit {

  //oculto: string = '';
  imagenSubir: File;
  prev: string;

  constructor(public _subirArchivoService: SubirArchivoService,
              public _modalUploadService: ModalUploadService) { 
    //console.log('Modal Listo');
  }

  ngOnInit(): void {
  }

  seleccionImagen(event: any){
    
    let archivo = event.target.files[0];

    if(!archivo){
      //this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image')<0){
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen','error');
      return;
    }
    
    this.imagenSubir =  archivo;

    //Vanilla JS
    let reader= new FileReader();
    let urlPrev = reader.readAsDataURL(archivo);
    reader.onloadend=()=> this.prev = reader.result as string;
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(resp=>{
         this._modalUploadService.notificacion.emit(resp);
         this.cerrarModal();
      })
      .catch(err =>{
        console.log('error en la carga.......');
      })
  }

  cerrarModal() {
    this.imagenSubir=null;
    this.prev=null;
    this._modalUploadService.ocultarModal();
  }

}
