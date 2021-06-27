import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent implements OnInit {
  
  // Doughnut
  @Input('labels')
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data')
  public doughnutChartData: number[] = [350, 450, 100];
  @Input('type')
  public doughnutChartType: ChartType = 'doughnut';
  @Input() titulo:string ="";

  constructor() { }

  ngOnInit(): void {
  }

}
