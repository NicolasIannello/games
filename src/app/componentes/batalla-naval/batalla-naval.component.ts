import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batalla-naval',
  templateUrl: './batalla-naval.component.html',
  styleUrls: ['./batalla-naval.component.css']
})
export class BatallaNavalComponent implements OnInit {
  hola:string='a';

  constructor() { 
  }

  ngOnInit(): void {
  }

  send(){
    this.hola+='a';
  }
}
