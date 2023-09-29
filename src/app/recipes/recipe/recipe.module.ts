import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipeStartComponent } from '../recipe-start/recipe-start.component';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';



@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, FormsModule
  ],
  exports: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ]
})
export class RecipeModule { }
