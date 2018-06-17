import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { approutes } from './app.router';
import {LoginModule} from './login/login.module';
import {MainModule} from './main/main.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,RouterModule.forRoot(approutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
