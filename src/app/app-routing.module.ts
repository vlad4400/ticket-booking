import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Form1Component } from './components/main/form1/form1.component';
import { Form2Component } from './components/main/form2/form2.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: "", component: HomeComponent,
  children: [
      {
        path: '',
        component: Form1Component
      },
      {
        path: 'ticket/:departure/:arrives/:data',
        component: Form2Component
      }
    ]
  },
  {
    path: "login/:departure/:arrives/:data/:tickets/:baggages",
    component: LoginComponent
  },
  {
    path: "**",
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
