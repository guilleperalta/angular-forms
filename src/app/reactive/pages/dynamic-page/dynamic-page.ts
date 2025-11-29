import { JsonPipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { FormUtils } from '../../../utils/form-utils'

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
    ], [Validators.required, Validators.minLength(2)]),
  })

  newFavorite = new FormControl('', [Validators.required])

  get favoritesGames() {
    return this.myForm.get('favoritesGames') as FormArray
  }

  onAddToFavorites() {
    if (this.newFavorite.invalid) return

    const newGame = this.newFavorite.value

    if (this.favoritesGames.value.includes(newGame)) return

    this.favoritesGames.push(
      this.formBuilder.control(newGame, [Validators.required])
    )
    this.newFavorite.reset()
  }

  onRemoveFromFavorites(index: number) {
    this.favoritesGames.removeAt(index)
  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return
    }

    this.myForm.reset()
  }
}
