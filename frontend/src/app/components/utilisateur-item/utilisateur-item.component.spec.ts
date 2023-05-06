import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurItemComponent } from './utilisateur-item.component';

describe('UtilisateurItemComponent', () => {
  let component: UtilisateurItemComponent;
  let fixture: ComponentFixture<UtilisateurItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilisateurItemComponent]
    });
    fixture = TestBed.createComponent(UtilisateurItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
