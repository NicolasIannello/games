import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroJugadorComponent } from './tablero-jugador.component';

describe('TableroJugadorComponent', () => {
  let component: TableroJugadorComponent;
  let fixture: ComponentFixture<TableroJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroJugadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
