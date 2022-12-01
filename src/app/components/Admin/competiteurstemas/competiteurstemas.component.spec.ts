import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitorsTeamsComponent } from './competiteurstemas.component';

describe('CompetiteurstemasComponent', () => {
  let component: CompetitorsTeamsComponent;
  let fixture: ComponentFixture<CompetitorsTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitorsTeamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitorsTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
