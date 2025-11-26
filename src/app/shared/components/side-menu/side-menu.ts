import { Component } from '@angular/core'
import reactiveRoutes from '../../../reactive/reactive.routes'
import { RouterLink, RouterLinkActive } from "@angular/router"

interface MenuItem {
  title: string
  route: string
}

const reactiveItems = reactiveRoutes[0].children ?? []

@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.html',
})
export class SideMenu {
  reactiveMenu: MenuItem[] = reactiveItems
    .filter(({ path }) => path !== '**')
    .map(({ title, path }) => ({
      title: `${title}`,
      route: `reactive/${path}`,
    }))

  authMenu: MenuItem[] = [{
    title: 'Registro',
    route: './auth',
  }]

  countryMenu: MenuItem[] = [{
    title: 'Paises',
    route: './country',
  }]
}
