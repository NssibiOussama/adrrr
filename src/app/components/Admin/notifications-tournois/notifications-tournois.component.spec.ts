import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsTournoisComponent } from './notifications-tournois.component';

describe('NotificationsTournoisComponent', () => {
  let component: NotificationsTournoisComponent;
  let fixture: ComponentFixture<NotificationsTournoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsTournoisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsTournoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
