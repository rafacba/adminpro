import { Component, OnInit } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  tema: string='';

  constructor(private router: Router,
              private title: Title,
              private meta:Meta) {

    this.getDataRoute()
      .subscribe( (data) => {
        //console.log(data.titulo);
        this.tema= data.titulo;
        this.title.setTitle(data.titulo);

        const metaTag:MetaDefinition={
          name: 'description',
          content: 'Estamos en : '+ this.tema
        };
        this.meta.updateTag(metaTag);
      });
      
  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( (evento):evento is ActivationEnd =>  evento instanceof ActivationEnd),
      filter( (evento) => evento.snapshot.firstChild === null), 
      map( (evento) => evento.snapshot.data)
    );
  }

}
