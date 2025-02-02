import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosCdComponent } from './eventos-cd.component';

describe('EventosCdComponent', () => {
  let component: EventosCdComponent;
  let fixture: ComponentFixture<EventosCdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventosCdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventosCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
