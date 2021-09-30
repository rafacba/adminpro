import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  termino:string;
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];


  constructor(public activatedRoute: ActivatedRoute,
              public http: HttpClient) { 
      activatedRoute.params.subscribe((params:any) => {
        this.termino = params['termino'];
        this.buscar(this.termino);
      });
  }

  ngOnInit(): void {
  }

  buscar(termino:string) {
    let url = URL_SERVICES + '/busqueda/todo/' + termino; 
    this.http.get(url)
      .subscribe((resp:any)=>{
        //console.log(resp);
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      });
  }

}
