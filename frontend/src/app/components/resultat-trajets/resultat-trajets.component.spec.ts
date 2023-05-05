import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatTrajetsComponent } from './resultat-trajets.component';

describe('ResultatTrajetsComponent', () => {
  let component: ResultatTrajetsComponent;
  let fixture: ComponentFixture<ResultatTrajetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultatTrajetsComponent]
    });
    fixture = TestBed.createComponent(ResultatTrajetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
