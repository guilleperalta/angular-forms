import { JsonPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormUtils } from '../../../utils/form-utils'

@Component({
  selector: 'register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.html',
})

export class RegisterPage {
  private formBuilder = inject(FormBuilder)
  formUtils = FormUtils

  myForm = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: [
      '',
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
      [this.formUtils.checkingServerResponse]
    ],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern), this.formUtils.notStrider]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.passwordPattern)]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [
      this.formUtils.isFieldOneEqualFieldTwo('password', 'confirmPassword')
    ]
  })

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    }

    this.myForm.reset({})
  }
}
