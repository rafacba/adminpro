import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';

import swal from 'sweetalert';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando:boolean =true;

  constructor(private _hospitalService: HospitalService,
              private _modalUploadService: ModalUploadService) { }

  ngOnInit(): void {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(()=>this.cargarHospitales());
  }

  cargarHospitales(){
    this.cargando=true;

    this._hospitalService.cargarHospitales(this.desde)
      .subscribe((resp:any) => {
        //console.log(resp);
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
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
    this.cargarHospitales();
}


  buscarHospital(termino:string){
    if (!termino) {
      this.cargarHospitales();
      return;
    }
    this.cargando=true;
    this._hospitalService.buscarHospital(termino)
      .subscribe((hospitales:Hospital[])=>{
        this.hospitales= hospitales;
        this.cargando=false;
      });
  }

  actualizarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital)
      .subscribe(()=>{
        this.cargarHospitales();
      });
  }

  borrarHospital(hospital:Hospital) {
    this._hospitalService.borrarHospital(hospital._id)
      .subscribe(()=>{
        this.desde=0;
        this.cargarHospitales();
      });
  }

  crearHospital() {
    swal({
      title:'Crear un nuevo Hospital',
      text:'Intrduzca el nombre del hospital',
      content: {element:'input'},
      buttons: ['cancel','ok']
    })
    .then((info:any)=>{
      if (info){
        let nombre = info as string;
        this._hospitalService.crearHospital(nombre)
          .subscribe(()=>{
            this.cargarHospitales();
          });
      }
    })
  }

  mostrarModal(id:string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

}
