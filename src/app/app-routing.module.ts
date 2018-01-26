import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from "./pages/gallery/gallery.component";
import { GalleryDetailComponent } from './pages/gallery-detail/gallery-detail.component';
import { UploadComponent } from './pages/upload/upload.component';
import { StudiesComponent } from './studies/studies/studies.component';
import { AnimationsComponent } from './studies/animations/animations.component';
import { LoginComponent } from "../app/admin/login/login.component";
import { AuthenticationService} from '../app/services/authentication.service';
import { AuthGuardService} from '../app/services/auth-guard.service';
import { DashboardComponent } from '../app/admin/dashboard/dashboard.component';




const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'links', component: StudiesComponent},
  { path: 'animations', component: AnimationsComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'gallery', component: GalleryComponent},
  { path: 'wedding-photos/:id', component: GalleryDetailComponent},
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuardService] },
  { path: 'login', component:LoginComponent},
  { path: 'studies', component: StudiesComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule {}
