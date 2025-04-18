import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResoultComponent } from './resoult.component';

describe('ResoultComponent', () => {
  let component: ResoultComponent;
  let fixture: ComponentFixture<ResoultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResoultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResoultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
