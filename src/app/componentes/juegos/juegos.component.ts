import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-juegos',
	templateUrl: './juegos.component.html',
	styleUrls: ['./juegos.component.css']
})

export class JuegosComponent implements OnInit {
	rutaH:string='https://iannello-games.herokuapp.com/';
	rutaÑ:string='http://localhost:3000/';
	
	juegos:Array<string>=['BatallaNaval','Soon!','Soon!','Soon!','Soon!','Soon!','Soon!'];
	apodo:string='';
	id:string='';

	constructor(private router: Router) { }

	ngOnInit(): void {
		localStorage.clear();
	}

	jugar(juego:string){
		if(juego!='Soon!'){

		if (this.apodo=='') {
			alert('Ingrese un apodo');
		}else{
			localStorage.setItem('Apodo',this.apodo);
			this.id=(Math.floor(Math.random()*(5000-1000)+1000)).toString();
			localStorage.setItem('id',this.id)

			const pusher = new Pusher(environment.key, {
				authEndpoint: this.rutaH+'pusher/auth',
				cluster: 'sa1'
			});
		
			const channel = pusher.subscribe('presence-'+juego);

			channel.bind('client-buscando', (data:any) => {
				//console.log(data);
				if(data.nombre){
					channel.trigger('client-buscando',{ jugador1: this.apodo, jugador2: data.nombre, j2id: data.id, partida: this.id+data.id });
					localStorage.setItem('partida',this.id+data.id);
					localStorage.setItem('juego',juego);
					localStorage.setItem('oponente',data.nombre);
					localStorage.setItem('turno','true');
					this.router.navigate(['/'+juego]);
				}else if(data.j2id==this.id){
					localStorage.setItem('partida',data.partida);
					localStorage.setItem('juego',juego);
					localStorage.setItem('oponente',data.jugador1);
					localStorage.setItem('turno','false');
					this.router.navigate(['/'+juego]);
				}
			});
			
			
			setTimeout(() => {
				channel.trigger('client-buscando',{ nombre: this.apodo, id: this.id });
			},3000);
			
			}
		}  
	}

}