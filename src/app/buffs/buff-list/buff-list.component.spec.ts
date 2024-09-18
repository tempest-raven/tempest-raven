import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuffListComponent } from './buff-list.component';

describe('BuffListComponent', () => {
  let component: BuffListComponent;
  let fixture: ComponentFixture<BuffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuffListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
