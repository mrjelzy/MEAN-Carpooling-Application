import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposerPageComponent } from './proposer-page.component';

describe('ProposerPageComponent', () => {
  let component: ProposerPageComponent;
  let fixture: ComponentFixture<ProposerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposerPageComponent]
    });
    fixture = TestBed.createComponent(ProposerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
