import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero-jugador',
  templateUrl: './tablero-jugador.component.html',
  styleUrls: ['./tablero-jugador.component.css']
})
export class TableroJugadorComponent implements OnInit {
  tablero:Array<{x:string, y:string, barco:boolean, hit:boolean, class:string, boton:boolean}>=[];
  letras:Array<string>=['A','B','C','D','E','F','G'];

  nombreJugador:string|null="nombre";
  turno:boolean=false;
  piezas:number=14;
  piezaAnterior:Array<{x:string, y:string}>=[{x:'', y:''}];
  @Output() Listo = new EventEmitter<any>();
  ready:boolean=false;
  flag:boolean=false;

  pusher:Pusher=new Pusher(environment.key, {
    authEndpoint: 'http://localhost:3000/pusher/auth',
    cluster: 'sa1'
  });
  channel:any = this.pusher.subscribe('presence-'+localStorage.getItem('partida'));

  @Input() set posiciones(value:Array<string>) {    
    if(this.flag==true){

      this.tablero.forEach(element => {
        if(element.x==value[0] && element.y==value[1]){
          if(element.barco==true){
            element.hit=true;
            element.class+=' hit'
            this.piezas++;
          }else{
            element.class+=' miss'
          }
          this.channel.trigger('client-'+localStorage.getItem('partida'),{ jugador:localStorage.getItem('Apodo'), disparo:element.barco, px:value[0], py:value[1]});          
        }
        if(this.piezas==14){
          this.channel.trigger('client-'+localStorage.getItem('partida'),{ jugador:localStorage.getItem('Apodo'), fin:'ganaste'}); 
          alert('Perdiste');
          this.router.navigate(['/']);
        }
      });
      
    }else{
      this.flag=true;
    }
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.nombreJugador=localStorage.getItem('Apodo');

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        var casillero={x:this.letras[i], y:(j+1).toString(), barco:false, hit:false, class:'botonTablero', boton:false};
        this.tablero.push(casillero);
      }
    }
  }

  ponerPieza(x:string, y:string){
     
    this.tablero.forEach(element => {
      if(element.x==x && element.y==y){
        element.boton=true;
        element.barco=true;
        element.class="pieza";
      }
    });

    this.piezas--;

    if (this.piezas==0) {
      this.tablero.forEach(element => {
        element.boton=true;
      });

      this.ready=true;
      this.Listo.emit(this.ready);
    }
  }

}
