import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ProductsComponent } from './products/products.component'
import { ContactsComponent } from './contacts/contacts.component'
import { RoutesComponent } from './routes/routes.component'
import { LoginComponent } from './login/login.component'
import { TrailerComponent } from './trailer/trailer.component'

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'routes', component: RoutesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'trailer', component: TrailerComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
