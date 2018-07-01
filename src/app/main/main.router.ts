import { Routes } from "@angular/router";
import { MainComponent } from "./main.component";

export const mainroutes : Routes = [
  {path: '', component: MainComponent, children: [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',loadChildren:'./home/home.module#HomeModule'},
  {path:'user',loadChildren:'./user/user.module#UserModule'},
  {path:'role',loadChildren:'./role/role.module#RoleModule'},
  {path:'function',loadChildren:'./function/function.module#FunctionModule'},
  {path:'product-category',loadChildren:'./product-category/product-category.module#ProductCategoryModule'},
  {path:'product',loadChildren:'./product/product.module#ProductModule'},
  {path:'product-size',loadChildren:'./product-size/product-size.module#ProductSizeModule'},
  {path:'product-color',loadChildren:'./product-color/product-color.module#ProductColorModule'},
  {path:'order',loadChildren:'./order/order.module#OrderModule'},
  ]}
]
