import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewOvernightSleepDataComponent } from './view-overnight-sleep-data.component';

describe('ViewOvernightSleepDataComponent', () => {
  let component: ViewOvernightSleepDataComponent;
  let fixture: ComponentFixture<ViewOvernightSleepDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOvernightSleepDataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewOvernightSleepDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
