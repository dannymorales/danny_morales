// ========MODULES============
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ========SERVICES============
import { DatabaseService } from './services/database.service';
import { AuthenticationService } from './services/authentication.service';
import { FirestoreService } from './services/firestore.service';
import { StorageService } from './services/storage.service';
import { AuthGuardService } from './services/auth-guard.service';
import * as config from './app.config';
import * as firebase from 'firebase';
// ========COMPONENTS============
import { HomeComponent } from './pages/home/home.component';
import { UploadComponent } from './pages/upload/upload.component';
import { AppComponent } from './app.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { StudiesComponent } from './studies/studies/studies.component';
import { LoginComponent } from './admin/login/login.component';
import { GalleryDetailComponent } from './pages/gallery-detail/gallery-detail.component';
import { WeddingPhotographyComponent } from './pages/wedding-photography/wedding-photography.component';
import { EngagementPhotographyComponent } from './pages/engagement-photography/engagement-photography.component';
import { AboutComponent } from './pages/about/about.component';
import { BlogComponent } from './pages/blog/blog.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AnimationsComponent } from './studies/animations/animations.component';
import { ImageDetailComponent } from './pages/image-detail/image-detail.component';

// ========DIRECTIVES============
import { FileDropDirective } from './directives/file-drop.directive';



firebase.initializeApp(config.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    HomeComponent,
    UploadComponent,
    FileDropDirective,
    StudiesComponent,
    LoginComponent,
    GalleryDetailComponent,
    WeddingPhotographyComponent,
    EngagementPhotographyComponent,
    AboutComponent,
    BlogComponent,
    DashboardComponent,
    AnimationsComponent,
    ImageDetailComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(config.firebaseConfig),
    BrowserModule.withServerTransition({appId: 'dannyMorales'}),
    HttpModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    DatabaseService, 
    AuthenticationService, 
    StorageService, 
    AuthGuardService,
    FirestoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
