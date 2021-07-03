import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', 
        loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipesModule), },
    { path: 'auth', component: AuthComponent },
  ]

@NgModule({
    imports: [ RouterModule.forRoot(routes, 
        {preloadingStrategy: PreloadAllModules} // pre-load the lazyload modules
        )],
    exports: [RouterModule]
})

export class AppRoutingModule {}