import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';

declare function init_plugins():any;
//Libreria de Google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame= false;
  email: string = '';
  auth2: any;

  constructor(public router: Router,
              public _httpService: UsuarioService) { }

  ngOnInit(): void {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || ''; //El simbolo || es para decir si no existe valor ponga '' ... equivale al 'o'
    if(this.email.length >1) {
      this.recuerdame = true;
    }
  }

  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '263463275414-6tvas5h7ce1iri2ut8es6rhcj156nuvr.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email' 
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element:any){
    this.auth2.attachClickHandler(element,{},(googleUser:any)=>{
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._httpService.loginGoogle(token)
        .subscribe(()=>{
          this.router.navigate(['/dashboard'])
          window.location.href ='#/dashboard';
        });
      //console.log(token);

    });
  }

  ingresar(f:NgForm) {
    //console.log("ingresando");
    //this.router.navigate(['/dashboard']);
    //console.log(f.valid);
    //console.log(f.value);
    if (!f.valid) {
      return;
    }
    let usuario= new Usuario("" ,f.value.email,f.value.password);
    this._httpService.login(usuario,f.value.recuerdame)
      .subscribe(correcto=> this.router.navigate(['/dashboard']));
  }

}
