import { ChangeDetectionStrategy, Optional, Self } from '@angular/core';
import { Component } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-change-detection',
  templateUrl: './change-detection.component.html',
  styleUrls: ['./change-detection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionComponent implements ControlValueAccessor {

  control = new FormControl('');
  value: string
  disabled: boolean;

  private onChange: (value: string) => void;
  private onTouched: () => void;

  constructor(@Optional() @Self() ngControl: NgControl) {
    ngControl.valueAccessor = this;
   }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
   if (isDisabled) {
     this.control.disable();
   } else {
     this.control.enable();
   }
  }

  writeValue(value: string) {
    this.control.setValue(value);
  }

  setValue() {
    this.onChange(this.control.value)
  }

  onFocus() {
    this.onTouched();
  }
}
