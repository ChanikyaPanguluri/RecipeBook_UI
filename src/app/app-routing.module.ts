import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes/recipes.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./recipes/recipes-routing.module').then(m => m.RecipeRoutingModule) },
  { path: 'shoppingList', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
