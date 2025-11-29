import { FormArray, FormGroup } from '@angular/forms'

export class FormUtils {
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors
      && form.controls[fieldName].touched
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null

    const errors = form.controls[fieldName].errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio.'
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`
        case 'min':
          return `El valor mínimo es ${errors['min'].min}.`
      }
    }

    return null
  }

  static isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return formArray.controls[index].errors && formArray.controls[index].touched
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null

    const errors = formArray.controls[index].errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio.'
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`
        case 'min':
          return `El valor mínimo es ${errors['min'].min}.`
      }
    }

    return null
  }
}
