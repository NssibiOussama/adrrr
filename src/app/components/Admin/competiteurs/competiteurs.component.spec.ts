import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetiteursComponent } from './competiteurs.component';

describe('CompetiteursComponent', () => {
  let component: CompetiteursComponent;
  let fixture: ComponentFixture<CompetiteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetiteursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetiteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
