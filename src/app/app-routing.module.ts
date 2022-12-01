import { UpdatePasswordComponent } from './components/Auth/update-password/update-password.component';
import { SendResetCodeComponent } from './components/Auth/send-reset-code/send-reset-code.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasRoleGuard } from './services/hasRole.guard';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { AdminComponent } from './layouts/AdminLayout/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { SignInComponent } from './components/Auth/sign-in/sign-in.component';
import { UserComponent } from './layouts/UserLayout/user/user.component';

const routes: Routes = [
  { //, canActivate: [HasRoleGuard], data: { role: ['admin'] }
    path: 'admin', component: AdminComponent, canActivate: [HasRoleGuard], data: { role: ['admin'] },
    children: [
      { path: '', loadChildren: () => import('./components/Admin/admin.module').then(module => module.AdminModule) }
    ]
  },
  { //, canActivate: [HasRoleGuard], data: { role: ['admin'] }
    path: 'user', component: UserComponent, canActivate: [HasRoleGuard], data: { role: ['user'] },
    children: [
      { path: '', loadChildren: () => import('./components/User/user.module').then(module => module.UserModule) }
    ]
  },
  {
    path: '', component: HomeComponent
  },

  { path: 'profile', component: UsersProfileComponent },
  { path: 'pages-401', component: PagesBlankComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignInComponent },
  { path: 'resetPassword', component: SendResetCodeComponent },
  { path: 'updatePassword/:code', component: UpdatePasswordComponent },
  { path: '**', redirectTo:'', pathMatch:'full'}





];

@NgModule({
  imports: [RouterModule.forRoot(routes,)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
