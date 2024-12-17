import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JovenesComponent } from './jovenes.component';

describe('JovenesComponent', () => {
  let component: JovenesComponent;
  let fixture: ComponentFixture<JovenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JovenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JovenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
