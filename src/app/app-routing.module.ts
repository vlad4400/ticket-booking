import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLoginComponent } from './components/main/form-login/form-login.component';
import { FormRegistrComponent } from './components/main/form-registr/form-registr.component';
import { Form1Component } from './components/main/form1/form1.component';
import { Form2Component } from './components/main/form2/form2.component';
import { Form3Component } from './components/main/form3/form3.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegistrComponent } from './pages/login-registr/login-registr.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: 'ticket',
        component: Form1Component
      },
      {
        path: 'ticket/:departure/:arrives/:data',
        component: Form2Component
      },
      {
        path: 'ticket/:departure/:arrives/:data/:tickets',
        component: Form3Component
      }
    ]
  },
  {
    path: "",
    component: LoginRegistrComponent,
    children: [
      {
        path: "login",
        component: FormLoginComponent
      },
      {
        path: "registr",
        component: FormRegistrComponent
      }
    ]
  },
  {
    path: "**",
    redirectTo: 'ticket'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
