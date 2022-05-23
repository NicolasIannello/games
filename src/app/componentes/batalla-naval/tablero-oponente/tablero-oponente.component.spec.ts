import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroOponenteComponent } from './tablero-oponente.component';

describe('TableroOponenteComponent', () => {
  let component: TableroOponenteComponent;
  let fixture: ComponentFixture<TableroOponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableroOponenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableroOponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
