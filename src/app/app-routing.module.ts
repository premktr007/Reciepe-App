import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

import { RecipesComponent } from './recipes/recipes.component';
import { ResolverService } from './recipes/resolver.service';

const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent, resolve:[ResolverService] },
        { path: ':id/edit', component: RecipeEditComponent,  resolve:[ResolverService] }
    ]},
  ]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}