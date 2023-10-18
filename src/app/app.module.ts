import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MatIconModule } from '@angular/material/icon';


const appRoutes: Routes = [
   { path: 'welcome', component: WelcomePageComponent },
   { path: 'movies', component: MovieCardComponent },
   { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
   declarations: [
      AppComponent,
      UserRegistrationFormComponent,
      UserLoginFormComponent,
      MovieCardComponent,
      WelcomePageComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatInputModule,
      MatButtonModule,
      MatCardModule,
      MatFormFieldModule,
      MatDialogModule,
      MatSnackBarModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      MatIconModule
   ],
   providers: [],
   bootstrap: [AppComponent]
})

export class AppModule { }