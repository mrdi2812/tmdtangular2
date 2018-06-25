import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function.component';
import { Routes,RouterModule} from '@angular/router';
import { TreeModule } from 'angular-tree-component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
const functionroutes : Routes = [
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:FunctionComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(functionroutes),
    TreeModule,
    FormsModule,
    ModalModule
  ],
  declarations: [FunctionComponent]
})
export class FunctionModule { }
