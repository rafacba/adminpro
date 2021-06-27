import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  @Input() progreso:number = 50;

  @Input('titulo') leyenda:string = "Leyenda";

  @Output() nuevoValor: EventEmitter<number> = new EventEmitter();

  @ViewChild('txtProgress') txtProgress!: ElementRef; 

  constructor() { }

  ngOnInit(): void {
  }

  onChange(newValor:number) {
    //console.log(newValor);
    
    if(newValor>100){
      newValor=100;
    } else if (newValor<0){
      newValor=0;
    } 

    this.txtProgress.nativeElement.value = newValor;
    this.nuevoValor.emit(newValor);
  }

  cambiarValor(valor:number) {

    if(this.progreso>=100 && valor>0) {
      this.progreso=100;
      return;
    }

    if(this.progreso<=0 && valor <0) {
      this.progreso=0;
      return;
    }

    this.progreso+=valor;
    this.nuevoValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();

  }

}
