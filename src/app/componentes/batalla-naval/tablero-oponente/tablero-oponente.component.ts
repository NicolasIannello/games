import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Tablero } from 'src/app/clases/tablero';

@Component({
  selector: 'app-tablero-oponente',
  templateUrl: './tablero-oponente.component.html',
  styleUrls: ['./tablero-oponente.component.css']
})
export class TableroOponenteComponent implements OnInit {
  letras:Array<string>=['A','B','C','D','E','F','G'];
  tablero:Tablero[][]=[];

  estado:Boolean=false;
  nombreOponente:string|null="oponente";
  estadoOponente:boolean=false;

  pusher:Pusher=new Pusher(environment.key, {
    authEndpoint: 'http://localhost:3000/pusher/auth',
    cluster: 'sa1'
  });
  channel:any;

  @Output() posiciones = new EventEmitter<Array<string>>();

  @Input() set Listo(value:boolean) {    
    if (value==true) {
      this.estado = value;
      this.channel.trigger('client-'+localStorage.getItem('partida'),{jugador:localStorage.getItem('Apodo'), estado:this.estado });
      if(localStorage.getItem('turno')=='true' && this.estado==true && this.estadoOponente==true){
        this.habilitarDeshabilitarTablero(false);
      }
    }
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.channel = this.pusher.subscribe('presence-'+localStorage.getItem('partida'));

    this.channel.bind('client-'+localStorage.getItem('partida'), (data:any) => {    
        
      if(data.estado){
        this.estadoOponente=data.estado;
        if(localStorage.getItem('turno')=='true' && this.estado==true){
          this.habilitarDeshabilitarTablero(false);
        }
      }else if(data.x+1){
        this.habilitarDeshabilitarTablero(false);
        var pos=[data.x,data.y];
        this.posiciones.emit(pos);
      }else if(data.px+1 && data.jugador==localStorage.getItem('oponente')){  
        var clase='';      
        switch (data.disparo) {
          case true:
            clase=' hit';
            break;
          case false:            
            clase=' miss';
            break;
        }
        this.tablero[data.px][data.py].class+=clase;
      }else if(data.fin && data.jugador==localStorage.getItem('oponente')){
        alert(data.fin);
        this.router.navigate(['/']);
      }
    });

    for (let i = 0; i < 7; i++) {
      this.tablero[i]=[];
      for (let j = 0; j < 7; j++) {
        var casillero={x:i, y:(j+1), barco:false, hit:false, class:'botonTablero', boton:true};
        this.tablero[i][j]=casillero;
      }
    }
    console.log(this.tablero);
    
    this.nombreOponente=localStorage.getItem('oponente');
  }

  habilitarDeshabilitarTablero(accion:boolean){
    for (let i = 0; i < this.tablero.length; i++) {
      for (let j = 0; j < this.tablero[i].length; j++) {
        this.tablero[i][j].boton=accion;
      }
    }
  }

  fire(x:number,y:number){
    this.habilitarDeshabilitarTablero(true);
    this.channel.trigger('client-'+localStorage.getItem('partida'),{jugador:localStorage.getItem('Apodo'), x:x, y:y });
  }
}
