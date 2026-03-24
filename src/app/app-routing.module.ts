import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BlogComponent } from './pages/blog/blog.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Island Adventure Gear — Home' },
  {
    path: 'shop',
    component: ShopComponent,
    title: 'Shop — Island Adventure Gear',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart — Island Adventure Gear',
    canActivate: [AuthGuard],
  },
  {
    path: 'wishlist',
    component: CartComponent,
    title: 'Wishlist — Island Adventure Gear',
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login — Island Adventure Gear',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register — Island Adventure Gear',
  },
  {
    path: 'contact',
    component: ContactComponent,
    title: 'Contact — Island Adventure Gear',
  },
  {
    path: 'blog',
    component: BlogComponent,
    title: 'Blog — Island Adventure Gear',
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    title: 'Privacy Policy — Island Adventure Gear',
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
