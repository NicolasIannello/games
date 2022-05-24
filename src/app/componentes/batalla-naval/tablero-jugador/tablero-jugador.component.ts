import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Tablero } from 'src/app/clases/tablero';

@Component({
  selector: 'app-tablero-jugador',
  templateUrl: './tablero-jugador.component.html',
  styleUrls: ['./tablero-jugador.component.css']
})
export class TableroJugadorComponent implements OnInit {
  letras:Array<string>=['A','B','C','D','E','F','G'];
  tablero:Tablero[][]=[];

  nombreJugador:string|null="nombre";
  turno:boolean=false;

  piezas:number=14;
  @Output() Listo = new EventEmitter<any>();
  ready:boolean=false;
  flag:boolean=false;

  p2:string="red";
  p3:string="red";
  p4:string="red";
  p5:string="red";

  pusher:Pusher=new Pusher(environment.key, {
    authEndpoint: 'http://localhost:3000/pusher/auth',
    cluster: 'sa1'
  });
  channel:any = this.pusher.subscribe('presence-'+localStorage.getItem('partida'));

  @Input() set posiciones(value:Array<number>) {   
    if(this.flag==true){
      var x=value[0], y=value[1];  
      
      if(this.tablero[x][y].barco==true){
        this.tablero[x][y].hit=true;
        this.tablero[x][y].class+=' hit'
        this.piezas++;
      }else{
        this.tablero[x][y].class+=' miss'
      }
      this.channel.trigger('client-'+localStorage.getItem('partida'),{ jugador:localStorage.getItem('Apodo'), disparo:this.tablero[x][y].barco, px:x, py:y});          
      
      if(this.piezas==14){
        this.channel.trigger('client-'+localStorage.getItem('partida'),{ jugador:localStorage.getItem('Apodo'), fin:'ganaste'}); 
        alert('Perdiste');
        this.router.navigate(['/']);
      }
    }else{
      this.flag=true;
    }
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.nombreJugador=localStorage.getItem('Apodo');

    for (let i = 0; i < 7; i++) {
      this.tablero[i]=[];
      for (let j = 0; j < 7; j++) {
        var casillero={x:i, y:(j+1), barco:false, hit:false, class:'botonTablero', boton:false};
        this.tablero[i][j]=casillero;
      }
    }
    
  }

  ponerPieza(x:number, y:number){
     
    if (this.tablero[x][y].barco==false){
      this.tablero[x][y].barco=true;
      this.tablero[x][y].class="pieza"; 
      this.piezas--; 
    }else{
      this.tablero[x][y].boton=false;
      this.tablero[x][y].barco=false;
      this.tablero[x][y].class="botonTablero";
      this.piezas++; 
    }

    if (this.piezas==0) {

      if(this.verificarTablero()){
        for (let i = 0; i < this.tablero.length; i++) {
          for (let j = 0; j < this.tablero[i].length; j++) {
            this.tablero[i][j].boton=true
          }
        }
      }else{

      }

      this.ready=true;
      this.Listo.emit(this.ready);
    }
  }

  verificarTablero(){
    var respuesta=true;
    
    return respuesta;
  }

}
