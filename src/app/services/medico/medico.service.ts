import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import  swal from 'sweetalert';
import { Medico } from '../../models/medico.model';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(private http:HttpClient,
              private _usuarioService: UsuarioService) { }

  cargarMedicos(desde:number){
    let url = URL_SERVICES + '/medico?desde='+desde;
    return this.http.get(url)
      .pipe(map((resp:any)=>{
        //console.log(url);
        this.totalMedicos = resp.total;
        return resp.medicos;
      }));
  }

  buscarMedicos(termino:string) {
    let url = URL_SERVICES + '/busqueda/coleccion/medicos/'+termino;
    return this.http.get(url)
      .pipe(map((resp:any)=>{
        return resp.medicos;
      }));
  }

  crearMedico(medico: Medico){
    let url = URL_SERVICES + '/medico';
    let nombre = medico.nombre;
    let id_hospital = medico.hospital;
    
    if(medico._id) {
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' +  this._usuarioService.token;
      
    
      return this.http.put(url, {nombre , id_hospital})
        .pipe(map((resp:any)=>{
          swal('Medico Actualizado',medico.nombre,'success');
          return resp.medico;
        }))

    } else {
      // Creando
      url += '?token=' +  this._usuarioService.token;
  
  
      return this.http.post(url,{nombre,id_hospital})
        .pipe(map((resp:any)=>{
          swal('Medico creado',medico.nombre,'success');
          return resp.medico;
        }));
    }

  }

  borrarMedico(id:string){
    let url= URL_SERVICES + '/medico/'+id;
    url += '?token=' +  this._usuarioService.token;

     return this.http.delete(url)
       .pipe(map(resp=>{
           swal('Medico Borrado','Medico borrado correctamente','success');
          return resp;
       }));
  }

  cargarMedico(id: string) {
    let url = URL_SERVICES + '/medico/' + id;
    return this.http.get(url)
        .pipe(map((resp:any)=> resp.medico));
  }
}
