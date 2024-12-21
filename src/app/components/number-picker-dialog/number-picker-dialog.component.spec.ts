import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPickerDialogComponent } from './number-picker-dialog.component';

describe('NumberPickerDialogComponent', () => {
  let component: NumberPickerDialogComponent;
  let fixture: ComponentFixture<NumberPickerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberPickerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberPickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
