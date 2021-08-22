import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { UsuarioService } from 'src/app/services/service.index';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import  swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http:HttpClient,
              private _usuarioService:UsuarioService) { }

  cargarHospitales(desde:number=0) {

    let url = URL_SERVICES + '/hospital?desde=' + desde;

    return this.http.get(url);
    
  }

  obtenerHospital(id:string) {
    let url = URL_SERVICES + '/hospital/'+id;

    return this.http.get(url)
      .pipe(map( (resp:any)=> {
        return resp.hospital;
      }));
  }

  borrarHospital(id:string) {

    let url = URL_SERVICES + '/hospital/' +id;
    url += '?token=' + this._usuarioService.token;
    
    return this.http.delete(url)
      .pipe(map(resp=> {
        swal('Hospital Borrado','Eliminado correctamente','success');
      }));
  }

  crearHospital(nombre:string){
    let url = URL_SERVICES + '/hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url,{nombre});
  }
  
  buscarHospital(termino:string) {
    let url = URL_SERVICES + '/busqueda/coleccion/hospitales/'+termino;

    return this.http.get(url)
      .pipe(map((resp:any) => resp.hospitales));
     
  }

  actualizarHospital(hospital:Hospital) {
    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    let nombre = hospital.nombre;

    return this.http.put(url,{nombre});
  }
}
