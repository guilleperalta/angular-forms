import { JsonPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormUtils } from '../../../utils/form-utils'
import { form } from '@angular/forms/signals'

@Component({
  selector: 'dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
})
export class DynamicPage {

  private formBuilder = inject(FormBuilder) // Inyeccion de dependencias de FormBuilder

  formUtils = FormUtils // Instancia estatica para usar los metodos de la clase

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoritesGames: this.formBuilder.array([
      ['Metal Gear', [Validators.required]],
      ['Death Stranding', [Validators.required]],
    ], [Validators.required, Validators.minLength(3)]),
  })

  get favoritesGames() {
    return this.myForm.get('favoritesGames') as FormArray
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched() // Marca todos los campos como tocados para mostrar errores
      return
    }

    console.log(this.myForm.value)

    this.myForm.reset() // Resetea el formulario
  }
}
