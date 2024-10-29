import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
<<<<<<< Updated upstream
=======
import { authGuard } from './auth.guard'; // Asegúrate de importar tu guard
import { NotFoundComponent } from './components/not-found/not-found.component';
>>>>>>> Stashed changes

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./homescreen/homescreen.module').then(m => m.HomescreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'tabs',
<<<<<<< Updated upstream
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }

  
=======
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  }

>>>>>>> Stashed changes
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
