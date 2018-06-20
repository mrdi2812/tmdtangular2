import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { approutes } from './app.router';
import {LoginModule} from './login/login.module';
import {MainModule} from './main/main.module';
import { UtilityService } from './core/service/utility.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,FormsModule,
    HttpModule,RouterModule.forRoot(approutes)
  ],
  providers: [UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
