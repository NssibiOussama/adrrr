import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponentUser} from './header.component';

describe('HeaderComponentUser', () => {
  let component: HeaderComponentUser;
  let fixture: ComponentFixture<HeaderComponentUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponentUser ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponentUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
