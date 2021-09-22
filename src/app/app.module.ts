import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomersComponent } from './customers/customers.component'
import { CustomerserviceService } from './customerservice.service';
import { BankService } from './bank.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CustomerserviceService,BankService],
  bootstrap: [AppComponent]
})
export class AppModule { }
