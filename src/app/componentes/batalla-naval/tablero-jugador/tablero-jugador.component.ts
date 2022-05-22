import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tablero-jugador',
  templateUrl: './tablero-jugador.component.html',
  styleUrls: ['./tablero-jugador.component.css']
})
export class TableroJugadorComponent implements OnInit {
  JtableroA:Array<{x:string, y:string, barco:boolean, hit:boolean, class:string, boton:boolean}>=[{ x:'A', y:'1', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'A', y:'2', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'A', y:'3', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'A', y:'4', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'A', y:'5', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'A', y:'6', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'A', y:'7', barco:false, hit:false, class:"botonTablero", boton:false }]
  JtableroB:Array<{x:string, y:string, barco:boolean, hit:boolean, class:string, boton:boolean}>=[{ x:'B', y:'1', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'B', y:'2', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'B', y:'3', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'B', y:'4', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'B', y:'5', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'B', y:'6', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'B', y:'7', barco:false, hit:false, class:"botonTablero", boton:false }]
  JtableroC:Array<{x:string, y:string, barco:boolean, hit:boolean, class:string, boton:boolean}>=[{ x:'C', y:'1', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'C', y:'2', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'C', y:'3', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'C', y:'4', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'C', y:'5', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'C', y:'6', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'C', y:'7', barco:false, hit:false, class:"botonTablero", boton:false }]
  JtableroD:Array<{x:string, y:string, barco:boolean, hit:boolean, class:string, boton:boolean}>=[{ x:'D', y:'1', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'D', y:'2', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'D', y:'3', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'D', y:'4', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'D', y:'5', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'D', y:'6', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'D', y:'7', barco:false, hit:false, class:"botonTablero", boton:false }]
  JtableroE:Array<{x:string, y:string, barco:boolean, hit:boolean, class:string, boton:boolean}>=[{ x:'E', y:'1', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'E', y:'2', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'E', y:'3', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'E', y:'4', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'E', y:'5', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'E', y:'6', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'E', y:'7', barco:false, hit:false, class:"botonTablero", boton:false }]
  JtableroF:Array<{x:string, y:string, barco:boolean, hit:boolean, class:string, boton:boolean}>=[{ x:'F', y:'1', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'F', y:'2', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'F', y:'3', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'F', y:'4', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'F', y:'5', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'F', y:'6', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'F', y:'7', barco:false, hit:false, class:"botonTablero", boton:false }]
  JtableroG:Array<{x:string, y:string, barco:boolean, hit:boolean, class:string, boton:boolean}>=[{ x:'G', y:'1', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'G', y:'2', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'G', y:'3', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'G', y:'4', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'G', y:'5', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'G', y:'6', barco:false, hit:false, class:"botonTablero", boton:false },{ x:'G', y:'7', barco:false, hit:false, class:"botonTablero", boton:false }]
  
  nombreJugador:string="nombre";
  turno:boolean=false;
  piezas:number=15;
  piezaAnterior:Array<{x:string, y:string}>=[{x:'', y:''}];
  @Output() Listo = new EventEmitter<any>();
  ready:boolean=false;

  constructor() { }

  ngOnInit(): void {
    
  }

  ponerPieza(x:string, y:string){
     
    switch (x) {
      case 'A': 
        this.JtableroA[parseInt(y)-1].class="pieza";
        this.JtableroA[parseInt(y)-1].barco=true;
        this.JtableroA[parseInt(y)-1].boton=true; 
        break;
      case 'B': 
        this.JtableroB[parseInt(y)-1].class="pieza";
        this.JtableroB[parseInt(y)-1].barco=true;
        this.JtableroB[parseInt(y)-1].boton=true; 
        break;
      case 'C': 
        this.JtableroC[parseInt(y)-1].class="pieza";
        this.JtableroC[parseInt(y)-1].barco=true;
        this.JtableroC[parseInt(y)-1].boton=true; 
        break;
      case 'D': 
        this.JtableroD[parseInt(y)-1].class="pieza";
        this.JtableroD[parseInt(y)-1].barco=true;
        this.JtableroD[parseInt(y)-1].boton=true; 
        break;
      case 'E': 
        this.JtableroE[parseInt(y)-1].class="pieza";
        this.JtableroE[parseInt(y)-1].barco=true;
        this.JtableroE[parseInt(y)-1].boton=true; 
        break;
      case 'F': 
        this.JtableroF[parseInt(y)-1].class="pieza";
        this.JtableroF[parseInt(y)-1].barco=true;
        this.JtableroF[parseInt(y)-1].boton=true; 
        break;
      case 'G': 
        this.JtableroG[parseInt(y)-1].class="pieza";
        this.JtableroG[parseInt(y)-1].barco=true;
        this.JtableroG[parseInt(y)-1].boton=true; 
        break;
    }

    this.piezas--;

    if (this.piezas==0) {
      this.JtableroA.forEach(element => {
        element.boton=true;
      });
      this.JtableroB.forEach(element => {
        element.boton=true;
      });
      this.JtableroC.forEach(element => {
        element.boton=true;
      });
      this.JtableroD.forEach(element => {
        element.boton=true;
      });
      this.JtableroE.forEach(element => {
        element.boton=true;
      });
      this.JtableroF.forEach(element => {
        element.boton=true;
      });
      this.JtableroG.forEach(element => {
        element.boton=true;
      });

      this.ready=true;
      this.Listo.emit(this.ready);
    }
  }

}
