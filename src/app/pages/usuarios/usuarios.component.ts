import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

//declare var swal:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando:boolean =true;

  constructor(private _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService) { 
  }
  
  ngOnInit(): void {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(()=>this.cargarUsuarios());
  }
  
  cargarUsuarios() {
    this.cargando=true;

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp:any) => {
        //console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando=false;
      });
    }
  
  
    cambiarDesde(salto:number) {
      let desde = this.desde + salto;
      //console.log(desde);
      if (desde >= this.totalRegistros) {
        return;
      }
      if (desde<0) {
        return;
      }
      this.desde += salto;
      this.cargarUsuarios();
  }

  buscarUsuario( termino:string) {
    //console.log(termino);
    if (!termino) {
      this.cargarUsuarios();
      return;
    }
    this.cargando=true;
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios:Usuario[])=>{
        //console.log(usuarios);
        this.usuarios= usuarios;
        this.cargando=false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No puede borrar usuario','No se puede borrar a si mismo','error');
      return;
    }
    //console.log(usuario);
    swal({
      title:'Esta seguro?',
      text:'Una vez borrado, no podra ser recuperado',
      icon: 'warning',
      buttons: ['cancel','ok'],
      dangerMode:true
    })
    .then((willDelete:any)=>{
      if (willDelete){
        this._usuarioService.borrarUsuario(usuario._id as string)
          .subscribe(borrado => {
            //console.log(borrado);
            this.cargarUsuarios();
          });
      }
    })
  }
  guardarUsuario(usuario:Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }

  mostrarModal(id:string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
