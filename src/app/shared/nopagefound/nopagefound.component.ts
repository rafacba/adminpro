import { Component, OnInit } from '@angular/core';

declare function init_plugins():any;

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: [`
    .error-box{
      height:100%;
      position:fixed;
      background: url(/assets/images/background/error-bg.jpg) no-repeat center center #fff;
      width:100%;
        
      .footer{
        width:100%;
        left:0px;
        right:0px;
      }
    }
    .error-body{
        padding-top:5%;
        h1{
          font-size:210px;
          font-weight:900;
            text-shadow: 4px 4px 0 $white, 6px 6px 0 $dark;
          line-height:210px;
        }
    }
  `]
})
export class NopagefoundComponent implements OnInit {
  
  anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}
