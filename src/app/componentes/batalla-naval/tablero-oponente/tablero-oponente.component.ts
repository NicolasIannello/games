import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablero-oponente',
  templateUrl: './tablero-oponente.component.html',
  styleUrls: ['./tablero-oponente.component.css']
})
export class TableroOponenteComponent implements OnInit {
  tablero:Array<{x:string, y:string, barco:boolean, hit:boolean, class:string, boton:boolean}>=[];
  letras:Array<string>=['A','B','C','D','E','F','G'];

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
      }else if(data.x){
        this.habilitarDeshabilitarTablero(false);
        var pos=[data.x,data.y];
        this.posiciones.emit(pos);
      }else if(data.px && data.jugador==localStorage.getItem('oponente')){        
        switch (data.disparo) {
          case true:
            var clase=' hit';
            break;
          case false:            
            var clase=' miss';
            break;
        }
        this.tablero.forEach(element => {
          if(element.x==data.px && element.y==data.py){
            element.class+=clase;
            //element.boton=true;
          }
        });
      }else if(data.fin && data.jugador==localStorage.getItem('oponente')){
        alert(data.fin);
        this.router.navigate(['/']);
      }
    });

    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        var casillero={x:this.letras[i], y:(j+1).toString(), barco:false, hit:false, class:'botonTablero', boton:true};
        this.tablero.push(casillero);
      }
    }
    this.nombreOponente=localStorage.getItem('oponente');
  }

  habilitarDeshabilitarTablero(accion:boolean){
    this.tablero.forEach(element => {
      element.boton=accion;
    });
  }

  fire(x:string,y:string){
    this.habilitarDeshabilitarTablero(true);
    this.channel.trigger('client-'+localStorage.getItem('partida'),{jugador:localStorage.getItem('Apodo'), x:x, y:y });
  }
}
