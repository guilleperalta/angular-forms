import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms'
import { ValidationError } from '@angular/forms/signals'

async function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 2000))
}

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$';

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return !!form.controls[fieldName].errors && form.controls[fieldName].touched
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null

    const control = form.controls[fieldName]
    const errors = control.errors || {}

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio.'
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`
        case 'min':
          return `El valor mínimo es ${errors['min'].min}.`
        case 'email':
          return 'El correo electrónico no es válido.'
        case 'emailTaken':
          return 'El correo electrónico ya está en uso.'
        case 'notStrider':
          return 'El nombre de usuario "strider" no está permitido.'
        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return 'El formato del correo ingresado no es válido.'
          }
          if (errors['pattern'].requiredPattern === this.namePattern) {
            return 'El campo debe contener nombre y apellido.'
          }
          if (errors['pattern'].requiredPattern === this.notOnlySpacesPattern) {
            return 'El campo no puede contener solo espacios.'
          }
          if (errors['pattern'].requiredPattern === this.passwordPattern) {
            return 'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un carácter especial.'
          }
          return 'El valor no coincide con el patrón requerido.'

        default:
          return 'Campo inválido.'
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

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value
      const field2Value = formGroup.get(field2)?.value

      return field1Value === field2Value ? null : { passwordsNotEqual: true }
    }
  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep()

    const formValue = control.value

    if (formValue === 'hola@mundo.com') {
      return { emailTaken: true }
    }

    return null
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value.toLowerCase().trim()

    return formValue === 'strider' ? { notStrider: true } : null
  }
}
