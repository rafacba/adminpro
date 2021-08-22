import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/medico/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico();
  hospital: Hospital = new Hospital('');

  constructor(public _hospitalService:HospitalService,
              public _medicoService:MedicoService,
              public router:Router,
              public activatedRoute:ActivatedRoute,
              public _modalUploadService: ModalUploadService) { 
                activatedRoute.params.subscribe(params => {
                  let id = params['id'];
                  if (id !=='nuevo') {
                    this.cargarMedico(id);
                  }
                });
              }

  ngOnInit(): void {

    this._hospitalService.cargarHospitales()
      .subscribe((hospitales:any) =>{
        this.hospitales= hospitales.hospitales;
        //console.log(hospitales.hospitales);
      });

    this._modalUploadService.notificacion
      .subscribe(resp=>{
        this.medico.img= resp.medico.img;
        //console.log(resp);
      });

  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id)
      .subscribe(medico=> {
        //console.log(medico);
        this.medico = medico
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital(this.medico.hospital,false);
      });
  }

  guardarMedico(f:NgForm) {
    // console.log(f.valid);
    // console.log(f.value);
    if (f.invalid) {
      return;
    }

    this._medicoService.crearMedico(this.medico)
      .subscribe(medico =>{
        //console.log(medico);
        this.medico._id = medico._id;
        this.router.navigate(['medico',this.medico._id]);
      });
    
  }

  cambioHospital(event:any, ban:boolean) {
    
    let id:string =''; 

    if(ban){
      id= event.value;
    } else {
       id = event;
    }


    //console.log(id);
    this._hospitalService.obtenerHospital(id)
      .subscribe(hospital => this.hospital=hospital);
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal('medicos', this.medico._id)
  }

}
