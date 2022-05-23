import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batalla-naval',
  templateUrl: './batalla-naval.component.html',
  styleUrls: ['./batalla-naval.component.css']
})
export class BatallaNavalComponent implements OnInit {
  Listo:boolean=false;
  idPartida:string|null='';
  posiciones:Array<string>=[];

  constructor() { 
  }
  
  ngOnInit(): void {
    this.idPartida=localStorage.getItem('partida');
  }

  actualizarEstado($event:any){
    this.Listo=$event
  }
  enviarPosiciones($event:any){
    this.posiciones=$event;
  }
}
