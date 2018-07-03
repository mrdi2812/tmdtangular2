import { Routes, RouterModule } from "@angular/router";
import { AnnouncementComponent } from "./announcement.component";

const announRouter :Routes =[
  {path:'',redirectTo:'index',pathMatch:'full'},
  {path:'index',component:AnnouncementComponent}
]
export const AnnounRouter = RouterModule.forChild(announRouter);
