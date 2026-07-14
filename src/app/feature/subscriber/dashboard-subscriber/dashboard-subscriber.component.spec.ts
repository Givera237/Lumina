import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSubscriberComponent } from './dashboard-subscriber.component';

describe('DashboardSubscriberComponent', () => {
  let component: DashboardSubscriberComponent;
  let fixture: ComponentFixture<DashboardSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardSubscriberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
