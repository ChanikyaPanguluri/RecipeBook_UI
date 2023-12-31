import { Injectable } from '@angular/core';
import { Ingredient } from '../_models/ingredients';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  baseUrl = "https://localhost:7011/api/Ingredient/";
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [];
  constructor(private http: HttpClient) { }

  setRecipes(ingredient: Ingredient[]) {
    this.ingredients = ingredient;
  }

  getIngredients() {
    return this.http.get<Ingredient[]>(this.baseUrl + 'get')
  }

  getIngredientById(id: number) {
    return this.http.get<Ingredient>(this.baseUrl + 'get/' + id)
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {

    return (
      this.http.post<Ingredient>(this.baseUrl + 'add', ingredient).subscribe(),
      this.ingredients.push(ingredient),
      this.ingredientsChanged.next(this.ingredients.slice())
    )
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    return (
      this.http.put<Ingredient>(this.baseUrl + 'edit', newIngredient).subscribe(),
      this.ingredients.push(newIngredient),
      this.getIngredients(),
      this.ingredientsChanged.next(this.ingredients.slice())
    )
  }

  deleteIngredient(id: number
    , index: number
  ) {
    this.http.delete<Ingredient>(this.baseUrl + id).subscribe(),
      this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
