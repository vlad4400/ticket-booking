import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { Form1Component } from './components/main/form1/form1.component';
import { Form2Component } from './components/main/form2/form2.component';
import { MiniMenuComponent } from './components/header/mini-menu/mini-menu.component';
import { BigMenuComponent } from './components/header/big-menu/big-menu.component';
import { FormLoginComponent } from './components/main/form-login/form-login.component';
import { Form3Component } from './components/main/form3/form3.component';
import { LoginRegistrComponent } from './pages/login-registr/login-registr.component';
import { FormRegistrComponent } from './components/main/form-registr/form-registr.component';
import { TokenInterceptor } from './classes/token-interceptor';
import { FormMakeOrderComponent } from './components/main/form-make-order/form-make-order.component';
import { PageOrdersComponent } from './pages/page-orders/page-orders.component';
import { OrdersComponent } from './components/main/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContainerComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    Form1Component,
    Form2Component,
    MiniMenuComponent,
    BigMenuComponent,
    FormLoginComponent,
    Form3Component,
    LoginRegistrComponent,
    FormRegistrComponent,
    OrdersComponent,
    FormMakeOrderComponent,
    PageOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
