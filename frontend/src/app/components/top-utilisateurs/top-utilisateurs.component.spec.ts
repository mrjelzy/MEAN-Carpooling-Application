import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUtilisateursComponent } from './top-utilisateurs.component';

describe('TopUtilisateursComponent', () => {
  let component: TopUtilisateursComponent;
  let fixture: ComponentFixture<TopUtilisateursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopUtilisateursComponent]
    });
    fixture = TestBed.createComponent(TopUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
