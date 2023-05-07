import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajetsPageComponent } from './trajets-page.component';

describe('TrajetsPageComponent', () => {
  let component: TrajetsPageComponent;
  let fixture: ComponentFixture<TrajetsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrajetsPageComponent]
    });
    fixture = TestBed.createComponent(TrajetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
