import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../_models/recipe';
import { RecipeService } from './recipe.service';
import { Ingredient } from '../_models/ingredients';
import { ShoppingListService } from './shopping-list.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private slService: ShoppingListService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://localhost:7011/api/Recipe/add',
        recipes
      )
      .subscribe();
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://localhost:7011/api/Recipe/get'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      )
  }


  fetchIngredients() {
    return this.http
      .get<Ingredient[]>(
        'https://localhost:7011/api/Ingredient/get'
      )
      .pipe(
        map(ingredients => {
          return ingredients.map(ingredient => {
            return {
              ...ingredient

            };
          });
        }),
        tap(ingredients => {
          this.slService.setRecipes(ingredients);
        })
      )
  }
}
