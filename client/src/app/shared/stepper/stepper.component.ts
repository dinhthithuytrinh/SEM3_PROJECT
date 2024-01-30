import { Component, Input, OnInit } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: StepperComponent }],
})
export class StepperComponent extends CdkStepper implements OnInit {
  @Input() linearModeSelected: boolean = false;

  ngOnInit(): void {
    this.linear = this.linearModeSelected;
  }

  selectStepByIndex(index: number): void {
    this.selectedIndex = index;
  }

  goToPrevious(index: number) {
    if (index > 0) {
      this.selectedIndex = index - 1;
    }
  }

  goToNext(index: number) {
    if (index < this.steps.length - 1) {
      this.selectedIndex = index + 1;
    }
  }
}
