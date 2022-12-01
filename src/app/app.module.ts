import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './components/Admin/dashboard/dashboard.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IsAuthenticatedGuard } from './services/is-authenticated.guard';
import { HasRoleGuard } from './services/hasRole.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './layouts/AdminLayout/admin/admin.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { SignInComponent } from './components/Auth/sign-in/sign-in.component';
import { UserComponent } from './layouts/UserLayout/user/user.component';
import { PanierComponent } from './components/User/panier/panier.component';
import { JwtServiceService } from './services/jwt-service.service';
import { SendResetCodeComponent } from './components/Auth/send-reset-code/send-reset-code.component';
import { UpdatePasswordComponent } from './components/Auth/update-password/update-password.component';
import { HeaderComponentUser } from './layouts/UserLayout/header/header.component';
import { FooterComponentUser } from './layouts/UserLayout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    UsersProfileComponent,
    PagesError404Component,
    PagesBlankComponent,
    LoginComponent,
    SignInComponent,
    AdminComponent,
    UserComponent,
    HomeComponent,
    SendResetCodeComponent,
    UpdatePasswordComponent,
    HeaderComponentUser,
    FooterComponentUser
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [JwtServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
