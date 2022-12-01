import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieDeJeuxComponent } from './categorie-de-jeux.component';

describe('CategorieDeJeuxComponent', () => {
  let component: CategorieDeJeuxComponent;
  let fixture: ComponentFixture<CategorieDeJeuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieDeJeuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieDeJeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
