import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiercingBarComponent } from './piercing-bar.component';

describe('PiercingBarComponent', () => {
  let component: PiercingBarComponent;
  let fixture: ComponentFixture<PiercingBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PiercingBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PiercingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
