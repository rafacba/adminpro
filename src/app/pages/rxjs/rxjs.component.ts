import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable, Subscriber } from 'rxjs';

import { filter, map, retry } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 
    
    this.subscription = this.regresaObservable()
    .subscribe(
      data=>console.log(data),
      error => console.error('Error en el observer ',error),
      () => console.log('El observador termino')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();

  }

  regresaObservable(): Observable<any> {

    return new Observable((observer:Subscriber<any>) => {

      let contador=0;

      let intervalo = setInterval(()=>{
        contador+=1;

        const salida= {
          valor: contador
        };  

        observer.next(salida);
        // if (contador ===5 ) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if(contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Todavia no llega a tres');
        // }
      },1000);
    }).pipe(
        map(data=>{
          return data.valor;
        }),
        filter((valor, index)=> {
          //console.log('Filter', valor, index);
          // Filtrar los resultados con valor par
          if((valor%2 === 1)){
            return true;
          } else {
            return false;
          }
        })
        );

  }

}
