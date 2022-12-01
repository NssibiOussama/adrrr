import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponentUser } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponentUser;
  let fixture: ComponentFixture<FooterComponentUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterComponentUser ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponentUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
