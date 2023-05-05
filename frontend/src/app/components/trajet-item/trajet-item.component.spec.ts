import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajetItemComponent } from './trajet-item.component';

describe('TrajetItemComponent', () => {
  let component: TrajetItemComponent;
  let fixture: ComponentFixture<TrajetItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrajetItemComponent]
    });
    fixture = TestBed.createComponent(TrajetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
