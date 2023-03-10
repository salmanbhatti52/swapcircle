import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'onboard',
    pathMatch: 'full',
  },
  {
    path: 'offer',
    loadChildren: () =>
      import('./offer/offer.module').then((m) => m.OfferPageModule),
  },
  {
    path: 'track',
    loadChildren: () =>
      import('./track/track.module').then((m) => m.TrackPageModule),
  },
  {
    path: 'connect',
    loadChildren: () =>
      import('./connect/connect.module').then((m) => m.ConnectPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'onboard',
    loadChildren: () =>
      import('./onboard/onboard.module').then((m) => m.OnboardPageModule),
  },
  {
    path: 'getstart',
    loadChildren: () =>
      import('./getstart/getstart.module').then((m) => m.GetstartPageModule),
  },
  {
    path: 'signup1',
    loadChildren: () =>
      import('./signup1/signup1.module').then((m) => m.Signup1PageModule),
  },
  {
    path: 'signup2',
    loadChildren: () =>
      import('./signup2/signup2.module').then((m) => m.Signup2PageModule),
  },
  {
    path: 'signup3',
    loadChildren: () =>
      import('./signup3/signup3.module').then((m) => m.Signup3PageModule),
  },
  {
    path: 'signup5',
    loadChildren: () => import('./signup5/signup5.module').then( m => m.Signup5PageModule)
  },
  {
    path: 'signup4',
    loadChildren: () => import('./signup4/signup4.module').then( m => m.Signup4PageModule)
  },
  {
    path: 'loginscreen',
    loadChildren: () => import('./loginscreen/loginscreen.module').then( m => m.LoginscreenPageModule)
  },
  {
    path: 'offers',
    loadChildren: () => import('./offers/offers.module').then( m => m.OffersPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'chatdetail',
    loadChildren: () => import('./chatdetail/chatdetail.module').then( m => m.ChatdetailPageModule)
  },
  {
    path: 'favorite',
    loadChildren: () => import('./favorite/favorite.module').then( m => m.FavoritePageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'billingpayment',
    loadChildren: () => import('./billingpayment/billingpayment.module').then( m => m.BillingpaymentPageModule)
  },
  {
    path: 'addaccount',
    loadChildren: () => import('./addaccount/addaccount.module').then( m => m.AddaccountPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'resetpassword',
    loadChildren: () => import('./resetpassword/resetpassword.module').then( m => m.ResetpasswordPageModule)
  },
  {
    path: 'adminslist',
    loadChildren: () => import('./adminslist/adminslist.module').then( m => m.AdminslistPageModule)
  },
  {
    path: 'userslist',
    loadChildren: () => import('./userslist/userslist.module').then( m => m.UserslistPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
