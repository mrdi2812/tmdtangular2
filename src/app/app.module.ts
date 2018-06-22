import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { approutes } from './app.router';
import {LoginModule} from './login/login.module';
import {MainModule} from './main/main.module';
import { AuthenGuard } from './core/guards/authen.guard';
import { DataService } from './core/service/data.service';
import {PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(approutes),
    PaginationModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [AuthenGuard,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
