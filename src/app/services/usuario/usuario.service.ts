import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';


import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario!: Usuario;
  token: any;

  constructor(public http: HttpClient,
              public router: Router) {
    console.log('Servicio de usuario listo');
    this.cargarStorage();
   }

   estaLogueado(){
     return (this.token.length>5)? true : false;
   }

   cargarStorage(){
     if(localStorage.getItem('token')){
       this.token= localStorage.getItem('token');
       //this.usuario= JSON.parse(localStorage.getItem('usuario'));
     } else {
       this.token = '';
       this.usuario!= null;
     }
   }

   guardarStorage(id:string, token:string, usuario:Usuario){
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      this.usuario= usuario;
      this.token = token;
   }

   logout(){
     this.token='';
     //localStorage.clear();
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('id');
     this.router.navigate(['/login']);
   }

   loginGoogle(token:string){
     let url = URL_SERVICES + '/login/google';
     return this.http.post(url,{token:token})
         .pipe(map((resp:any)=>{
           this.guardarStorage(resp.id,resp.token,resp.usuario);
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
      .pipe(map((resp:any)=>{
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.guardarStorage(resp.id,resp.token,resp.usuario);
        return true;
      }));
   }


   crearUsuario(usuario: Usuario){
      let url = URL_SERVICES+'/usuario';

      return this.http.post(url,usuario)
        .pipe(map((resp: any) =>{
          swal('Usuario Creado exitosamente', usuario.email,'success');
          return resp.usuario;
        }));
   }
}
