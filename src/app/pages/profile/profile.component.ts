import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  prev: string;
  
  constructor(private _usuarioService:UsuarioService) { 
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
  }

  actualizar(form:Usuario){
    //console.log(form);
    this.usuario.nombre = form.nombre;
    if(!this.usuario.google){
      this.usuario.email = form.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe();
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


  
    //console.log(this.imagenSubir);
    
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id as string)
  }

}
