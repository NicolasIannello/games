import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-batalla-naval',
  templateUrl: './batalla-naval.component.html',
  styleUrls: ['./batalla-naval.component.css']
})
export class BatallaNavalComponent implements OnInit {
  hola:string='aa';

  constructor() { 
  }
  
  ngOnInit(): void {
    const pusher = new Pusher(environment.key, {
      cluster: 'sa1'
    });

    const channel = pusher.subscribe('my-channel');

    channel.bind('my-event', (data:any) => {
      this.hola+=data;
    });
    
  }
  
  send(){
    this.hola+='a';
  }
}
