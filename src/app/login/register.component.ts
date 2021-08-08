import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import { Router } from '@angular/router';

declare function init_plugins():any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent {

  loginForm: FormGroup;
  
  
  constructor(public builder:FormBuilder,
              private _usuarioService : UsuarioService,
              private router: Router) { 
    init_plugins();
    this.loginForm = this.builder.group({
      nombre: [null,Validators.required],
      email: [null,[Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      condiciones: [false]
     },{
       validators: this.matchPassword.bind(this)
    });

    this.loginForm.setValue({
      nombre: 'Test',
      email: 'test@email.com',
      password: '123456',
      confirmPassword: '123456',
      condiciones: true
    });
  }

  matchPassword(formGroup: FormGroup){
    const password   = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordNotMatch:true};

  }

  registrarUsuario() {

    if(!this.loginForm.valid){
      return;
    }

    if(!this.loginForm.value.condiciones) {
      console.log('Debe aceptar las condiciones');
      swal('Importante','Debe aceptar las condiciones','warning');
      return;
    }
    // console.log(this.loginForm.valid);
    // console.log(this.loginForm.value);
    // console.log(this.loginForm.errors);
    let usuario = new Usuario(
      this.loginForm.value.nombre,
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    this._usuarioService.crearUsuario(usuario)
        .subscribe(resp => {
          console.log(resp);
          this.router.navigate(['/login']);
        });
  }
  
}
