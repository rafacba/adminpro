import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(public _medicoServices:MedicoService) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoServices.cargarMedicos(this.desde)
      .subscribe(medicos=>{
        this.totalRegistros= this._medicoServices.totalMedicos;
        this.medicos=medicos;
      });
  }

  buscarMedico(termino:string) {
    if(termino.length <=0) {
      this.cargarMedicos();
      return;
    }

    this._medicoServices.buscarMedicos(termino)
      .subscribe(medicos=>{
        this.medicos = medicos;
      });
  }

  borrarMedico(medico:Medico){
    this._medicoServices.borrarMedico(medico._id)
      .subscribe(()=> this.cargarMedicos());
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
    this.cargarMedicos();
}

}
