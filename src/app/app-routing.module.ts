import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './classes/auth-guard';
import { FormLoginComponent } from './components/main/form-login/form-login.component';
import { FormMakeOrderComponent } from './components/main/form-make-order/form-make-order.component';
import { FormRegistrComponent } from './components/main/form-registr/form-registr.component';
import { Form1Component } from './components/main/form1/form1.component';
import { Form2Component } from './components/main/form2/form2.component';
import { Form3Component } from './components/main/form3/form3.component';
import { OrdersComponent } from './components/main/orders/orders.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginRegistrComponent } from './pages/login-registr/login-registr.component';
import { PageOrdersComponent } from './pages/page-orders/page-orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'ticket'
      },
      {
        path: 'ticket',
        component: Form1Component
      },
      {
        path: 'ticket/:departure/:arrives/:date',
        component: Form2Component
      },
      {
        path: 'ticket/:departure/:arrives/:date/:tickets',
        component: Form3Component
      }
    ]
  },
  {
    path: 'orders',
    component: PageOrdersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: OrdersComponent
      },
      {
        path: 'make',
        component: FormMakeOrderComponent
      }
    ]
  },
  {
    path: '',
    component: LoginRegistrComponent,
    children: [
      {
        path: 'login',
        component: FormLoginComponent
      },
      {
        path: 'registr',
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
