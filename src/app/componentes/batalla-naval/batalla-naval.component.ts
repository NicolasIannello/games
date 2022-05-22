import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batalla-naval',
  templateUrl: './batalla-naval.component.html',
  styleUrls: ['./batalla-naval.component.css']
})
export class BatallaNavalComponent implements OnInit {
  Listo:boolean=false;

  constructor() { 
  }
  
  ngOnInit(): void {
  }

  actualizarEstado($event:any){
    this.Listo=$event
  }
}
