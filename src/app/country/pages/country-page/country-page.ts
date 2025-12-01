import { JsonPipe } from '@angular/common'
import { Component, effect, inject, signal } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { CountryService } from '../../services/country.service'
import { Country } from '../../interfaces/country.interface'
import { filter, switchMap, tap } from 'rxjs'

@Component({
  selector: 'country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
})
export class CountryPage {
  private formBuilder = inject(FormBuilder)
  countryService = inject(CountryService)
  regions = signal(this.countryService.regions)
  countryByRegion = signal<Country[]>([])
  borderCountries = signal<Country[]>([])

  myForm = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  })

  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged()
    const countrySubscription = this.onCountryChanged()

    onCleanup(() => {
      regionSubscription.unsubscribe()
      countrySubscription.unsubscribe()
    })
  })

  onRegionChanged() {
    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.countryByRegion.set([])
          this.borderCountries.set([])
        }),
        switchMap(region => this.countryService.getCountriesByRegion(region ?? ''))
      )
      .subscribe(countries => {
        this.countryByRegion.set(countries.sort((a, b) => a.name.common.localeCompare(b.name.common)))
      })
  }

  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter(value => value!.length > 0),
        switchMap(alphaCode => this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
        switchMap(country => this.countryService.getCountryNamesByCodes(country!.borders))
      )
      .subscribe(borderCountries => {
        this.borderCountries.set(borderCountries)
      })
  }
}
