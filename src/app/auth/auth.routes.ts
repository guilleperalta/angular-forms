import { Routes } from '@angular/router'
import { RegisterPage } from './pages/register-page/register-page'

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sing-up',
        component: RegisterPage,
      },
      {
        path: '**',
        redirectTo: 'sing-up',
      }
    ]
  }
]

export default authRoutes
