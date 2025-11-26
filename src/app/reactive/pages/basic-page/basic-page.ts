import { JsonPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormUtils } from '../../../utils/form-utils'

@Component({
  selector: 'basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
})
export class BasicPage {

  private formBuilder = inject(FormBuilder) // Inyeccion de dependencias de FormBuilder

  formUtils = FormUtils // Instancia estatica para usar los metodos de la clase

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]/** Validadores sincronos*/, [] /** Validadores asincronos */],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched() // Marca todos los campos como tocados para mostrar errores
      return
    }

    console.log(this.myForm.value)

    this.myForm.reset() // Resetea el formulario
  }
}
