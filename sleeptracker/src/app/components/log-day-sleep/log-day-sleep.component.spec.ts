import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogDaySleepComponent } from './log-day-sleep.component';

describe('LogDaySleepComponent', () => {
  let component: LogDaySleepComponent;
  let fixture: ComponentFixture<LogDaySleepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogDaySleepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogDaySleepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
