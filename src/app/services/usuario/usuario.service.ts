import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';


import { catchError, map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
//import { Observable } from 'rxjs/internal/Observable';
import { Observable, of, throwError } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu:any = [];

  constructor(public http: HttpClient,
              public router: Router,
              public _subirArchivoService: SubirArchivoService) {
    //console.log('Servicio de usuario listo');
    this.cargarStorage();
   }

   estaLogueado(){
     return (this.token.length>5)? true : false;
   }

   cargarStorage(){
     if(localStorage.getItem('token')){
       this.token= localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario')) ;  
       this.menu = JSON.parse(localStorage.getItem('menu'));
     } else {
       this.token = '';
       this.usuario= new Usuario("","","");
       this.menu = [];
     }
   }

   guardarStorage(id:string, token:string, usuario:Usuario, menu:any){
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('menu', JSON.stringify(menu));

      this.usuario= usuario;
      this.token = token;
      this.menu = menu;
      
   }

   logout(){
     //this.token='';
     this.menu = [];
     this.usuario = null;
     //localStorage.clear();
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('id');
     localStorage.removeItem('menu');
     this.router.navigate(['/login']);
   }

   loginGoogle(token:string){
     let url = URL_SERVICES + '/login/google';
     return this.http.post(url,{token:token})
         .pipe(map((resp:any)=>{
           this.guardarStorage(resp.id,resp.token,resp.usuario, resp.menu);
           //console.log(resp);
           return true;
         }));
   }

   login(usuario:Usuario, recordar:boolean=false){

    if (recordar) {
      localStorage.setItem('email',usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICES+'/login';
    return this.http.post(url,usuario)
      .pipe(
        map((resp:any)=>{
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.guardarStorage(resp.id,resp.token,resp.usuario,resp.menu);
        return true;
      }),catchError(err=>{
        console.log(err.error.mensaje);
        swal('Error en el login',err.error.mensaje, 'error');
        throw err;
      })
      );
   }


   crearUsuario(usuario: Usuario){
      let url = URL_SERVICES+'/usuario';

      return this.http.post(url,usuario)
        .pipe(map((resp: any) =>{
          swal('Usuario Creado exitosamente', usuario.email,'success');
          return resp.usuario;
        }),
        catchError(err=>{
          swal(err.error.mensaje, err.error.errors.message, 'error');
          throw err;
        })
        );
   }

   actualizarUsuario(usuario: Usuario){
     let url = URL_SERVICES + '/usuario/' + usuario._id;
     url += '?token=' + this.token;

     return this.http.put(url,usuario)
       .pipe(map((resp:any)=>{
         if(usuario._id === this.usuario._id) {
           this.guardarStorage(resp.usuario._id,this.token, resp.usuario, this.menu);
         }
         swal('Usuario Actualizado correctamente', usuario.nombre, 'success');
         return true;
       }),
       catchError(err=>{
        swal(err.error.mensaje, err.error.errors.message, 'error');
        throw err;
      })
       );
   }

   cambiarImagen(file:File, id:string) {
      this._subirArchivoService.subirArchivo(file,'usuarios',id)
        .then((resp:any)=>{
            //console.log(resp);
            this.usuario.img = resp.usuario.img;
            swal('Imagen Actualizada', this.usuario.nombre, 'success');
            this.guardarStorage(id, this.token, this.usuario, this.menu);
        })
        .catch(resp=>{
            console.log(resp);
        });
   }
   
   cargarUsuarios(desde:number = 0){
     let url = URL_SERVICES + '/usuario?desde=' +desde;
     return this.http.get(url);
   }

   buscarUsuarios(termino:string) {
     let url = URL_SERVICES + '/busqueda/coleccion/usuarios/'+termino;

     return this.http.get(url)
       .pipe(map((resp:any) => resp.usuarios));
      
   }

   borrarUsuario(id: string){
     let url= URL_SERVICES+'/usuario/' + id;
     url +='?token='+this.token;
     return this.http.delete(url)
       .pipe(map(resp => {
        swal('Poof! Usuario gone','El usuario ha sido borrado','success');
        return true;
       }));
   }
}
