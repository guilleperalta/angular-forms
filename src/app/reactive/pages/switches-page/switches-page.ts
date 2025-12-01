import { JsonPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormUtils } from '../../../utils/form-utils'

@Component({
  selector: 'switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.html',
})
export class SwitchesPage {
  private formBuilder = inject(FormBuilder)
  formUtils = FormUtils

  myForm = this.formBuilder.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    terms: [false, Validators.requiredTrue],
  })







  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    }

    this.myForm.reset({
      gender: 'M',
      wantNotifications: false,
      terms: false,
    })
  }
}
